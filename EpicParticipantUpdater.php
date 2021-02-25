<?php
namespace Vanderbilt\EpicParticipantUpdater;

$autoload = join([__DIR__,'vendor','autoload.php'],DIRECTORY_SEPARATOR);
if(file_exists($autoload)) require_once($autoload);

require join([__DIR__, 'app', 'Helpers', 'DependencyHelper.php'],DIRECTORY_SEPARATOR);

use ExternalModules\AbstractExternalModule;
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
    const SETTINGS_FIELD_EVENT_ID = 'event-id'; // mapped event
    const SETTINGS_FIELD_STATUS_LIST = 'status-list'; // mapped event

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
    function redcap_module_system_enable($version) {
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
        if(empty($study_id_setting) && !empty($irb_number)) {
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
        if(empty($api_token))
        {
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