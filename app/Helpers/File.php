<?php
namespace Vanderbilt\EpicParticipantUpdater\App\Helpers;

class File {

	private $max_file_size = 1000000;
	private $allowed_file_types = array(
		'jpg' => 'image/jpeg',
		'png' => 'image/png',
		'gif' => 'image/gif',
		'xml' => 'application/xml',
	);

	/**
	 * check for upload errors
	 * @throws RuntimeException
	 */
	private function checkErrors($name = 'file')
	{
		// Undefined | Multiple Files | $_FILES Corruption Attack
			// If this request falls under any of them, treat it invalid.
			if ( !isset($_FILES[$name]['error']) ||is_array($_FILES[$name]['error']) ) {
				throw new \RuntimeException('Invalid parameters.');
			}
				
			// Check $_FILES[$name]['error'] value.
			switch ($_FILES[$name]['error']) {
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
			if ($_FILES[$name]['size'] > $this->max_file_size) {
				throw new \RuntimeException('Exceeded filesize limit.');
			}
	
			/* // DO NOT TRUST $_FILES[$name]['mime'] VALUE !!
			// Check MIME Type by yourself.
			$finfo = new \finfo(FILEINFO_MIME_TYPE);
			if (false === $ext = array_search(
				$finfo->file($_FILES[$name]['tmp_name']),
				$this->allowed_file_types,
				true
				)) {
				throw new \RuntimeException('Invalid file format.');
			} */
	}

	private function checkFileFormat($filename)
	{
		// DO NOT TRUST $_FILES[$name]['mime'] VALUE !!
		// Check MIME Type by yourself.
		$finfo = new \finfo(FILEINFO_MIME_TYPE);
		if (false === $ext = array_search(
			$finfo->file($filename),
			$this->allowed_file_types,
			true
			)) {
			throw new \RuntimeException('Invalid file format.');
		}
		return $ext;
	}
	
	function read($name = 'file')
	{
		try {
			
			$this->checkErrors($name);
			$this->checkFileFormat($_FILES[$name]['tmp_name']);
			$content = file_get_contents($_FILES[$name]['tmp_name']);
			return $content;
				
		} catch (\RuntimeException $e) {
			
			echo $e->getMessage();
			
		}
	}

	/**
	 * checks if the destination folder exists or tryes to create it
	 */
	private function checkDestination($destination)
	{
		if (!file_exists($destination)) {
			$created = mkdir($destination, 0777, true);
			if(!$created)
				throw new \RuntimeException('Failed to create destination folder.');
		}
	}
	
	function upload($name = 'file', $destination = '/tmp/epic')
	{
		try {
			
			$this->checkErrors($name);
			$ext = $this->checkFileFormat($_FILES[$name]['tmp_name']);
			$this->checkDestination($destination);
		
			// You should name it uniquely.
			// DO NOT USE $_FILES[$name]['name'] WITHOUT ANY VALIDATION !!
			// On this example, obtain safe unique name from its binary data.
			$file_path = sprintf('%s/%s.%s',
				$destination,
				sha1_file($_FILES[$name]['tmp_name']),
				$ext
			);

			if (!move_uploaded_file( $_FILES[$name]['tmp_name'], $file_path) )
			{
				throw new \RuntimeException('Failed to move uploaded file.');
			}
				
			echo 'File is uploaded successfully.';
			return $file_path;
				
		} catch (\RuntimeException $e) {
			
			echo $e->getMessage();
			
		}
	}
	
}