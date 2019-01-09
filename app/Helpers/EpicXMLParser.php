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
        $stripped_xml = self::strip_XML_namespaces($xml_string);
        $xml = @simplexml_load_string($stripped_xml);
        if($xml===false){
            throw new \RuntimeException('The file format is not valid.');
        }
        try {
            /* $data['status'] = (string) $xml->children('s', true)->Body->children('rpe', true)->EnrollPatientRequestRequest->processState;
            $data['MRN'] = (string) $xml->children('s', true)->Body->children('rpe', true)->EnrollPatientRequestRequest->patient->candidateID->attributes()['extension'][0];
            $data['irbNumber'] = (string) $xml->children('s', true)->Body->children('rpe', true)->EnrollPatientRequestRequest->children()->study->instantiation->plannedStudy->id->attributes()['extension']; */
            
            $data = self::extract($xml);

            foreach ($data as $key => $value) {
                if(empty($value)) throw new \RuntimeException("'{$key}' cannot be empty.");
            }
            return $data;
        }catch (\RuntimeException $e) {
			$error = $e->getMessage();
			return array();
		}
    }

    /**
     * strip the namespaces from an xml document
     * to avoid having to specify the namespace prefix of nooes when
     * an xml document is parsed for data: $xml->children('soap', true)
     *
     * @param [type] $xml_string
     * @return void
     */
    public static function strip_XML_namespaces($xml_string)
    {
        $regex = "/(<\/?)\w+:(.+?>)/is";
        $stripped_xml = preg_replace($regex,"$1$2",$xml_string);
        return $stripped_xml;
    }

    /**
     * extract data from an epic xml
     *
     * @param SimpleXMLElement $xml
     * @return void
     */
    private static function extract($xml)
    {
        try {
            $patientRequest = $xml->Body->CallService->requestBody->EnrollPatientRequestRequest;
            $study = $patientRequest->study;
            $study_id = $study->instantiation->plannedStudy->id->attributes()['extension'][0];

            $processState = $patientRequest->processState; // status

            $patient = $patientRequest->patient;

            $candidateID = $patient->candidateID->attributes()['extension'][0];

            $data = array();
            $data['status'] = (string) $processState;
            $data['MRN'] = (string) $candidateID;
            $data['irbNumber'] = (string) $study_id;
        }catch (\RuntimeException $e) {
			$error = $e->getMessage();
			return array();
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
