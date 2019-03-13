<?php
namespace Vanderbilt\EpicParticipantUpdater;

$autoload = join([__DIR__,'vendor','autoload.php'],DIRECTORY_SEPARATOR);
if(file_exists($autoload)) require_once($autoload);

require join([__DIR__, 'app', 'Helpers', 'DependencyHelper.php'],DIRECTORY_SEPARATOR);

use ExternalModules\AbstractExternalModule;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\RandomString;

class EpicParticipantUpdater extends AbstractExternalModule {
    
    private $api_token_key = 'api_token';
    private $min_API_token_length = 32;

    function __construct()
    {
        parent::__construct();
    }

    public function getAPIToken()
    {
        return $this->getSystemSetting($this->api_token_key);
    }

    /**
     * set a random API token if none is set
     *
     * @param string $token
     * @return void
     */
    function checkAPIToken()
    {
        $api_token = $this->getSystemSetting($this->api_token_key);
        if(empty($api_token))
        {
            // set a random API key if none has been set
            $this->regenerateAPIToken();        
        }
    }

    /**
     * generate an API token with a random string
     *
     * @return void
     */
    public function generateAPIToken()
    {
        $random_string = RandomString::generate();
        $this->setSystemSetting($this->api_token_key, $random_string);
        return $random_string;
    }

    /**
     * function executed when the module is enabled
     *
     * @param string $version
     * @return void
     */
    function redcap_module_system_enable($version) {
        try {
            $this->checkAPIToken();
            // $this->installDependencies();
        } catch (\Throwable $th) {
            echo $th->getMessage();
        }
    }

    /**
     * download composer and install dependencies
     * if the autoload directory is not found
     *
     * @return void
     */
    private function installDependencies()
    {
        $current_directory = __DIR__;
        $autoload = join([$current_directory,'vendor','autoload.php'],DIRECTORY_SEPARATOR);
        if(!file_exists($autoload))
        {
            $dh = new \Vanderbilt\EpicParticipantUpdater\App\Helpers\DependencyHelper($current_directory);
            $dh->installDependencies();
        }
    }

}