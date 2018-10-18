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

}