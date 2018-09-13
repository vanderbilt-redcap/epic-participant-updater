<?php namespace Vanderbilt\EpicParticipantUpdater\App\Controllers;

class BaseController
{	

	// error 404
	function notFound()
	{
		header("HTTP/1.0 404 Not Found");
		$response = array(
			"error" => true,
			"message" => "page not found",
		);
		$this->printJSON($response);
	}

	// error 405
	function notAllowed()
	{
		header("HTTP/1.0 405 Method Not Allowed"); 
		$response = array(
			"error" => true,
			"message" => "method not allowed",
		);
		$this->printJSON($response);
	}

	// echo a JSON response and exit
	protected function printJSON($response)
	{
		header('Content-Type: application/json');
		echo json_encode( $response );
		exit;
	}

}