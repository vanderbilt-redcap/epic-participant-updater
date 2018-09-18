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
			$params = json_decode(file_get_contents("php://input"),true); //get the params
			if(empty($params)){
				$response = array(
					"error" => true,
					"message" => "no params specified",
				); // no params; exit
				$this->printJSON($response);
			}
	
			// check if getting xml file from a path
			if (isset($params['path']))
			{
				$path = $params['path'];
				$xml_data = $this->module->getXMLDataFromPath($path);
				$response = $this->module->checkXML($xml_data);
			}else if(isset($params['xml']))
			{
				$string = $params['xml'];
				$xml_data = $this->module->getXMLDataFromString($string);
			}
            
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