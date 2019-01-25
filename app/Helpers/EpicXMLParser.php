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
        // check if the receive xml is valid
        $xml = @simplexml_load_string($xml_string);
        if($xml===false){
            throw new \RuntimeException('The file format is not valid.');
        }
        try {
            
            $data = self::extract($xml_string);

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
     * to avoid having to specify the namespace prefix of nodes when
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
     * @param string $xml_string
     * @return void
     */
    private static function extract($xml_string)
    {
        try {
            $processState = new XMLNode($xml_string, 'processState');
            $candidateID = new XMLNode($xml_string, 'candidateID');
            $plannedStudy = new XMLNode($xml_string, 'plannedStudy');
            $studies = $plannedStudy->find('id');
            
            $MRN = $candidateID->attributes['extension']; // the MRN is in the "extension" attribute
            $processState = $processState->value; // status
            $study_ids = array(); // sometimes we can get multiple studies in a single xml
            foreach($studies as $study)
            {
                $study_ids[] = $study->attributes['extension']; // the ID is in the "extension" attribute
            }

            $data = array();
            $data['status'] = (string) $processState;
            $data['MRN'] = (string) $MRN;
            $data['irbNumbers'] = $study_ids;
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
