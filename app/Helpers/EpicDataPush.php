<?php
namespace Vanderbilt\EpicParticipantUpdater\App\Helpers;

use Vanderbilt\EpicParticipantUpdater\EpicParticipantUpdater;

class EpicDataPush
{
    static function generateXML($status, $project_id,$record, $event_id, $repeat_instance=1, $useAlternateID=0, $alternateIDField='', &$values = null) {
        $epicModule = EpicParticipantUpdater::getInstance();
        $settingsEvent = $epicModule->getProjectEvent($project_id);

        $recordData = \REDCap::getData(['project_id'=>$project_id,'records'=>[$record],'events'=>[$settingsEvent]]);
        $validData = $recordData[$record][$settingsEvent] ?? [];

        $fieldSettings = $epicModule->getSettingsForXML($project_id);

        // collect values
        $valueMrn = $validData[$fieldSettings[EpicParticipantUpdater::SETTINGS_FIELD_MRN]] ?? '';
        $valueFirstname = $validData[$fieldSettings[EpicParticipantUpdater::SETTINGS_FIELD_FIRSTNAME]] ?? '';
        $valueLastname = $validData[$fieldSettings[EpicParticipantUpdater::SETTINGS_FIELD_LASTNAME]] ?? '';
        $valueDOB = $validData[$fieldSettings[EpicParticipantUpdater::SETTINGS_FIELD_DOB]] ?? '';
        $valueStudyID = $validData[$fieldSettings[EpicParticipantUpdater::SETTINGS_FIELD_STUDY_ID]] ?? '';

        // assign the values by reference so they can be retrieved
        $values = [
            EpicParticipantUpdater::SETTINGS_FIELD_MRN => $valueMrn,
            EpicParticipantUpdater::SETTINGS_FIELD_FIRSTNAME => $valueFirstname,
            EpicParticipantUpdater::SETTINGS_FIELD_LASTNAME => $valueLastname,
            EpicParticipantUpdater::SETTINGS_FIELD_DOB => $valueDOB,
            EpicParticipantUpdater::SETTINGS_FIELD_STUDY_ID => $valueStudyID,
        ];

        $xml = new \SimpleXMLElement('<ep1:Envelope/>',LIBXML_NOERROR,false,'ep1',true);
        $xml->addAttribute('xmlns:xmlns:ep1','http://www.w3.org/2003/05/soap-envelope');
        $header = $xml->addChild('xmlns:ep1:Header');
        $headerAction = $header->addChild('ep2:Action','urn:ihe:qrph:rpe:2009:AlertProtocolState:REDCap','http://www.w3.org/2005/08/addressing');
        $headerAction->addAttribute('xmlns:ep1:mustUnderstand','true');

        $body = $xml->addChild('xmlns:ep1:Body');
        $alertProState = $body->addChild('ep3:AlertProtocolState','','urn:ihe:grph:rpe:2009');
        $alertProState->addChild('processState',$status);
        $patient = $alertProState->addChild('patient');
        $candidate = $patient->addChild('candidateID');
        $candidate->addAttribute('root','1.2.840.114350.1.13.478.2.7.5.737384.14');
        $candidate->addAttribute('extension',str_pad($valueMrn,9,'0',STR_PAD_LEFT));
        $subjectID = $patient->addChild('subjectID');
        $subjectID->addAttribute('root','PATIENT-ENROLLMENT-IDENTIFIER');
        if($useAlternateID == 1 && !empty($alternateIDField)) {
            $subjectID->addAttribute('extension',$validData[$alternateIDField]);
        } else {
            $subjectID->addAttribute('extension',$record);
        }
        $name = $patient->addChild('name');
        $name->addChild('given',$valueFirstname,'urn:h7-org:v3');
        $name->addChild('family',$valueLastname,'urn:hl7-org:v3');
        $alertProState->addChild('dob')->addAttribute('value',($valueDOB != "" ? date('Ymd',strtotime($valueDOB)) : ""));
        $study = $alertProState->addChild('study','','urn:hl7-org:v3');
        $instantiation = $study->addChild('instantiation');
        $plannedStudy = $instantiation->addChild('plannedStudy');
        $plannedId = $plannedStudy->addChild('id');
        $plannedId->addAttribute('root','1.2.3.4');
        $plannedId->addAttribute('extension',str_pad($valueStudyID,6,'0',STR_PAD_LEFT));
        $component = $study->addChild('component1');
        $studyActivities = $component->addChild('studyActivitiesAtSite');
        $subject1 = $studyActivities->addChild('subject1');
        $experimental = $subject1->addChild('experimentalUnit');
        $effective = $experimental->addChild('effectiveTime');
        $effective->addChild('low')->addAttribute('value','');
        $effective->addChild('high')->addAttribute('value','');

        return $xml->asXML();
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