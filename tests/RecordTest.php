<?php
use PHPUnit\Framework\TestCase;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\Record;
use Vanderbilt\EpicParticipantUpdater\EpicParticipantUpdater;

class RecordTest extends TestCase {

    public function getInstanceData($project_id, $record, $instance) {
        $eventID = EpicParticipantUpdater::getInstance()->getProjectSetting(EpicParticipantUpdater::SETTINGS_FIELD_EVENT_ID,$project_id);
        $fields = [
            $field_lastname = EpicParticipantUpdater::getInstance()->getProjectSetting(EpicParticipantUpdater::SETTINGS_FIELD_LASTNAME,$project_id),
            $field_firstname = EpicParticipantUpdater::getInstance()->getProjectSetting(EpicParticipantUpdater::SETTINGS_FIELD_FIRSTNAME,$project_id),
            $field_dob = EpicParticipantUpdater::getInstance()->getProjectSetting(EpicParticipantUpdater::SETTINGS_FIELD_DOB,$project_id),
            $field_mrn = EpicParticipantUpdater::getInstance()->getProjectSetting(EpicParticipantUpdater::SETTINGS_FIELD_MRN,$project_id),
            $field_study_id = EpicParticipantUpdater::getInstance()->getProjectSetting(EpicParticipantUpdater::SETTINGS_FIELD_STUDY_ID,$project_id),
        ];
        $data = [];
        foreach ($fields as $fieldName) {
            $data[$fieldName] = Record::findFieldValue($project_id, $record, $eventID, $fieldName, $instance);
        }
        return $data;
    }



    public function testRecordData() {
        $project_id = 83;
        $instances = Record::getInstances($project_id, $record=1);
        $formData = Record::getFormData($project_id);
        $project = new Project($project_id);
        $events = $project->events;
        $data = Record::getData($project_id, $record, $events[0]);

        var_dump($instances);
        var_dump($data);
        $this->assertTrue(true);
    }
}