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
        parent::__construct();
		
        $this->module = new EPU();
		$this->app = new EpicModel($this->module);
	}
    
    /*
    * check the XML
    */
	public function check()
	{
        $this->checkAPIToken();
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
        $this->checkAPIToken();
        $response = $this->module->generateAPIToken();
        $this->printJSON($response);
    }

    /**
     * check if the provided API token is valid
     *
     * @return void
     */
    private function checkAPIToken()
    {
        $api_token = $this->module->getApiToken();
        // disable control if the API token is not set
        if(empty($api_token)) return;
        $request_api_token = $this->getRequestToken();
        if(empty($request_api_token) || ($api_token != $request_api_token) )
        {
            return $this->unauthorized();
        }
    }
    
    /**
     * get the API token from the request
     *
     * @return string
     */
    private function getRequestToken()
    {
        return $_REQUEST['api_token'];
    }

}