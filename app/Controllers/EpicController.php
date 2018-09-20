<?php namespace Vanderbilt\EpicParticipantUpdater\App\Controllers;

use Vanderbilt\EpicParticipantUpdater\EpicParticipantUpdater as EPU;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\File as FileHelper;

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
			$params = array_merge($params, $_POST);


			if(empty($params) && empty($_FILES)) {
				// no params and no files; exit
				$response = array(
					"error" => true,
					"message" => "no params specified",
				);
			}
			else if( !empty($_FILES) ){
				/**
				 * data is coming from an upload form
				 * NOTE: ONLY ONE FILE IS GOING TO BE PROCESSED
				 */
				$files = FileHelper::getFormFiles();
				$file = array_shift($files); //PROCESS ONLY THE FIRST FILE
				$string = FileHelper::getContents($file);
				$xml_data = $this->module->getXMLDataFromString($string);
				$response = $this->module->checkXML($xml_data);
				/* $response = array(
					"error" => true,
					"message" => "no params specified",
				); // no params; exit */
				$this->printJSON($response);
			}
			// check if getting xml file from a path
			else if (isset($params['path']))
			{
				$path = $params['path'];
				$xml_data = $this->module->getXMLDataFromPath($path);
				$response = $this->module->checkXML($xml_data);
			}else if(isset($params['xml']))
			{
				$string = $params['xml'];
				$xml_data = $this->module->getXMLDataFromString($string);
				$response = $this->module->checkXML($xml_data);
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