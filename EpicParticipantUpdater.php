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
            $random_string = RandomString::generate();
            $this->setSystemSetting($this->api_token_key, $random_string);
        }
    }

    function redcap_module_system_enable($version) {
        try {
            $this->checkAPIToken();

            $autoload = join([__DIR__,'vendor','autoload.php'],DIRECTORY_SEPARATOR);
            if(!file_exists($autoload))
            {
                $dh = new \Vanderbilt\EpicParticipantUpdater\App\Helpers\DependencyHelper(__DIR__);
                $dh->installDependencies();
            }
        } catch (\Throwable $th) {
            echo $th->getMessage();
        }
    }

}