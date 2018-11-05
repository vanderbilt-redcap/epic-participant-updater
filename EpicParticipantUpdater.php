<?php
namespace Vanderbilt\EpicParticipantUpdater;

require_once join(['vendor','autoload.php'],DIRECTORY_SEPARATOR);

use Vanderbilt\EpicParticipantUpdater\App\Helpers\File as FileHelper;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\Logger;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\EpicXMLParser;
// use Vanderbilt\EpicParticipantUpdater\App\Helpers\DependencyHelper;

use ExternalModules\AbstractExternalModule;

class EpicParticipantUpdater extends AbstractExternalModule {
    
    function __construct()
    {
        parent::__construct();
    }

    function redcap_module_system_enable($version)
    {
        Logger::log($this->logFile, "enabled");
    }
    
    function redcap_module_system_disable($version)
    {
        Logger::log($this->logFile, "disabled");
    }

    public function log($message,$parameters=[])
    {
        foreach ($parameters as $key => &$value) {
            if($key==='message')
            {
                // message cannot be a parameter
                unset($parameters[$key]);
            }else {
                if(is_array($value)) $value = implode(', ',$value);
            }
        }
        parent::log($message,$parameters);
    }

}