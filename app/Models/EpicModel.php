<?php namespace Vanderbilt\EpicParticipantUpdater\App\Models;

use Vanderbilt\EpicParticipantUpdater\EpicParticipantUpdater;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\File as FileHelper;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\EpicXMLParser;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\XMLNode;
use Vanderbilt\EpicParticipantUpdater\App\Models\Record;
// use Vanderbilt\EpicParticipantUpdater\App\Models\Field;


class EpicModel extends BaseModel {

    /**
     * setting key to retrieve the MRN field
     *
     * @var string
     */
    private $mrn_field_key = 'mrn-mapping-field';

    /**
     * setting key to retrieve the study status field
     *
     * @var string
     */
    private $status_field_key = 'status-mapping-field';

    /**
     * setting key to retrieve the event containing the module fields (mrn, patient status, dates)
     *
     * @var string
     */
    private $event_ID_key = 'event-id';

    /**
     * setting key to retrieve the MRN event
     *
     * @var string
     */
    // private $mrn_event_key = 'mrn-mapping-event';
    
    /**
     * setting key to retrieve the study status event
     *
     * @var string
     */
    // private $status_event_key = 'status-mapping-event';

    const XML_MAPPING = array(
        'irbNumbers' => '',
        'mrn' => 'MRN',
        'status' => '',
    );
	
	function __construct(EpicParticipantUpdater $module)
	{
		$this->module = $module;
		parent::__construct();
	}

	public function check()
	{
        
        try {
            $HTTP_RAW_POST_DATA = file_get_contents("php://input"); // SOAP request
			$params = json_decode(file_get_contents("php://input"),true); //get the params
			$params = array_merge($params, $_POST);
			$method = $_SERVER['REQUEST_METHOD'];
			if ('PUT' === $method) {
				$_PUT = array();
				FileHelper::parse_raw_http_request($_PUT);
			}


			$response = array();
			if(empty($HTTP_RAW_POST_DATA) && empty($params) && empty($_FILES) && empty($_PUT)) {
				// no params and no files; exit
				$response = array(
					"error" => true,
					"message" => "no params specified",
				);
			}
			else if( empty($_PUT) && !empty($HTTP_RAW_POST_DATA) ){
                self::handleSOAPRequest($HTTP_RAW_POST_DATA);
            }
			else if( !empty($_FILES) ){
				/**
				 * data is coming from an upload form
				 * NOTE: ONLY ONE FILE IS GOING TO BE PROCESSED
				 */
				$files = FileHelper::getFormFiles();
				// $file = array_shift($files); //PROCESS ONLY THE FIRST FILE
				foreach ($files as $file) {
					$string = FileHelper::getContents($file);
					$xml_data = EpicXMLParser::parse($string);
					$current_response = $this->checkXML($xml_data);
					$response = array_merge($response, $current_response);
				}
			}
			// check if getting xml file from a $_PUT
			else if( !empty($_PUT) ){
				$files = $_PUT['files'];
				// $file = array_shift($files); //PROCESS ONLY THE FIRST FILE
				foreach ($files as $file) {
					$string = $file;
					$xml_data = EpicXMLParser::parse($string);
					$current_response = $this->checkXML($xml_data);
					$response = array_merge($response, $current_response);
				}
			}
			// check if getting xml file from a path
			else if (isset($params['path']))
			{
				$path = $params['path'];
				$xml_data = EpicXMLParser::parseFromPath($path);
				$response = $this->checkXML($xml_data);
            }

			return $response;
		} catch (\Exception $e) {
			$response = array(
				"error" => true,
                "message" => $e->getMessage(),
            );
            $log = new LogModel(__FUNCTION__, $response);
            $log->save($this->module);
			// header('HTTP/1.1 500 Internal Server Error');
			return $response;
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
        if(empty($xml_data))
        {
            $response = [
				'status' => 'info', // generic message
				'description' => 'no data',
            ];
            $log = new LogModel(__FUNCTION__, $response);
            $log->save($this->module);
            return $response;
        }
        
        // check if any project is enabled
        $projects = $this->getFetchingEnabledProjects();
        if(empty($projects))
        {
            $response = [
				'status' => 'info', // generic message
				'description' => 'no projects enabled',
            ];
            $log = new LogModel(__FUNCTION__, $response);
            $log->save($this->module);
            return $response;
        }
        
        // check for projects that are using the same irb number of the XML
        foreach($projects as $project)
        {
            // set the context of the project
            // $_GET['pid'] = $project_id;
            $project_id = $project->project_id;
            $projectIsInResearch = $this->checkIRB($project_id, $xml_data['irbNumbers']); // check for existing
            
            if(!$projectIsInResearch) continue; //continue to next project loop
            
            $field = $this->checkMRN($project_id, $xml_data['MRN']); // check for existing 
            if($field)
            {

            }else{

            }
            $this->saveData($project, $xml_data, $record_id);

        }
        $project_ids = array_map(function($project) {
            return $project->project_id;
        }, $projects);
        $response = [
            'status' => 'info',
            'message' => 'xml checked for all projects',
            'description' => implode(', ', $project_ids),
        ];
        $log = new LogModel(__FUNCTION__, $response);
        $log->save($this->module);

        $response['projects'] = $projects; // do not want to log an array in the DB, but need it in JSON
        return $response;
    }
    
    /**
     * update the status of an existing record
     * 
     * @param \Project $project
     * @param array $xml_data
     * @return void
     */
    private function updateRecord($project, $record, $xml_data)
    {
        $project_id = $project->project_id;
        $irb_number = $this->getIrbNumberFromProject($project);
        $status_field_name = $this->module->getProjectSetting($this->status_field_key, $project_id);
        foreach($record as $record_id => &$data)
        {
            $data[$status_field_name] = trim($xml_data['status']);
            $response = \REDCap::saveData($project_id, 'array', array($record));
            $log = new LogModel(__FUNCTION__, [
                'project_id' => $project_id,
                'record_id' => $record_id,
                'irb_number' => $irb_number,
                'MRN' => $xml_data['MRN'],
            ]);
            if($error = $response['errors'])
            {
                $log->status = 'error';
                $log->description = "error updating record {$record_id}: {$error}";
            }else
            {

                $log->status = 'success';
                $log->description = "record {$record_id} has been updated";
            }
            $log->save($this->module);
        }
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
     * get object with module setting for a project
     *
     * @param integer $project_id
     * @return object
     */
    private function getModuleSettingsForProject($project_id)
    {
        $settings = array(
            event_id => $this->module->getProjectSetting($this->event_ID_key, $project_id),
            mrn_field_name => $this->module->getProjectSetting($this->mrn_field_key, $project_id),
            status_field_name => $this->module->getProjectSetting($this->status_field_key, $project_id),
        );
        return (object)$settings;
    }
            
    /**
     * insert a new record or update an existing one
     *
     * @param \Project $project
     * @param array $xml_data
     * @param string $existing_record_id
     * @return void
     */
    private function saveData($project, $xml_data, $existing_record_id=false)
    {
        $project_id = $project->project_id;
        $irb_number = $this->getIrbNumberFromProject($project);
        // $record_id_field = $this->getProjectPrimaryKey($project_id); // get the name of the project record id field
        $settings = $this->getModuleSettingsForProject($project_id);

        $record_id = ($existing_record_id===false) ? $this->module->addAutoNumberedRecord($project_id) : $existing_record_id;

        $data = array($settings->status_field_name => trim($xml_data['status']));
        if(!$existing_record_id)
        {
            // when creating also insert MRN and date range
            $data[$settings->mrn_field_name] = $xml_data['MRN'];
            // $data[$settings->date_start_field_name] = $xml_data['date_start'];
            // $data[$settings->date_end_field_name] = $xml_data['date_end'];
        }

        $record = new Record($project_id, $settings->event_id, $record_id, $data);

        $data = $record->getData();
        $response = \RedCap::saveData($project_id, 'array', $data);
        $this->logSaveAction($project_id, $record_id, $irb_number, $MRN=$xml_data['MRN'], $response);
    }

    private function logSaveAction($project_id, $record_id, $irb_number, $MRN, $response)
    {
        $record_id = implode(', ', $response['ids']);
        $log = new LogModel(__FUNCTION__, [
            'project_id' => $project_id,
            'record_id' => $record_id,
            'irb_number' => $irb_number,
            'MRN' => $MRN,
        ]);
        if($error = $response['errors'])
        {
            $log->status = 'error';
            $log->description = "error creating new record: {$error}";
        }else
        {
            $log->status = 'success';
            $log->description = "new record created";
        }
        $log->save($this->module);
    }

     /**
     * @return mixed checks if the project is connected to a research
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
     * @return Record|false returns the record if MRN is found or false otherwise
     */
    private function checkMRN($project_id, $MRN)
    {
        $settings = $this->getModuleSettingsForProject($project_id);
        $mrn_field_name =$settings->mrn_field_name;
        $event_id = $settings->event_id;
        $record = Record::find($project_id, $event_id, $mrn_field_name, $MRN);
        // $field = Field::find(array('event_id' => $event_id,'field_name' => $mrn_field_name,'value' => $MRN));
        if($record) return $record;
        return false;
    }

    /**
     * @return array ids of the projects which have enabled this module
     */
    public function getFetchingEnabledProjects()
    {
        $sql="SELECT s.project_id
                FROM redcap_external_modules m, redcap_external_module_settings s
                WHERE m.external_module_id = s.external_module_id
                AND m.directory_prefix = '{$this->module->PREFIX}'
                AND s.`key` = 'enabled'
                AND s.value = 'true'";
        $query = $this->module->query($sql);

        if($error = db_error()){
            throw new \Exception($sql.': '.$error);
        }

        $projects = array();
        while($row = db_fetch_assoc($query))
        {
            $project_id =  $row['project_id'];
            $project = new \Project($project_id);
            $projects[] = $project; // Array with projects
        }

        return $projects;
    }

}