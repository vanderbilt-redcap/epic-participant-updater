<?php
namespace Vanderbilt\EpicParticipantUpdater\App\Helpers;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7; //exception hadndling
use GuzzleHttp\Exception\RequestException; //exception hadndling

class File {

	private static $max_file_size = 1000000;
	private static $allowed_file_types = array(
		'jpg' => 'image/jpeg',
		'png' => 'image/png',
		'gif' => 'image/gif',
		'xml' => 'application/xml',
	);

	/**
	 * check for upload errors
	 * @throws RuntimeException
	 */
	private static function checkErrors($file)
	{
		// Undefined | Multiple Files | $_FILES Corruption Attack
			// If this request falls under any of them, treat it invalid.
			if ( !isset($file['error']) || is_array($file['error']) ) {
				throw new \RuntimeException('Invalid parameters.');
			}
				
			// Check $file['error'] value.
			switch ($file['error']) {
				case UPLOAD_ERR_OK:
				break;
				case UPLOAD_ERR_NO_FILE:
					throw new \RuntimeException('No file sent.');
				case UPLOAD_ERR_INI_SIZE:
				case UPLOAD_ERR_FORM_SIZE:
					throw new \RuntimeException('Exceeded filesize limit.');
				default:
					throw new \RuntimeException('Unknown errors.');
			}
	
			// You should also check filesize here. 
			if ($file['size'] > self::$max_file_size) {
				throw new \RuntimeException('Exceeded filesize limit.');
			}
	}

	private static function checkFileFormat($filename)
	{
		// DO NOT TRUST $file['mime'] VALUE !!
		// Check MIME Type by yourself.
		$finfo = new \finfo(FILEINFO_MIME_TYPE);
		if (false === $ext = array_search(
			$finfo->file($filename),
			self::$allowed_file_types,
			true
			)) {
			throw new \RuntimeException('Invalid file format.');
		}
		return $ext;
	}

	/**
	 * helper function for upload
	 * checks if the destination folder exists or tryes to create it
	 */
	private static function checkDestination($destination)
	{
		if (!file_exists($destination)) {
			$created = mkdir($destination, 0777, true);
			if(!$created)
				throw new \RuntimeException('Failed to create destination folder.');
		}
	}

	/**
	 * helper function for upload
	 */
	private static function getFileExtension($filename)
	{
		$path_parts = pathinfo($filename);
		return $path_parts['extension'];
	}
	
	static function upload($file,$destination = '/tmp/epic')
	{
		try {
			$file_tmp_name = $file['tmp_name'];
			self::checkErrors($name);
			self::checkFileFormat($file);
			self::checkDestination($destination);
			
			$ext = self::getFileExtension($file['name']);
			
			// You should name it uniquely.
			// DO NOT USE $_FILES[$name]['name'] WITHOUT ANY VALIDATION !!
			// On this example, obtain safe unique name from its binary data.
			$file_path = sprintf('%s/%s_%s.%s',
			$destination,
			sha1_file($file_tmp_name),
			time(),
			$ext
			);

			if (!move_uploaded_file( $file_tmp_name, $file_path) )
			{
				throw new \RuntimeException('Failed to move uploaded file.');
			}
				
			echo 'File is uploaded successfully.';
			return $file_path;
				
		} catch (\RuntimeException $e) {
			
			echo $e->getMessage();
			
		}
	}

	static function parse_raw_http_request(array &$a_data)
	{
		// read incoming data
		$input = file_get_contents('php://input');

		// grab multipart boundary from content type header
		preg_match('/boundary=(.*)$/', $_SERVER['CONTENT_TYPE'], $matches);
		$boundary = $matches[1];

		// split content by boundary and get rid of last -- element
		$a_blocks = preg_split("/-+$boundary/", $input);
		array_pop($a_blocks);

		$files = array();
		// loop data blocks
		foreach ($a_blocks as $id => $block)
		{
			if (empty($block))
			continue;

			// you'll have to var_dump $block to understand this and maybe replace \n or \r with a visibile char

			// parse uploaded files
			if (strpos($block, 'application/octet-stream') !== FALSE)
			{
				// match "name", then everything after "stream" (optional) except for prepending newlines 
				preg_match("/name=\"([^\"]*)\".*stream[\n|\r]+([^\n\r].*)?$/s", $block, $matches);
				// ad all files in the $files array
				$a_data[$matches[1]] = $matches[2];
			}
			// parse files, again
			else if (strpos($block, 'filename=') !== FALSE)
			{
				// match "filename" and optional value in between newline sequences
				preg_match('/name=\"([^\"]*)\"[\n|\r]+Content-Type:\W(\S+)[\n|\r]+([^\n\r].*)?$/s', $block, $matches);
				// match[1] = filename, match[2] = Content-Type, match[3] = file content, 
				$files[$matches[1]] = $matches[3];
			}
			else
			{
				// match "name" and optional value in between newline sequences
				preg_match('/name=\"([^\"]*)\"[\n|\r]+([^\n\r].*)?\r$/s', $block, $matches);
				$a_data[$matches[1]] = $matches[2];
			}
		}
		if(!empty($files)) $a_data['files'] = $files;
	}

	/**
	 * get the contents of a file uploaded using a form
	 * the file is not saved locally
	 */
	static function getContents($file)
	{
		try {
			self::checkErrors($file);
			self::checkFileFormat($file['tmp_name']);
			$contents = file_get_contents($file['tmp_name']);
			return $contents;
		} catch (\RuntimeException $e) {
			
			echo $e->getMessage();
			
		}
	}

	static function loadRemoteFile($url)
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
            echo $response["message"];
            return false;
		}
        
	}
	
	/**
	 * @return array of files uploaded via a form
	 */
	function getFormFiles()
	{
		$names = array_keys($_FILES); // names of the input file of the form
		$files = array(); // container for the files
		foreach($names as $name)
		{
		  $current_file = $_FILES[$name]; // set the current file
		  $keys = array_keys($current_file); // get all available keys for the current file ()

		  // get the first key; used to determine the number of files in case of input file with "multiple" attribute 
		  $first_key = array_shift(array_values($keys)); 
	  
		  if(!is_array($current_file[$first_key]))
		  {
			// single file per file input["name"] attribute has been sent
			$files[$name] = $current_file;
		  } else
		  {
			// multiple file per file input["name"] attribute have been sent
			$total_files = count($current_file[$first_key]);
			for($i=0; $i<$total_files; $i++)
			{
			  foreach($keys as $key)
			  {
				//fill the file element
				$files["{$name}_{$i}"][$key] = $current_file[$key][$i];
			  }
			}
		  }
		}
		return $files;
	}
	
}