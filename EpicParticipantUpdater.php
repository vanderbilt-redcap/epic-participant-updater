<?php
namespace Vanderbilt\EpicParticipantUpdater;

require_once join(['vendor','autoload.php'],DIRECTORY_SEPARATOR);

use ExternalModules\AbstractExternalModule;

class EpicParticipantUpdater extends AbstractExternalModule {
    
    private $logFile;
    private $mrn_mapping_key = 'mrn-mapping';
    private $status_mapping_key = 'status-mapping';
    private $xml_schema = [
        'processState'  => ['uses' => 'Body.EnrollPatientRequestRequest.processState'], // study status
        'candidateID'   => ['uses' => 'Body.EnrollPatientRequestRequest.patient.candidateID::extension'], // MRN
        'irbNumber'       => ['uses' => 'Body.EnrollPatientRequestRequest.study.instantiation.plannedStudy.id::extension'],
    ]; // schema of the EPIC xml file
    
    function __construct()
    {
        parent::__construct();
        $config = $this->getConfig();
        $this->logFile =  $this->getModulePath().$config['log-file'];
    }
        
    public function getAPIBase()
    {
        $api_url = $this->getUrl('API');
        $components = parse_url($api_url);
        return $components['path'];
    }

    // function redcap_every_page_top($project_id) {}

    function redcap_every_page_before_render ($project_id){}

    
    function redcap_project_home_page($project_id) {}

    function validateSettings($settings)
    {
        if($settings[$this->mrn_mapping_key]=='my test abcde')
            return 'test';
    }

    /**
     * @return string the name of the primary key field
     */
    private function getProjectPrimaryKey($project_id)
    {
        $proj = new \Project($project_id);
        // return key($proj->metadata);
        return $proj->table_pk;
    }


    public function getXMLDataFromPath($path)
    {
        if(empty($path)) return array("message" => "no path specified");
        $parser = new App\Helpers\XMLParser();
        $xml = $parser->load($path);
        $xml_data = $xml->parse($this->xml_schema);
        return $xml_data;
    }

    public function getXMLDataFromString($string)
    {
        // var_dump(htmlspecialchars($string));
        $parser = new App\Helpers\XMLParser();
        $xml = $parser->readXML($string);
        var_dump("XML", $xml);
        $xml_data = $xml->parse($this->xml_schema);
        return $xml_data;
    }


     /**
     * Function called by the CRON to check the XML file
     */
    public function checkXML($xml_data=[])
    {
        if(empty($xml_data))return array("message" => "no data");

        $projects = $this->getFetchingEnabledProjects();
        if(empty($projects)) return array("message" => "no projects enabled"); //exit if the module is not enabled in any project
        
        // check for projects that are using the same irb number of the XML
        foreach($projects as $project_id)
        {
            // set the context of the project
            $_GET['pid'] = $project_id;
            
            $projectIsInResearch = $this->checkIRB($project_id, $xml_data['irbNumber']); // check for existing

            if(!$projectIsInResearch) continue; //continue to next project loop

            $record = $this->checkMRN($project_id, $xml_data['candidateID']); // check for existing 
            $status_field_name = $this->getProjectSetting($this->status_mapping_key, $project_id);

            if($record)
            {
                foreach($record as $record_id => &$data)
                {
                    $data[$status_field_name] = trim($xml_data['processState']);
                    $response = \REDCap::saveData($project_id, 'array', array($record));
                    App\Helpers\Logger::log($this->logFile, "data updated: {$response}");
                }
            }
            else
            {
                $record_id_field = $this->getProjectPrimaryKey($project_id); // get the name of the project record id field
                $mrn_field_name = $this->getProjectSetting($this->mrn_mapping_key, $project_id);

                $data = array(
                    $record_id_field => $this->addAutoNumberedRecord($project_id),
                    $mrn_field_name => $xml_data['candidateID'],
                    $status_field_name => trim($xml_data['processState']),
                );

                $response = \RedCap::saveData($project_id, 'json', json_encode(array($data)));
                App\Helpers\Logger::log($this->logFile, "data created: {$response}");
            }
        }
        return array(
            "message" => "xml checked for all projects",
            "projects" => $projects,
        );
    }

     /**
     * @return mixed checks if the project is connected to a research
     */
    private function checkIRB($project_id, $irbNumber)
    {
        $Project = new \Project($project_id);
        $project_irb_number = $Project->project['project_irb_number'];
        if ( is_null($project_irb_number) || isset($project_irb_number) )
            return false; // no IRB number set for this project

        return ($irbNumber === $project_irb_number);
    }
    
    /**
     * @return mixed returns the record if MRN is found or false otherwise
     */
    private function checkMRN($project_id, $MRN)
    {
        $mrn_field_name = $this->getProjectSetting($this->mrn_mapping_key, $project_id);
        $data = \REDCap::getData($project_id); // get records as array ov events
        foreach($data as $events)
        {
            foreach($events as $eventId => $record)
            {
                if($record[$mrn_field_name] == $MRN)
                return array($record['record_id'] => $record); //return an associative array with the record_id and the record data
            }
        }
        return false;
    }

    /**
     * @return array  ids of the projects which have enabled this module
     */
    private function getFetchingEnabledProjects()
    {
        $sql="SELECT s.project_id
                FROM redcap_external_modules m, redcap_external_module_settings s
                WHERE m.external_module_id = s.external_module_id
                AND m.directory_prefix = '{$this->PREFIX}'
                AND s.`key` = 'enabled'
                AND s.value = 'true'";
        $query = $this->query($sql);

        if($error = db_error()){
            throw new \Exception($sql.': '.$error);
        }

        $projects = array();
        while($row = db_fetch_assoc($query))
        {
            $projects[] = $row['project_id'];
        }

        return $projects;
    }

    /**
     * reads a file sent via a form
     */
    function readXML($name = 'file', $save=false)
    {
        $fileHelper = new App\Helpers\File();
        if($save)
        {
            $file_path = $fileHelper->upload($name);
            $data = file_get_contents($file_path);
        }else {
            $data = $fileHelper->read($name);
        }
        return $data;
    }

    function cronTest()
    {
        $projects = $this->getFetchingEnabledProjects();
        foreach($projects as $project_id)
        {
            $_GET['pid'] = $project_id;
            App\Helper\Logger::log($this->logFile, "cron test done for project {$project_id}");
            
            // echo 'INSIDE CRON TEST '.$project_id;
        }
    }

}