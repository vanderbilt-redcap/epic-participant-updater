<?php namespace Vanderbilt\EpicParticipantUpdater\App\Models;

use Vanderbilt\EpicParticipantUpdater\App\Helpers\EpicDataPush;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\Record;
use Vanderbilt\EpicParticipantUpdater\App\Models\Settings;
use Vanderbilt\EpicParticipantUpdater\EpicParticipantUpdater;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\EpicXMLParser;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\Record as RecordHelper;


class EpicModel extends BaseModel
{

    /**
     *
     * @var EpicParticipantUpdater
     */
    private $module;

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
        //<ep1:Envelope xmlns="urn:hl7-org:v3" xmlns:ep1="http://www.w3.org/2003/05/soap-envelope"><ep1:Header><ep2:Action ep1:mustUnderstand="1" xmlsn:ep2="http://www.w3.org/2005/08/addressing">EnrollPatientRequestResponse</ep2:Action></ep1:Header><ep1:Body><ep3:EnrollPatientRequestResponse xmlns:ep3="urn:ihe:qrph:rpe:2009" xmlns="urn:hl7-org:v3"><ep3:processState>Interested</ep3:processState><ep3:patient><ep3:candidateID extension="010004249" root="1.2.840.114350.1.13.478.3.7.5.737384.14"/><ep3:name><given>Yellow</given><family>Craigtest</family></ep3:name><ep3:address><streetAddressLine>380 Thompson Lane</streetAddressLine><city>Nashville</city><state>TN</state><postalCode>37211</postalCode><country>US</country></ep3:address><ep3:dob value="19650117"/></ep3:patient><study><instantiation><plannedStudy><id extension=" ;150403"/></plannedStudy></instantiation></study></ep3:EnrollPatientRequestResponse></ep1:Body></ep1:Envelope>
	    $xmlData = EpicxmlParser::parse($xml_string);
		$status = $xmlData['status'];
		$MRN = $xmlData['MRN'];
		$loadStr = EpicDataPush::generateXML($status,"EnrollPatientRequestResponse",$MRN,$xmlData);

	    $headers  = "From: noreply@vumc.org\r\n";
	    $headers .= "Reply-To: noreply@vumc.org\r\n";
	    $headers .= "MIME-Version: 1.0\r\n";
	    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
		mail("james.r.moore@vumc.org,adam.lewis@vumc.org","Epic XML Communications","Original message from Epic:<br/>".htmlspecialchars($xml_string)."<br/><br/>XML Going Back to Epic:<br/>".htmlspecialchars($loadStr),$headers);
        Header('Content-Type: application/soap+xml; charset=utf-8');
        echo $loadStr;
        exit(0);
    }

    /**
     * check if the project structure is valid and can
     * correctly save data
     *
     * @param integer $project_id
     * @return boolean
     */
    private function checkProjectFormsStucture($project_id) {
        // check for mandatory fields (MRN and study status)
        $mrn_field_name = $this->settings->getMrnFieldName($project_id);
        if(empty($mrn_field_name)) throw new \Exception("Error: no 'MRN' field has been specified for the project ID {$project_id}", 400);
        $status_field_name = $this->settings->getStatusFieldName($project_id);
        if(empty($status_field_name)) throw new \Exception("Error: no 'study status' field has been specified for the project ID {$project_id}", 400);

        // check if studies are being watched and settings are ok
        $watched_study_ids = $this->settings->getStudyIDs($project_id);
        if(!is_array($watched_study_ids) && $watched_study_ids!==EpicParticipantUpdater::CATCH_ALL_IDENTIFIER) throw new \Exception("Invalid 'study ID' setting for project ID {$project_id}", 400);
        if(empty($watched_study_ids)) throw new \Exception("No study is being watched for the project ID {$project_id}", 400);

        $date_start_field_name = $this->settings->getStartDateFieldName($project_id);
        $date_end_field_name = $this->settings->getEndDateFieldName($project_id);
        $study_id_field_name = $this->settings->getStudyIdFieldName($project_id);
        $dob_field_name = $this->settings->getDOBFieldName($project_id);
        $firstname_field_name = $this->settings->getFirstNameFieldName($project_id);
        $lastname_field_name = $this->settings->getLastNameFieldName($project_id);
        
        $must_save_as_repeatable = ($watched_study_ids===EpicParticipantUpdater::CATCH_ALL_IDENTIFIER || (is_array($watched_study_ids) && count($watched_study_ids)>1));
        // mandatory fields are ok and only 1 study is being watched
        if(!$must_save_as_repeatable) return true;


        // group study related fields
        $study_related_fields = array(
            'study_id' => $study_id_field_name,
            'status' => $status_field_name,
        );
        // add optional fields. this can be repeated in case of multiple studies, so must be in the same instrument
        if(!empty($date_start_field_name)) $study_related_fields['date_start'] = $date_start_field_name;
        if(!empty($date_end_field_name)) $study_related_fields['date_end'] = $date_end_field_name;

        /**
         * helper function to check if all study related fields are in the same instrument
         */
        $areStudyFieldsInSameIntrument = function($project_id, $study_related_fields) {
            $project = new \Project($project_id);
            $project_metadata = $project->metadata;
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

        if($areStudyFieldsInSameIntrument($project_id, $study_related_fields)) return true;
        else throw new \Exception("Error: study related fields must be in the same instrument", 400);
    }

     /**
     * 
     * log _project_id and _record_id when updating and creating log entries
     * because the log module doen't allow to override those values
     */
    private function checkXML($xml_data=[])
    {
        // check if the status is allowed by the project settigs
        $isStatusAllowed = function($project_id, $xml_data) {
            $status = @$xml_data['status'];
            $lowercase_status = strtolower($status);
            $list = $this->settings->getStatusList($project_id);
            if(empty($list)) return true;
            $match = false;
            foreach ($list as $item) {
                $match = $lowercase_status===strtolower($item);
                if($match) break;
            }
            return boolval($match);
        };
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

        // get study IDs from XML
        $study_ids = $xml_data['study_ids'];
        
        // check for projects that are using the same irb number of the XML
        foreach($project_ids as $project_id)
        {
            if(!$isStatusAllowed($project_id, $xml_data)) {
                $this->log('status skipped', [
                    'status' => Logger::STATUS_INFO, // generic message
                    'description' => sprintf("status '%s' not allowed in project %u by settings", @$xml_data['status'], $project_id),
                ]);
                continue;
            }

            try {
                $this->checkProjectFormsStucture($project_id);
            } catch (\Exception $e) {
                $message = $e->getMessage();
                $code = $e->getCode();
                $this->log($log_message, [
                    'status' => Logger::STATUS_ERROR, // generic message
                    'description' => "$message - code: $code",
                    'project_id'=> $project_id,
                ]);
                continue;
            }
            $watched_studies = $this->getWatchedStudies($project_id, $xml_data);
            
            foreach ($study_ids as $study_id) {
                $catch_all = $watched_studies===EpicParticipantUpdater::CATCH_ALL_IDENTIFIER;
                if($catch_all || in_array($study_id, $watched_studies)) {
                    $this->saveData($project_id, $study_id, $xml_data);
                }
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
            // get the first available record_id
            $record_id = $this->module->addAutoNumberedRecord($project_id);
            //create
            $this->createRecord($project_id, $record_id, $study_id, $xml_data);
        }

        $this->callREDCapSaveHook($project_id,$record_id,$study_id);
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
        // get the settings fot the current project
        $status_field_name = $this->settings->getStatusFieldName($project_id);
        $mrn_field_name = $this->settings->getMrnFieldName($project_id);
        $date_start_field_name = $this->settings->getStartDateFieldName($project_id);
        $date_end_field_name = $this->settings->getEndDateFieldName($project_id);
        $study_id_field_name = $this->settings->getStudyIdFieldName($project_id);
        $dob_field_name = $this->settings->getDOBFieldName($project_id);
        $firstname_field_name = $this->settings->getFirstNameFieldName($project_id);
        $lastname_field_name = $this->settings->getLastNameFieldName($project_id);
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
        if(!empty($dob_field_name)) $fields[$dob_field_name] = trim($xml_data['dob']);
        if(!empty($firstname_field_name)) $fields[$firstname_field_name] = trim($xml_data['first-name']);
        if(!empty($lastname_field_name)) $fields[$lastname_field_name] = trim($xml_data['last-name']);

        $instance = RecordHelper::getInstanceNumber($project_id, $event_id, $record_id, $study_id_field_name, $study_id);
        $record = RecordHelper::getRecordSchema($project_id, $event_id, $record_id, $fields, $instance);

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
    private function createRecord($project_id, $record_id, $study_id, $xml_data)
    {
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
     * @param integer $project_id
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
        Logger::make()->log($message, $parameters);
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
     * check module is set up to call 'redcap_save_record' hook and call it
     *
     * @return void
     */
    private function callREDCapSaveHook($project_id,$record_id,$study_id) {
        if ($record_id) {
            $study_id_field_name = $this->settings->getStudyIdFieldName($project_id);
            $event_id = $this->settings->getEventID($project_id);
            $instance = RecordHelper::getInstanceNumber($project_id, $event_id, $record_id, $study_id_field_name, $study_id);
            $formData = Record::getFormData($project_id);

            $callHook = $this->settings->getCallHook($project_id);
            if ($callHook == "yes") {
                $_GET['pid'] = $project_id;
                \Hooks::call('redcap_save_record', array($project_id, $record_id, $formData[$study_id_field_name]->form_name, $event_id, null, null, null, $instance));
            }
        }
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
        $result = db_query($query_string);

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