<?php namespace Vanderbilt\EpicParticipantUpdater\App\Models;

use Vanderbilt\EpicParticipantUpdater\EpicParticipantUpdater;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\File as FileHelper;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\EpicXMLParser;

class EpicModel extends BaseModel {

	private $mrn_mapping_key = 'mrn-mapping';
    private $status_mapping_key = 'status-mapping';
	
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
			else if( !empty($HTTP_RAW_POST_DATA) ){
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
        $current_response = $this->checkXML($xml_data);
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
        $stripped_xml = EpicXMLParser::strip_XML_namespaces($xml_string); // remove namespace prefixes
        $xml = @simplexml_load_string($stripped_xml);
        /* $nameSpaces = $xml->getNameSpaces(true);
        foreach($nameSpaces as $namespace => $uri) {
            $xml->registerXPathNamespace($namespace, $uri);
        }*/
        $patientRequest = $xml->Body->CallService->requestBody->EnrollPatientRequestRequest;
        $responseXML = new \SimpleXMLElement($patientRequest->asXML());
        Header('Content-type: text/xml');
        echo $responseXML->asXML();
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
        $proj = new \Project($project_id);
        // return key($proj->metadata);
        return $proj->table_pk;
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
            $project_id = $project['project_id'];
            $projectIsInResearch = $this->checkIRB($project_id, $xml_data['irbNumber']); // check for existing
            
            if(!$projectIsInResearch) continue; //continue to next project loop
            
            $record = $this->checkMRN($project_id, $xml_data['MRN']); // check for existing 
            
            if($record)
            {
                $this->updateRecord($project, $record, $xml_data);
            }
            else
            {
                $this->createRecord($project, $xml_data);
            }
        }
        $response = [
            'status' => 'info',
            'message' => 'xml checked for all projects',
            'projects' => $projects,
        ];
        $log = new LogModel(__FUNCTION__, $response);
        $log->save($this->module);
        return $response;
    }
    
    /**
     * update the status of an existing record
     */
    private function updateRecord($project, $record, $xml_data)
    {
        $project_id = $project['project_id'];
        $irb_number = $project['project_irb_number'];
        $status_field_name = $this->module->getProjectSetting($this->status_mapping_key, $project_id);
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
     * create a new record
     */
    private function createRecord($project, $xml_data)
    {
        $project_id = $project['project_id'];
        $irb_number = $project['project_irb_number'];
        $record_id_field = $this->getProjectPrimaryKey($project_id); // get the name of the project record id field
        $mrn_field_name = $this->module->getProjectSetting($this->mrn_mapping_key, $project_id);
        $status_field_name = $this->module->getProjectSetting($this->status_mapping_key, $project_id);
        
        $data = array(
            $record_id_field => $this->module->addAutoNumberedRecord($project_id),
            $mrn_field_name => $xml_data['MRN'],
            $status_field_name => trim($xml_data['status']),
        );
        
        $response = \RedCap::saveData($project_id, 'json', json_encode(array($data)));
        $record_id = implode(', ', $response['ids']);
        $log = new LogModel(__FUNCTION__, [
            'project_id' => $project_id,
            'record_id' => $record_id,
            'irb_number' => $irb_number,
            'MRN' => $xml_data['MRN'],
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
    private function checkIRB($project_id, $irbNumber)
    {
        $Project = new \Project($project_id);
        $project_irb_number = $Project->project['project_irb_number'];
        if ( !isset($project_irb_number) || is_null($project_irb_number) )
            return false; // no IRB number set for this project

        return ($irbNumber === $project_irb_number);
    }
    
    /**
     * @return mixed returns the record if MRN is found or false otherwise
     */
    private function checkMRN($project_id, $MRN)
    {
        $mrn_field_name = $this->module->getProjectSetting($this->mrn_mapping_key, $project_id);
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
            $projects[] = $project->project; // Array with project's basic values
        }

        return $projects;
    }

}