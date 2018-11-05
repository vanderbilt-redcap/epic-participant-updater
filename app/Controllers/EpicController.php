<?php namespace Vanderbilt\EpicParticipantUpdater\App\Controllers;

use Vanderbilt\EpicParticipantUpdater\App\Models\EpicModel;

class EpicController extends BaseController
{
    private $module;
    private $defaults = [
        'logs_per_page' => 50,
    ];

    function __construct()
    {
		parent::__construct();
		
		$this->app = new EpicModel();
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
        $response = $this->app->getLogs($page, $limit);
        $this->printJSON($response);
    }
    
    /*
    * list the logs
    * @todo add pagination
    */
	public function getProjects()
	{
        $response = $this->app->getFetchingEnabledProjects();
        $this->printJSON($response);
	}

}