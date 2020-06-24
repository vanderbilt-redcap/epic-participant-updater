<?php namespace Vanderbilt\EpicParticipantUpdater\App\Controllers;

use Vanderbilt\EpicParticipantUpdater\EpicParticipantUpdater as EPU;
use Vanderbilt\EpicParticipantUpdater\App\Models\EpicModel;
use Vanderbilt\EpicParticipantUpdater\App\Models\Logger;

class EpicController extends BaseController
{
    private $module;
    private $defaults = [
        'logs_per_page' => 50,
    ];

    function __construct()
    {
        global $module;
        parent::__construct();
		
        $this->module = $module;
		$this->app = new EpicModel($module);
	}
    
    /*
    * check the XML
    */
	public function check()
	{
        $response = $this->app->check();
        $this->printJSON($response);
    }
    
    /*
    * list the logs
    * @todo add pagination
    */
	public function getLogs()
	{
        $page = isset($_GET['p']) ? $_GET['p'] : 1;
        $limit = isset($_GET['limit']) ? $_GET['p'] : $this->defaults['logs_per_page'];
        $logger = new Logger($this->module);
        $response = $logger->getList($page, $limit);
        $this->printJSON($response);
    }
    
    /*
    * list the logs
    * @todo add pagination
    */
	public function getProjects()
	{
        $response = $this->app->getModuleEnabledProjects();
        $this->printJSON($response);
    }

    public function regenerateAPIToken()
    {
        $response = $this->module->generateAPIToken();
        $this->printJSON($response);
    }

}