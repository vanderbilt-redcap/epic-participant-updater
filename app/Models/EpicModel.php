<?php namespace Vanderbilt\EpicParticipantUpdater\App\Models;

use Vanderbilt\EpicParticipantUpdater\EpicParticipantUpdater as EPU;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\File as FileHelper;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\EpicXMLParser;

class EpicModel extends BaseModel {

	function __construct()
	{
		$this->module = new EPU();
		parent::__construct();
	}

	public function check()
	{
        
        try {
			$params = json_decode(file_get_contents("php://input"),true); //get the params
			$params = array_merge($params, $_POST);
			$method = $_SERVER['REQUEST_METHOD'];
			if ('PUT' === $method) {
				$_PUT = array();
				FileHelper::parse_raw_http_request($_PUT);
			}


			$response = array();
			if(empty($params) && empty($_FILES) && empty($_PUT)) {
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
				// $file = array_shift($files); //PROCESS ONLY THE FIRST FILE
				foreach ($files as $file) {
					$string = FileHelper::getContents($file);
					$xml_data = EpicXMLParser::parse($string);
					$current_response = $this->module->checkXML($xml_data);
					$response = array_merge($response, $current_response);
				}

				return $response;
			}
			// check if getting xml file from a $_PUT
			else if( !empty($_PUT) ){
				$files = $_PUT['files'];
				// $file = array_shift($files); //PROCESS ONLY THE FIRST FILE
				foreach ($files as $file) {
					$string = $file;
					$xml_data = EpicXMLParser::parse($string);
					$current_response = $this->module->checkXML($xml_data);
					$response = array_merge($response, $current_response);
				}
			}
			// check if getting xml file from a path
			else if (isset($params['path']))
			{
				$path = $params['path'];
				$xml_data = EpicXMLParser::parseFromPath($path);
				$response = $this->module->checkXML($xml_data);
			}
            
			return $response;
		} catch (\Exception $e) {
            $response = array(
                "error" => true,
				"message" => $e->getMessage(),
			);
			header('HTTP/1.1 500 Internal Server Error');
			return $response;
		}
	}
}