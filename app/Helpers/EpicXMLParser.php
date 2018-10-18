<?php
namespace Vanderbilt\EpicParticipantUpdater\App\Helpers;

use Vanderbilt\EpicParticipantUpdater\App\Helpers\File as FileHelper;

class EpicXMLParser
{

    /**
     * parse the XML file
     * @throws RuntimeException if file format is not valid
     * @throws RuntimeException if one of the mandatory values are empty
     * @return array of fields extracted from the XML
     */
    static function parse($xml_string)
    {
        $xml = @simplexml_load_string($xml_string);
        if($xml===false){
            throw new \RuntimeException('The file format is not valid.');
        }
        $data = [];
        try {
            $data['status'] = (string) $xml->children('s', true)->Body->children('rpe', true)->EnrollPatientRequestRequest->processState;
            $data['MRN'] = (string) $xml->children('s', true)->Body->children('rpe', true)->EnrollPatientRequestRequest->patient->candidateID->attributes()['extension'][0];
            $data['irbNumber'] = (string) $xml->children('s', true)->Body->children('rpe', true)->EnrollPatientRequestRequest->children()->study->instantiation->plannedStudy->id->attributes()['extension'];
            foreach ($data as $key => $value) {
                if(empty($value)) throw new \RuntimeException("'{$key}' cannot be empty.");
            }
        }catch (\RuntimeException $e) {
			$error = $e->getMessage();
			return [];
		}
        return $data;
    }

    static function parseFromPath($path)
    {
        if(empty($path)) return array("message" => "no path specified");

        if (filter_var($path, FILTER_VALIDATE_URL)) {
            // the path is a url: load the remote data
            $xml_string = FileHelper::loadRemoteFile($path);
        }else {
            $xml_string = file_get_contents($path);
        }
        if(!$xml_string) return false;

        $xml_data = self::parse($xml_string);
        return $xml_data;
    }

}
