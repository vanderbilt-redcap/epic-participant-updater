<?php
namespace Vanderbilt\EpicParticipantUpdater;

require_once join(['vendor','autoload.php'],DIRECTORY_SEPARATOR);

use Vanderbilt\EpicParticipantUpdater\App\Helpers\File as FileHelper;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\EpicXMLParser;
// use Vanderbilt\EpicParticipantUpdater\App\Helpers\DependencyHelper;

use ExternalModules\AbstractExternalModule;

class EpicParticipantUpdater extends AbstractExternalModule {
    
    function __construct()
    {
        parent::__construct();
    }

}