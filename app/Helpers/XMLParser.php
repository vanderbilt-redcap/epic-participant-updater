<?php
namespace Vanderbilt\EpicParticipantUpdater\App\Helpers;

use Laravie\Parser\Xml\Reader;
use Laravie\Parser\Xml\Document;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7; //exception hadndling
use GuzzleHttp\Exception\RequestException; //exception hadndling

class XMLParser
{

    function __construct()
    {

    }

    /**
     * load data from a local or remote source
     */
    public function load($path)
    {

        if (filter_var($path, FILTER_VALIDATE_URL)) {
            // the path is a url: load the remote data
            $xml_string = $this->loadRemoteXML($path);
            if(!$xml_string) return false;
            
            return $this->readXML($xml_string);
        }else {

            return (new Reader(new Document()))->load($path);
        }
    }

    /**
     * reads an xml file in string format
     */
    function readXML($xml_string)
    {
        return (new Reader(new Document()))->extract($xml_string);
    }

    private function loadRemoteXML($url)
    {
        //create the HTTP client (guzzle)
        $client = new Client();
        
        try {
			$remote_response = $client->request('GET', $url, [
                'headers'        => ['Accept' => 'application/xml'],
                'verify' => false, // VERY DANGEROUS, USE ONLY IN DEVELOPMENT
            ]);
		} catch (RequestException $e) {
		    $request =  Psr7\str($e->getRequest());
		    if ($e->hasResponse()) {
		        $message = Psr7\str($e->getResponse());
		        $response = array(
					"error" => true,
					"message" => $request." - ".$message,
                );
                echo $response["message"];
                return false;
				// $this->printJSON($response);
		    }
		}

        // Check if a header exists.
		if ($remote_response->hasHeader('Content-Length')) {
			$stream = $remote_response->getBody();
			$data = $stream->getContents(); // returns all the contents

            //everything is ok; return data
            return $data;
		}else {
			$response = array(
				"error" => true,
				"message" => "no content",
			);
			/* header('HTTP/1.1 500 Internal Server Error');
            $this->printJSON($response); */
            echo $response["message"];
            return false;
		}
        
    }
}
