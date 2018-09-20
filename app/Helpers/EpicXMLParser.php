<?php
namespace Vanderbilt\EpicParticipantUpdater\App\Helpers;

class EpicXMLParser
{
    /**
     * @throws RuntimeException if value is empty
     */
    private static function getStatus($xml, $version=1)
    {
        $value = (string) $xml->children('s', true)->Body->children('rpe', true)->EnrollPatientRequestRequest->processState;
        if(empty($value)) throw new \RuntimeException('The Status cannot be empty.');
        return $value;
    }

    private static function getMRN($xml, $version=1)
    {
        $value = (string) $xml->children('s', true)->Body->children('rpe', true)->EnrollPatientRequestRequest->patient->candidateID->attributes()['extension'][0];
        if(empty($value)) throw new \RuntimeException('The MRN cannot be empty.');
        return $value;
    }

    private static function getIrbNumber($xml, $version=1)
    {
        $value = (string) $xml->children('s', true)->Body->children('rpe', true)->EnrollPatientRequestRequest->children()->study->instantiation->plannedStudy->id->attributes()['extension'];
        if(empty($value)) throw new \RuntimeException('The IRB Number cannot be empty.');
        return $value;
    }

    /**
     * parse the XML file
     * @return array of fields extracted from the XML
     */
    static function parse($xml_string)
    {
        $xml = @simplexml_load_string($xml_string);
        try {
            $data = array(
                'status' => self::getStatus($xml),
                'MRN' => self::getMRN($xml),
                'irbNumber' => self::getIrbNumber($xml),
            );
        }catch (\RuntimeException $e) {
			$error = $e->getMessage();
			return [];
		}
        return $data;
    }



}
