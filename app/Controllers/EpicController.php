<?php namespace Vanderbilt\EpicParticipantUpdater\App\Controllers;

use Vanderbilt\EpicParticipantUpdater\EpicParticipantUpdater as EPU;

class EpicController extends BaseController
{
	private $module;

    function __construct()
    {
		$this->module = new EPU();
    }
    
    /*
    * check the XML
    */
	public function check()
	{
        
        try {
			$response = $this->module->checkXML();
            
			$this->printJSON($response);
		} catch (\Exception $e) {
            $response = array(
                "error" => true,
				"message" => $e->getMessage(),
			);
			header('HTTP/1.1 500 Internal Server Error');
			$this->printJSON($response);
		}
	}

}