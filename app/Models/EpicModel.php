<?php namespace Vanderbilt\EpicParticipantUpdater\App\Models;

use Vanderbilt\EpicParticipantUpdater\EpicParticipantUpdater;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\File as FileHelper;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\EpicXMLParser;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\XMLNode;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\Record as RecordHelper;
use Vanderbilt\EpicParticipantUpdater\App\Models\Settings;


class EpicModel extends BaseModel {

    /**
     * constructor
     *
     * @param EpicParticipantUpdater $module
     */
	function __construct($module)
	{
		$this->module = $module;
		parent::__construct();
	}

    /**
     * check the XML
     *
     * @return void
     */
    public function check()
	{
        
        try {
            $HTTP_RAW_POST_DATA = file_get_contents("php://input"); // SOAP request
			
            if(empty($HTTP_RAW_POST_DATA) )
            {
                $this->log($message='no SOAP request detected', [
                    'status' => Logger::STATUS_ERROR
                ]);
                return ['error' => true, 'message' => $message];
            }
            return self::handleSOAPRequest($HTTP_RAW_POST_DATA);

		} catch (\Exception $e) {
            $this->log($message=$e->getMessage(), [
                'status' => Logger::STATUS_ERROR
            ]);
            return ['error' => true, 'message' => $message];
		}
    }
    
    /**
     * handle a SOAP request from Epic
     *
     * @param string $HTTP_RAW_POST_DATA
     * @return void
     */
    private function handleSOAPRequest($HTTP_RAW_POST_DATA)
    {
        $xml_data = EpicXMLParser::parse($HTTP_RAW_POST_DATA);
        $response = $this->checkXML($xml_data);
        self::createSOAPResponse($HTTP_RAW_POST_DATA);
    }

    /**
     * reply to the SOAP request from Epic:
     * - get the original soap request
     * - remove namespaces
     * - print the EnrollPatientRequestRequest node
     *
     * @param string $HTTP_RAW_POST_DATA
     * @return void
     */
    private static function createSOAPResponse($xml_string)
    {
        //switch from request to response
        $response_xml_string = preg_replace("/EnrollPatientRequestRequest/i",'EnrollPatientRequestResponse', $xml_string);
        Header('Content-type: text/xml');
        echo $response_xml_string;
        exit(0);
    }

    /**
     * get the primary key of a project
     *
     * @param int $project_id
     * @return string the name of the primary key field
     */
    private function getProjectPrimaryKey($project_id)
    {
        $project = new \Project($project_id);
        // return key($proj->metadata);
        return $project->table_pk;
    }

     /**
     * 
     * log _project_id and _record_id when updating and creating log entries
     * because the log module doen't allow to override those values
     */
    private function checkXML($xml_data=[])
    {
        // check the data
        $log_message = 'checked XML';
        if(empty($xml_data))
        {
            $this->log($log_message, [
				'status' => Logger::STATUS_INFO, // generic message
				'description' => 'no data',
            ]);
            return false;
        }
        
        // check if any project is enabled
        $projects = $this->getModuleEnabledProjects();
        if(empty($projects))
        {
            $this->log($log_message, [
				'status' => Logger::STATUS_INFO, // generic message
				'description' => 'no projects enabled',
            ]);
            return false;
        }
        
        // check for projects that are using the same irb number of the XML
        foreach($projects as $project)
        {
            // set the context of the project
            // $_GET['pid'] = $project_id;
            $project_id = $project->project_id;
            $projectIsInResearch = $this->checkIRB($project_id, $xml_data['irbNumbers']); // check for existing
            
            if(!$projectIsInResearch) continue; //continue to next project loop
            
            $record_id = $this->checkMRN($project_id, $xml_data['MRN']); // check for existing 
            if($record_id)
            {
                //update
                $this->updateRecord($project, $record_id, $xml_data);
            }else{
                //create
                $this->createRecord($project, $xml_data);
            }
        }
        $project_ids = array_map(function($project) {
            return $project->project_id;
        }, $projects);


        $this->log($log_message, [
            'status' => Logger::STATUS_INFO, // generic message
            'description' => sprintf("xml checked for projects %s", implode(', ', $project_ids)),
        ]);

        return $project_ids;
    }
    
    /**
     * get IRB number from a project
     *
     * @param \Project $project
     * @return string
     */
    private function getIrbNumberFromProject($project)
    {
        $project_info = $project->project;
        return $project_info['project_irb_number'];
    }

    /**
     * get a record compatible with REDCap::saveData
     *
     * @param integer $project_id
     * @param string $record_id
     * @param string $xml_data
     * @return array
     */
    private function getRecord($project_id, $record_id, $xml_data)
    {
        // $record_id_field = $this->getProjectPrimaryKey($project_id); // get the name of the project record id field
        // get the settings fot the current project
        $settings = new Settings($this->module, $project_id);
        $status_field_name = $settings->getStatusFieldName();
        $mrn_field_name = $settings->getMrnFieldName();
        $date_start_field_name = $settings->getStartDateFieldName();
        $date_end_field_name = $settings->getEndDateFieldName();
        $event_ID = $settings->getEventID();

        // set the mandatory fields
        $fields = array(
            $mrn_field_name => trim($xml_data['MRN']),
            $status_field_name  => trim($xml_data['status']),
        );
        // add dates if mapped
        if(!empty($date_start_field_name)) $fields[$date_start_field_name] = trim($xml_data['date-start']);
        if(!empty($date_end_field_name)) $fields[$date_end_field_name] = trim($xml_data['date-end']);
        $record = RecordHelper::getRecordSchema($project_id, $event_ID, $record_id, $fields);
        return $record;
    }
            
    /**
     * insert a new record or update an existing one
     *
     * @param \Project $project
     * @param array $xml_data
     * @param string $existing_record_id
     * @return void
     */
    private function createRecord($project, $xml_data)
    {
        $project_id = $project->project_id;
        $irb_number = $this->getIrbNumberFromProject($project);
        // get the first available record_id
        $record_id = $this->module->addAutoNumberedRecord($project_id);
        
        $record = $this->getRecord($project_id, $record_id, $xml_data);
        $result = \REDCap::saveData($project_id, 'array', $record);

        // log results
        if($error = $result['errors'])
        {
            $status = Logger::STATUS_ERROR;
            $description = "error creating new record: {$error}";
        }else
        {
            $status = Logger::STATUS_SUCCESS;
            $description = "new record created";
        }

        $this->log($message='created record', $parameters = [
            'status' => $status,
            'description' => $description,
            'project_id'=> $project_id,
            'record_id' => $record_id,
            'irb_number' => $irb_number,
            'MRN' => $xml_data['MRN']
        ]);
    }

    /**
     * update the status of an existing record
     * 
     * @param \Project $project
     * @param integer $record_id
     * @param array $xml_data
     * @return void
     */
    private function updateRecord($project, $record_id, $xml_data)
    {
        $project_id = $project->project_id;
        $irb_number = $this->getIrbNumberFromProject($project);

        $record = $this->getRecord($project_id, $record_id, $xml_data);
        $result = \REDCap::saveData($project_id, 'array', $record);

        if($error = $result['errors'])
        {
            $status = Logger::STATUS_ERROR;
            $description = "error updating record {$record_id}: {$error}";
        }else
        {
            $status = Logger::STATUS_SUCCESS;
            $description = "record {$record_id} updated";
        }
        $this->log($message='updated record', $parameters = [
            'status' => $status,
            'description' => $description,
            'project_id'=> $project_id,
            'record_id' => $record_id,
            'irb_number' => $irb_number,
            'MRN' => $xml_data['MRN']
        ]);
    }

    private function log($message, $parameters=[])
    {
        $logger = new Logger($this->module);
        $logger->log($message, $parameters);
    }

     /**
      * checks if the project is connected to a research
      * @return boolean
     */
    private function checkIRB($project_id, $irbNumbers)
    {
        $project = new \Project($project_id);
        $project_irb_number = $this->getIrbNumberFromProject($project);
        if ( !isset($project_irb_number) || is_null($project_irb_number) )
            return false; // no IRB number set for this project

        return in_array($project_irb_number, $irbNumbers);
    }
    
    /**
     * check if the MRN is available in the specified project
     * 
     * @return string|false returns the record if MRN is found or false otherwise
     */
    private function checkMRN($project_id, $MRN)
    {
        $settings = new Settings($this->module, $project_id);
        $mrn_field_name = $settings->getMrnFieldName();
        $event_id = $settings->getEventID();
        $record_id = RecordHelper::find($project_id, $event_id, $mrn_field_name, $MRN);
        return $record_id;
    }

    /**
     * get a list of projects using the module
     * 
     * @return \Project[] ids of the projects which have enabled this module
     */
    public function getModuleEnabledProjects()
    {
        $query_string = sprintf(
            "SELECT s.project_id
                FROM redcap_external_modules m, redcap_external_module_settings s
                WHERE m.external_module_id = s.external_module_id
                AND m.directory_prefix = '%s'
                AND s.`key` = 'enabled'
                AND s.value = 'true'
            ", $this->module->PREFIX);
        $result = $this->module->query($query_string, array());

        if($error = db_error()){
            throw new \Exception($query_string.': '.$error);
        }

        $projects = array();
        while($row = db_fetch_assoc($result))
        {
            $project_id =  $row['project_id'];
            $project = new \Project($project_id);
            $projects[] = $project; // Array with projects
        }

        return $projects;
    }

}