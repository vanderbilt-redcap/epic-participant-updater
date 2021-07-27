<?php
namespace Vanderbilt\EpicParticipantUpdater;

$autoload = join(DIRECTORY_SEPARATOR, [__DIR__,'vendor','autoload.php']);
if(file_exists($autoload)) require_once($autoload);

require join(DIRECTORY_SEPARATOR, [__DIR__, 'app', 'Helpers', 'DependencyHelper.php']);

use ExternalModules\AbstractExternalModule;
use ExternalModules\ExternalModules;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\EpicXMLParser;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\RandomString;
use Vanderbilt\EpicParticipantUpdater\App\Models\EpicModel;

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
    const SETTINGS_FIELD_STUDY_ID = 'study-id-mapping-field'; // mapped field
    const SETTINGS_FIELD_DOB = 'dob-mapping-field'; // mapped field
    const SETTINGS_FIELD_FIRSTNAME = 'fn-mapping-field'; // mapped field
    const SETTINGS_FIELD_LASTNAME = 'ln-mapping-field'; // mapped field
    const SETTINGS_FIELD_EVENT_ID = 'event-id'; // mapped event
    const SETTINGS_FIELD_STATUS_LIST = 'status-list'; // mapped event

    const ON_STUDY_STATUS = "ON STUDY";

    /**
     * identifier to catch all study IDs
     */
    const CATCH_ALL_IDENTIFIER = '*';

    private $api_token_key = 'api_token';

    function __construct()
    {
        parent::__construct();
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
        $xml_string = file_get_contents(ExternalModules::getModuleDirectoryPath($this->PREFIX)."/data/AlertProtocolState.xml");
        $url = $this->getProjectSetting('epic-upload-url');
        $ch = curl_init();
        curl_setopt($ch,CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_POSTFIELDS, "xmlRequest=".$xml_string);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 300);
        $data = curl_exec($ch);
        curl_close($ch);
        $array_data = json_decode(json_decode(@simplexml_load_string($data)),true);
        echo "<pre>";
        print_r($array_data);
        echo "</pre>";
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
        /*libxml_use_internal_errors(true);
        $xml_string = file_get_contents(ExternalModules::getModuleDirectoryPath($this->PREFIX)."/data/request_DEV_dates.xml");
        $xmlData = EpicXMLParser::parse($xml_string);
        $model = new EpicModel($this);
        $response = $model->checkXML($xmlData);
        echo "<pre>";
        print_r($response);
        echo "</pre>";*/
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
        return $token;
    }

}