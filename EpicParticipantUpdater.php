<?php
namespace Vanderbilt\EpicParticipantUpdater;

$autoload = join(DIRECTORY_SEPARATOR, [__DIR__,'vendor','autoload.php']);
if(file_exists($autoload)) require_once($autoload);


use ExternalModules\AbstractExternalModule;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\EpicXMLParser;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\RandomString;
use Vanderbilt\EpicParticipantUpdater\App\Models\EpicModel;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\EpicDataPush;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\Record as RecordHelper;
use Vanderbilt\EpicParticipantUpdater\App\Models\Logger;

class EpicParticipantUpdater extends AbstractExternalModule
{

    /**
     * module settings keys
     */
    const SETTINGS_STUDY_ID = 'study-id'; // ID list of watched studies
    const SETTINGS_FIELD_MRN = 'mrn-mapping-field'; // mapped field
    const SETTINGS_FIELD_STATUS = 'status-mapping-field'; // mapped field
    const SETTINGS_FIELD_DATE_START = 'date-start-mapping-field'; // mapped field
    const SETTINGS_FIELD_DATE_END = 'date-end-mapping-field'; // mapped field
    const SETTINGS_FIELD_DOB = 'dob-mapping-field'; // mapped field
    const SETTINGS_FIELD_FIRSTNAME = 'fn-mapping-field'; // mapped field
    const SETTINGS_FIELD_LASTNAME = 'ln-mapping-field'; // mapped field
    const SETTINGS_FIELD_EVENT_ID = 'event-id'; // mapped event
    const SETTINGS_FIELD_STUDY_ID = 'study-id-mapping-field'; // mapped field
    const SETTINGS_FIELD_STATUS_LIST = 'status-list'; // mapped event
    const SETTINGS_CALL_HOOK = 'run_hook'; // save record hook call
    const SETTINGS_PUSH_FORM = 'push-form'; // Have to specify which survey should be completed to trigger status push to Epic
    const SETTINGS_PUSH_FIELD = 'push-field'; // Field to trigger status push to Epic
    const SETTINGS_PUSH_VALUE = 'push-value'; // Value in field to trigger status push to Epic
    const SETTINGS_PUSH_STATUS = 'push-status'; // Status value to push for any field combination
    const SETTINGS_USE_ALTERNATE_ID = 'use-alternate-id';
    const SETTINGS_ALTERNATE_ID_FIELD = 'alternate-id-field';
    const SETTINGS_EPIC_UPLOAD_URL = 'epic-upload-url';

    const ON_STUDY_STATUS = "ON STUDY";

    /**
     * identifier to catch all study IDs
     */
    const CATCH_ALL_IDENTIFIER = '*';

    private $api_token_key = 'api_token';

    /**
     *
     * @var EpicParticipantUpdater
     */
    private static $instance;

    function __construct()
    {
        parent::__construct();
    }

    /**
     *
     * @return EpicParticipantUpdater
     */
    public static function getInstance() {
        global $module;
        if($module instanceof EpicParticipantUpdater) return $module;
        if (!self::$instance) {
          self::$instance = new self();
        }
        return self::$instance;
      }
    

    /**
     * function executed when the module is enabled at system level
     *
     * @param string $version
     * @return void
     */
    function redcap_module_system_enable($version)
    {
        try {
            $this->checkApiToken();
            // $this->installDependencies();
        } catch (\Exception $e) {
            echo $e->getMessage();
        }
    }

    /**
     * function executed when the module is enabled at project level
     *
     * @param string $version
     * @param integer $project_id
     * @return void
     */
    function redcap_module_project_enable($version, $project_id)
    {
        $this->checkStudyID($project_id);
    }

    /**
     * function executed when a survey is completed
     * @param int $project_id
     * @param string $record
     * @param string $instrument
     * @param int $event_id
     * @param int $group_id
     * @param string $survey_hash
     * @param int $response_id
     * @param int $repeat_instance
     * @return void
     */
    function redcap_survey_complete($project_id, $record, $instrument, $event_id, $group_id, $survey_hash, $response_id, $repeat_instance = 1)
    {
        $runOnRecordSave = $this->getProjectSetting('run_on_record_save', $project_id);
        if(!$runOnRecordSave) {
            $this->pushStudyStatus($project_id, $record, $instrument, $event_id, $group_id, $survey_hash, $response_id, $repeat_instance = 1);
        }
    }

    /**
    * function excecuted when viewing a REDCap data entry form for a record
    * @param int $project_id
    * @param string $record
    * @param string $instrument
    * @param int $event_id
    * @param int $group_id
    * @param string $survey_hash
    * @param int $response_id
    * @param int $repeat_instance
    * @return void
    */
    function redcap_save_record ($project_id, $record, $instrument, $event_id, $group_id = NULL, $survey_hash = NULL, $response_id = NULL, $repeat_instance = 1) {
        $runOnRecordSave = $this->getProjectSetting('run_on_record_save', $project_id);
        if($runOnRecordSave) {
            $this->pushStudyStatus($project_id, $record, $instrument, $event_id, $group_id, $survey_hash, $response_id, $repeat_instance = 1);
        }
    }

   /**
    * function excecuted when viewing a REDCap data entry form for a record
    * @param int $project_id
    * @param string $record
    * @param string $instrument
    * @param int $event_id
    * @param int $group_id
    * @param int $repeat_instance
    * @return void
    */
    function redcap_data_entry_form ($project_id, $record, $instrument, $event_id, $group_id, $repeat_instance = 1 )
    {
		/*$testString = '<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://www.w3.org/2005/08/addressing"><s:Header><a:Action s:mustUnderstand="1"/><a:MessageID>urn:uuid:7df6fcbf-4fba-4ed4-b523-c5b33628c641</a:MessageID><a:ReplyTo><a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address></a:ReplyTo><a:From><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:From><a:To s:mustUnderstand="1">https://redcaptest.vumc.org/api/?NOAUTH&amp;prefix=epic_participant_updater&amp;type=module&amp;page=api&amp;route=check&amp;api_token=eyJpYXQiOjE1OTQyNDAzMDAsImhhc2giOiJ2aWtKQUlFbUdPUTA0MFdDIn0=</a:To></s:Header><s:Body><rpe:AlertProtocolState xmlns:rpe="urn:ihe:qrph:rpe:2009" xmlns="urn:hl7-org:v3"><rpe:processState>On Study</rpe:processState><rpe:patient><rpe:candidateID extension="002105534" root="1.2.840.114350.1.13.478.3.7.5.737384.14"/><rpe:name><given>Adam</given><family>Test</family></rpe:name><rpe:address><streetAddressLine>2209 E Lake St</streetAddressLine><city>MURFREESBORO</city><state>TN</state><postalCode>37129</postalCode><country>US</country></rpe:address><rpe:dob value="19870808"/></rpe:patient><study><instantiation><plannedStudy><id extension="TEST-1"/></plannedStudy></instantiation><component1><studyActivitiesAtSite><subject1><experimentalUnit><effectiveTime><low value="20220418"/></effectiveTime></experimentalUnit></subject1><secondaryPerformer><serviceProvider><id extension="INTRC"/></serviceProvider></secondaryPerformer></studyActivitiesAtSite></component1></study></rpe:AlertProtocolState></s:Body></s:Envelope>';
		$parsed = EpicXMLParser::parse($testString);
		echo "Parsed:<br/>";
		echo "<pre>";
		print_r($parsed);
		echo "</pre>";
	    $status = $parsed['status'];
	    $MRN = $parsed['MRN'];
	    $method = $parsed['method'];
	    $loadStr = EpicDataPush::generateXML($status,$method,$MRN,$parsed,'response');
		echo htmlspecialchars($loadStr);*/
    }

    function pushStudyStatus($project_id, $record, $instrument, $event_id, $group_id = NULL, $survey_hash = NULL, $response_id = NULL, $repeat_instance = 1) {
        $url = $this->getSystemSetting(self::SETTINGS_EPIC_UPLOAD_URL);
        $surveysToPush = $this->getProjectSetting(self::SETTINGS_PUSH_FORM,$project_id);
        $studyField = $this->getProjectSetting(self::SETTINGS_FIELD_STATUS,$project_id);
        $triggerFields = $this->getProjectSetting(self::SETTINGS_PUSH_FIELD,$project_id);
        $triggerValues = $this->getProjectSetting(self::SETTINGS_PUSH_VALUE,$project_id);
        $statusValues = $this->getProjectSetting(self::SETTINGS_PUSH_STATUS,$project_id);
        $useAlternateID = $this->getProjectSetting(self::SETTINGS_USE_ALTERNATE_ID,$project_id);
        $alternateIDField = $this->getProjectSetting(self::SETTINGS_ALTERNATE_ID_FIELD,$project_id);
        $currentProject = new \Project($project_id);

        foreach ($surveysToPush as $index => $surveyToPush) {
            if ($surveyToPush == $instrument) {
                $statusValue = $statusValues[$index];

                if ($statusValue == "") continue;
                $triggerField = $triggerFields[$index];
                $triggerValue = $triggerValues[$index];
                $currentTriggerValue = "";
                if ($triggerField != "") {
                    $currentTriggerValue = RecordHelper::findFieldValue($project_id, $record, $event_id, $triggerField, $repeat_instance);
                }

                if ($triggerField == "" || ($triggerField != "" && $triggerValue == "" && $currentTriggerValue != "") || ($triggerField != "" && $triggerValue != "" && $currentTriggerValue == $triggerValue)) {
                    // $alternateData is an array of data with keys matching the contants referring to mapping fields
                    $data = RecordHelper::getInstanceData($project_id, $record, $repeat_instance, $event_id, $alternateData);
                    // check if alternate record ID should be used
                    $alternateID = $data[$alternateIDField] ?? '';
                    $recordID = ($useAlternateID==true && !empty($alternateID)) ? $alternateID : $record;
                    $xml_string = EpicDataPush::generateXML($statusValue, "AlertProtocolState", $recordID, $alternateData);
                    $result = EpicDataPush::uploadParticipantXML($url, $xml_string);

                    $requestStatus = $logString = "Unknown EPIC upload result";

                    if (strpos($result, "Patient Validation failed") !== false) {
                        $requestStatus = $logString = "Patient could not be validated in Epic";
                    } elseif (strpos($result, "ALERT_RECEIVED") !== false) {
                        $requestStatus = $logString = "Patient status '$statusValue' received by Epic";
                        $fields = array($currentProject->table_pk => $record, $studyField => $statusValue);
                        $saveData = RecordHelper::getRecordSchema($project_id, $event_id, $record, $fields, $repeat_instance);
                        $saveResult = \REDCap::saveData($project_id, 'array', $saveData);
                    } else {
                        $logString .= " - $result";
                    }

                    Logger::make()->log('pushing payload to Epic', [
                        'project_id' => $project_id,
                        'record_id' => $record,
                        'status' => Logger::STATUS_INFO,
                        'description' => "$requestStatus\n" . $xml_string
                    ]);
	                /*$headers  = "From: noreply@vumc.org\r\n";
	                $headers .= "Reply-To: noreply@vumc.org\r\n";
	                $headers .= "MIME-Version: 1.0\r\n";
	                $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
	                mail("james.r.moore@vumc.org,adam.lewis@vumc.org","Status Push to Epic XML","Message Sent to Epic:<br/>".htmlspecialchars($xml_string)."<br/><br/>Message Back from Epic:<br/>".htmlspecialchars($result),$headers);*/
                    \REDCap::logEvent("Epic Status Push $statusValue for record $record", $logString);
                }
            }
        }
    }

    /**
     * set study ID to the project IRB number by default
     *
     * @param int $project_id
     * @return void
     */
    function checkStudyID($project_id)
    {
        $epic_model = new EpicModel($this);
        $study_id_setting = $this->getProjectSetting(EpicParticipantUpdater::SETTINGS_STUDY_ID, $project_id);
        $irb_number = $epic_model->getIrbNumberFromProject($project_id);
        if (empty($study_id_setting) && !empty($irb_number)) {
            $this->setProjectSetting(EpicParticipantUpdater::SETTINGS_STUDY_ID, $irb_number, $project_id);
        }
    }

    public function getApiToken()
    {
        return $this->getSystemSetting($this->api_token_key);
    }

    public function getEpicUploadURL()
    {
        return $this->getSystemSetting(self::SETTINGS_EPIC_UPLOAD_URL);
    }

    /**
     * set a random API token if none is set
     *
     * @param string $token
     * @return void
     */
    function checkApiToken()
    {
        $api_token = $this->getSystemSetting($this->api_token_key);
        if (empty($api_token)) {
            // set a random API key if none has been set
            $this->generateAPIToken();
        }
    }

    /**
     * generate a JWT token to use with the protected API
     *
     * @return void
     */
    public function generateAPIToken()
    {
        $issuer_claim = APP_PATH_WEBROOT_FULL ?: 'REDCap';
        $expiration_date = new \DateTime("+ 10 years");
        // generate access token
        $data = array(
            "iat" => $issuedat_claim = time(), // issued at
            "hash" => RandomString::generate(16),
        );
        $token = base64_encode(json_encode($data));
        $this->setSystemSetting($this->api_token_key, $token);
        //return $token;
    }

    public function getSettingsForXML($project_id)
    {
        return [
            self::SETTINGS_FIELD_LASTNAME=>$this->getProjectSetting(self::SETTINGS_FIELD_LASTNAME,$project_id),
            self::SETTINGS_FIELD_FIRSTNAME=>$this->getProjectSetting(self::SETTINGS_FIELD_FIRSTNAME,$project_id),
            self::SETTINGS_FIELD_DOB=>$this->getProjectSetting(self::SETTINGS_FIELD_DOB,$project_id),
            self::SETTINGS_FIELD_MRN=>$this->getProjectSetting(self::SETTINGS_FIELD_MRN,$project_id),
            self::SETTINGS_STUDY_ID=>$this->getProjectSetting(self::SETTINGS_STUDY_ID,$project_id),
            self::SETTINGS_FIELD_STUDY_ID=>$this->getProjectSetting(self::SETTINGS_FIELD_STUDY_ID,$project_id)
        ];
    }

    public function getProjectEvent($project_id) {
        return $this->getProjectSetting(self::SETTINGS_FIELD_EVENT_ID,$project_id);
    }
}