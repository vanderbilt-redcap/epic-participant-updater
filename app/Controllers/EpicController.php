<?php namespace Vanderbilt\EpicParticipantUpdater\App\Controllers;

use Vanderbilt\EpicParticipantUpdater\App\Models\EpicModel;

class EpicController extends BaseController
{
	private $module;

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
        $page=0; //$_GET['p']
        $limit=10; //$_GET['limit']
        $response = $this->app->getLogs($page, $limit);
        $this->printJSON($response);
	}

}