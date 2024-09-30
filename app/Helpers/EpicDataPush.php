<?php
namespace Vanderbilt\EpicParticipantUpdater\App\Helpers;

use Vanderbilt\EpicParticipantUpdater\EpicParticipantUpdater;

class EpicDataPush
{
    static function generateXML($status, $method, $record, $data, $type='status_push') {
        // collect values
        $valueMrn = $data[EpicParticipantUpdater::SETTINGS_FIELD_MRN] ?? '';
        $valueMrn = str_pad($valueMrn,9,'0',STR_PAD_LEFT);
        $valueFirstname = $data[EpicParticipantUpdater::SETTINGS_FIELD_FIRSTNAME] ?? '';
        $valueLastname = $data[EpicParticipantUpdater::SETTINGS_FIELD_LASTNAME] ?? '';
        $valueDOB = $data[EpicParticipantUpdater::SETTINGS_FIELD_DOB] ?? '';
        $valueDOB = ($valueDOB !== "") ? date('Ymd',strtotime($valueDOB)) : "";
        $valueStudyID = $data[EpicParticipantUpdater::SETTINGS_FIELD_STUDY_ID] ?? '';
        $valueStudyID = str_pad($valueStudyID,6,'0',STR_PAD_LEFT);

		$returnValue = "";

		if ($method == "AlertProtocolStateResponse") {
			$xml = new \SimpleXMLElement("<$method/>", LIBXML_NOERROR);
			$xml->addAttribute('xmlns:xmlns', 'urn:ihe:qrph:rpe:2009');
			$code = $xml->addChild('responseCode','ALERT_RECEIVED');
			$returnValue = $xml->asXML();
		}
		else {
			$xml = new \SimpleXMLElement('<ep1:Envelope/>', LIBXML_NOERROR, false, 'ep1', true);
			$xml->addAttribute('xmlns:xmlns:ep1', 'http://www.w3.org/2003/05/soap-envelope');
			if ($status != 'status_push') {
				$xml->addAttribute('xmlns:xmlns', 'urn:h7-org:v3');
			}
			$header = $xml->addChild('xmlns:ep1:Header');
			$headerAction = $header->addChild('ep2:Action', $method, 'http://www.w3.org/2005/08/addressing');
			$headerAction->addAttribute('xmlns:ep1:mustUnderstand', 'true');

			$body = $xml->addChild('xmlns:ep1:Body');
			$alertProState = $body->addChild('ep3:' . $method, '', 'urn:ihe:grph:rpe:2009');
			$alertProState->addChild('processState', $status);
			$patient = $alertProState->addChild('patient');
			$candidate = $patient->addChild('candidateID');
			$candidate->addAttribute('extension', $valueMrn);
			$name = $patient->addChild('name');
			$name->addChild('given', $valueFirstname, ($type == "status_push" ? 'urn:h7-org:v3' : null));
			$name->addChild('family', $valueLastname, ($type == "status_push" ? 'urn:h7-org:v3' : null));
			$alertProState->addChild('dob')->addAttribute('value', $valueDOB);
			$study = $alertProState->addChild('study', '', ($type == "status_push" ? 'urn:h7-org:v3' : null));
			$instantiation = $study->addChild('instantiation');
			$plannedStudy = $instantiation->addChild('plannedStudy');
			$plannedId = $plannedStudy->addChild('id');
			$plannedId->addAttribute('extension', $valueStudyID);
			if ($type == "status_push") {
				$candidate->addAttribute('root', '1.2.840.114350.1.13.478.2.7.5.737384.14');
				$plannedId->addAttribute('root', '1.2.3.4');
				$subjectID = $patient->addChild('subjectID');
				$subjectID->addAttribute('root', 'PATIENT-ENROLLMENT-IDENTIFIER');
				$subjectID->addAttribute('extension', $record); // this could be the alternate ID
				$component = $study->addChild('component1');
				$studyActivities = $component->addChild('studyActivitiesAtSite');
				$subject1 = $studyActivities->addChild('subject1');
				$experimental = $subject1->addChild('experimentalUnit');
				$effective = $experimental->addChild('effectiveTime');
				$effective->addChild('low')->addAttribute('value', '');
				$effective->addChild('high')->addAttribute('value', '');
			}
			$returnValue = $xml->asXML();
		}

        return $returnValue;
    }

    static function uploadParticipantXML($url,$xml_string) {
        $headers = array(
            "Content-type: application/soap+xml; charset=utf-8",
            "Accept: text/xml",
            "Cache-Control: no-cache",
            "Pragma: no-cache",
            "SOAPAction: $url",
            "Content-length: ".strlen($xml_string),
        );

        $ch = curl_init();
        curl_setopt($ch,CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $xml_string);
        curl_setopt($ch,CURLOPT_POST,1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 300);
        curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,1);
        curl_setopt($ch,CURLOPT_HTTPHEADER,$headers);
        $data = curl_exec($ch);
        curl_close($ch);

        return $data;
    }
}