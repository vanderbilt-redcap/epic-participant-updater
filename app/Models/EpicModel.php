<?php namespace Vanderbilt\EpicParticipantUpdater\App\Models;

use Vanderbilt\EpicParticipantUpdater\EpicParticipantUpdater;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\EpicXMLParser;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\Record as RecordHelper;
use Vanderbilt\EpicParticipantUpdater\App\Models\Settings;


class EpicModel extends BaseModel
{

    /**
     * settings helper
     *
     * @var Settings
     */
    private $settings;
    /**
     * constructor
     *
     * @param EpicParticipantUpdater $module
     */
	function __construct($module)
	{
        $this->module = $module;
        $this->settings = new Settings($module);
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
            return $this->handleSOAPRequest($HTTP_RAW_POST_DATA);

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
        $project_ids = $this->getModuleEnabledProjectsIds();
        if(empty($project_ids))
        {
            $this->log($log_message, [
				'status' => Logger::STATUS_INFO, // generic message
				'description' => 'no projects enabled',
            ]);
            return false;
        }
        
        // check for projects that are using the same irb number of the XML
        foreach($project_ids as $project_id)
        {
            $watched_studies = $this->getWatchedStudies($project_id, $xml_data);
            
            foreach ($watched_studies as $study_id) {
                    $this->saveData($project_id, $study_id, $xml_data);
            }
        }

        $this->log($log_message, [
            'status' => Logger::STATUS_INFO, // generic message
            'description' => sprintf("xml checked for projects %s", implode(', ', $project_ids)),
        ]);

        return $project_ids;
    }

    private function saveData($project_id, $study_id, $xml_data) {
        $record_id = $this->getRecordIdForMrn($project_id, $xml_data['MRN']); // check for existing 
        if($record_id)
        {
            //update
            $this->updateRecord($project_id, $record_id, $study_id, $xml_data);
        }else{
            //create
            $this->createRecord($project_id, $study_id, $xml_data);
        }
    }

    /**
     * get a list of watched studies for a project
     *
     * @param integer $project_id
     * @param array $xml_data
     * @return array
     */
    private function getWatchedStudies($project_id, $xml_data)
    {
        $xml_study_ids = $xml_data['study_ids'] ?: array();
        $project_study_ids = $this->settings->getStudyIDs($project_id);
        if($project_study_ids===EpicParticipantUpdater::CATCH_ALL_IDENTIFIER) {
            $watched_studies = $xml_study_ids;
        }else {
            $watched_studies = array_intersect($project_study_ids, $xml_study_ids);
        }
        return $watched_studies;
    }
    
    /**
     * get IRB number from a project
     *
     * @param \Project $project
     * @return string
     */
    public function getIrbNumberFromProject($project_id)
    {
        $project = new \Project($project_id);
        $project_info = $project->project;
        return $project_info['project_irb_number'] ?: false;
    }

    /**
     * get a record compatible with REDCap::saveData
     *
     * @param integer $project_id
     * @param string $record_id
     * @param string $study_id used for repeated instances
     * @param string $xml_data
     * @return array
     */
    private function getRecord($project_id, $record_id, $study_id, $xml_data)
    {
        // $record_id_field = $this->getProjectPrimaryKey($project_id); // get the name of the project record id field
        // get the settings fot the current project
        $status_field_name = $this->settings->getStatusFieldName($project_id);
        $mrn_field_name = $this->settings->getMrnFieldName($project_id);
        $date_start_field_name = $this->settings->getStartDateFieldName($project_id);
        $date_end_field_name = $this->settings->getEndDateFieldName($project_id);
        $study_id_field_name = $this->settings->getStudyIdFieldName($project_id);
        $event_id = $this->settings->getEventID($project_id);

        // set the mandatory fields
        $fields = array(
            $mrn_field_name => trim($xml_data['MRN']),
            $status_field_name  => trim($xml_data['status']),
        );
        // add study ID if mapped
        if(!empty($study_id_field_name)) $fields[$study_id_field_name] = $study_id;
        // add dates if mapped
        if(!empty($date_start_field_name)) $fields[$date_start_field_name] = trim($xml_data['date-start']);
        if(!empty($date_end_field_name)) $fields[$date_end_field_name] = trim($xml_data['date-end']);

        $instance = RecordHelper::getInstance($project_id, $event_id, $record_id, $study_id_field_name, $study_id);
        $form_name = $this->shouldStoreStudyAsRepeatedForm($project_id);
        $record = RecordHelper::getRecordSchema($project_id, $event_id, $record_id, $fields, $instance, $form_name);

        return $record;
    }

    /**
     * check if the study related data is set to be stored in a repeatable instrument
     *
     * @param integer $project_id
     * @return string|false return the name of the repeatable form or false if not found
     */
    private function shouldStoreStudyAsRepeatedForm($project_id)
    {
        /**
         * helper function to check if all study related fields are in the same instrument
         */
        $areStudyFieldsInSameIntrument = function($study_related_fields, $project_metadata) {
            $form_name = null;
            foreach ($study_related_fields as $key => $field_name) {
                $field_data = $project_metadata[$field_name] ?: false;
                if(!$field_data) return false; //exit if the provided field name is not in the project
                $current_form_name = $field_data['form_name'];
                if(empty($form_name)) {
                    // form name set for the first time; go to next field
                    $form_name = $current_form_name;
                    continue;
                }
                // return false if any field belongs to a different form
                if($form_name!==$current_form_name) return false;
            }
            return $form_name; // checked that all fields belong to the same form
        };

        $project = new \Project($project_id);
        $repeatable_forms = $project->getRepeatingFormsEvents();
        if(empty($repeatable_forms)) {
            // no repeatable forms; exit
            return false;
        }

        $event_ID = $this->settings->getEventID($project_id); // event containing study related fields
        $event_repeatable_forms = $repeatable_forms[$event_ID] ?: array();
        if(empty($event_repeatable_forms)) {
            // the event ID specified in the module settings does not contain any repeatable form; exit
            return false;
        }
        
        $project_metadata = $project->metadata; // get list of fields in the project
        $study_related_fields = array(
            'study_id' => $this->settings->getStudyIdFieldName($project_id),
            'status' => $this->settings->getStatusFieldName($project_id),
            'date_start' => $this->settings->getStartDateFieldName($project_id),
            'date_end' => $this->settings->getEndDateFieldName($project_id),
        );

        $repeatable_form_name = $areStudyFieldsInSameIntrument($study_related_fields, $project_metadata);
        if(!$repeatable_form_name || !array_key_exists($repeatable_form_name, $event_repeatable_forms)) return false;
        return $repeatable_form_name;
    }
            
    /**
     * insert a new record or update an existing one
     *
     * @param \Project $project
     * @param array $xml_data
     * @param string $existing_record_id
     * @return void
     */
    private function createRecord($project_id, $study_id, $xml_data)
    {
        // get the first available record_id
        $record_id = $this->module->addAutoNumberedRecord($project_id);
        
        $record = $this->getRecord($project_id, $record_id, $study_id, $xml_data);
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
            'study_id' => $study_id,
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
    private function updateRecord($project_id, $record_id, $study_id, $xml_data)
    {

        $record = $this->getRecord($project_id, $record_id, $study_id, $xml_data);
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
            'study_id' => $study_id,
            'MRN' => $xml_data['MRN']
        ]);
    }

    private function log($message, $parameters=[])
    {
        $logger = new Logger($this->module);
        $logger->log($message, $parameters);
    }
    
    /**
     * check if the MRN is available in the specified project
     * 
     * @return string|false returns the record if MRN is found or false otherwise
     */
    private function getRecordIdForMrn($project_id, $MRN)
    {
        $mrn_field_name = $this->settings->getMrnFieldName($project_id);
        $event_id = $this->settings->getEventID($project_id);
        $record_id = RecordHelper::findRecordID($project_id, $event_id, $mrn_field_name, $MRN);
        return $record_id;
    }

    /**
     * get a list of projects using the module
     * 
     * @return array ids of the projects which have enabled this module
     */
    public function getModuleEnabledProjectsIds()
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

        $project_ids = array();
        while($row = db_fetch_assoc($result))
        {
            $project_id =  $row['project_id'];
            $project_ids[] = $project_id; // Array with project IDs
        }

        return $project_ids;
    }

}