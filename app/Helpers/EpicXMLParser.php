<?php
namespace Vanderbilt\EpicParticipantUpdater\App\Helpers;

use DateTime;
use Vanderbilt\EpicParticipantUpdater\EpicParticipantUpdater;

class EpicXMLParser
{

    const DATE_FORMAT = 'Y-m-d'; // format of dates
    const MANDATORY_KEYS = array('status','MRN','study_ids');

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

            foreach (self::MANDATORY_KEYS as $key) {
                if(!array_key_exists($key, $data)) throw new \RuntimeException("Mandatory key '{$key}' is missing.");
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
     * @param string $xml_string
     * @return void
     */
    public static function strip_XML_namespaces($xml_string)
    {
        $regex = "/(<\/?)\w+:(.+?>)/is";
        $stripped_xml = preg_replace($regex,"$1$2",$xml_string);
        return $stripped_xml;
    }

    /**
     * Changes date from XML to necessary date format for REDCap storage
     * @param string $string
     * @return string
     */
    private static function processDate($string) {
        if(empty($string)) return '';
        $date = new DateTime($string);
        return $date->format(self::DATE_FORMAT);
    }
    /**
     * Undocumented function
     *
     * @param string $xml_string
     * @return object contains properties 'start' and 'end'
     */
    private static function extractDates($xml_string)
    {
        $dates = new XMLNode($xml_string, 'effectiveTime');
        $start_date_value = $dates->find('low')->attributes['value'];
        $end_date_value = $dates->find('high')->attributes['value'];
        $dates = array();
        $dates['start'] = self::processDate($start_date_value);
        $dates['end'] = self::processDate($end_date_value);
        return (object)$dates;
    }

    /**
     * extract data from an epic xml
     *
     * @param string $xml_string
     * @return array
     */
    private static function extract($xml_string)
    {
        try {
            $processState = new XMLNode($xml_string, 'processState');
            $candidateID = new XMLNode($xml_string, 'candidateID');
            $plannedStudy = new XMLNode($xml_string, 'plannedStudy');
            $dateofBirth = new XMLNode($xml_string, 'dob');
            $names = new XMLNode($xml_string,'name');
			$body = new XMLNode($xml_string, 'body');
			$method = $body->children[0]->tag;
			if ($method == "EnrollPatientRequestRequest") {
				$method = "EnrollPatientRequestResponse";
			}
			else {
				$method .= "Response";
			}
            $dates = self::extractDates($xml_string);
            $MRN = $candidateID->attributes['extension']; // the MRN is in the "extension" attribute
            $processState = $processState->value; // status
            $dateofBirth = $dateofBirth->attributes['value']; // date of birth

            // get study ids
            $studies = $plannedStudy->find('id');
            if(!is_array($studies)) $studies = [$studies]; // make sure it is an array
            $study_ids = array(); // sometimes we can get multiple studies in a single xml
            foreach($studies as $study)
            {
                $study_ids[] = $study->attributes['extension']; // the ID is in the "extension" attribute
            }

            // Get patient name. The 'given' tag can also be used for their middle name, so need to only grab the first name from the given array
            $givenNames = $names->find('given');
            if (!is_array($givenNames)) $givenNames = [$givenNames];
            $firstName = $givenNames[0]->value;
            $lastName = $names->find('family')->value;

            $data = array();
            $data['status'] = (string) $processState;
			$data['method'] = (string) $method;
	        $data['MRN'] = (string) $MRN;
            $data[EpicParticipantUpdater::SETTINGS_FIELD_MRN] = (string) $MRN;
			$data[EpicParticipantUpdater::SETTINGS_FIELD_STUDY_ID] = (string) $MRN;
            $data['study_ids'] = $study_ids;
            $data['date-start'] = $dates->start;
            $data['date-end'] = $dates->end;
            $data['dob'] = self::processDate($dateofBirth);
            $data['first-name'] = $firstName;
            $data['last-name'] = $lastName;
        }catch (\RuntimeException $e) {
			$error = $e->getMessage();
			return array();
		}
        return $data;
    }

}
