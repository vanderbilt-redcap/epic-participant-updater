<?php
namespace Vanderbilt\EpicParticipantUpdater;

require join([__DIR__, 'app', 'Helpers', 'DependencyHelper.php'],DIRECTORY_SEPARATOR);

use ExternalModules\AbstractExternalModule;

class EpicParticipantUpdater extends AbstractExternalModule {
    
    function __construct()
    {
        parent::__construct();
    }

    function redcap_module_system_enable($version) {
        $autoload = join([__DIR__,'vendor','autoload.php'],DIRECTORY_SEPARATOR);
        if(!file_exists($autoload))
        {
            $dh = new \Vanderbilt\EHRAccessTokenManager\App\Helpers\DependencyHelper(__DIR__);
            $dh->installDependencies();
        }
    }

}