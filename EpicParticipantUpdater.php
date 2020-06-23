<?php
namespace Vanderbilt\EpicParticipantUpdater;

$autoload = join([__DIR__,'vendor','autoload.php'],DIRECTORY_SEPARATOR);
if(file_exists($autoload)) require_once($autoload);

require join([__DIR__, 'app', 'Helpers', 'DependencyHelper.php'],DIRECTORY_SEPARATOR);

use ExternalModules\AbstractExternalModule;
use Firebase\JWT\JWT;

class EpicParticipantUpdater extends AbstractExternalModule {
    
    private $api_token_key = 'api_token';

    function __construct()
    {
        parent::__construct();
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
            "iss" => $issuer_claim, // this can be the server name or url
            "aud" => $audience_claim = "EPIC", // the referrer website
            "iat" => $issuedat_claim = time(), // issued at
            "nbf" => $notbefore_claim = $issuedat_claim, //not before in seconds
            "exp" => $expire_claim = $expiration_date->getTimestamp(), // expire time in seconds
        );
        $token = JWT::encode($data, $this->secret);

        $this->setSystemSetting($this->api_token_key, $token);
        return $token;
    }

    /**
     * function executed when the module is enabled
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

}