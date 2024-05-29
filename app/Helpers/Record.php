<?php
namespace Vanderbilt\EpicParticipantUpdater\App\Helpers;

use Records;
use Vanderbilt\EpicParticipantUpdater\EpicParticipantUpdater;

class Record
{
    
    /**
     * Retrieves form data for a specific project including metadata and event details.
     *
     * @param integer $project_id The ID of the REDCap project.
     * @return array|false An associative array of form data indexed by field name or false on failure.
     */
    public static function getFormData($project_id)
    {
        $query_string = sprintf(
            "SELECT m.project_id,m.field_name,m.form_name
            , a.arm_id
            , em.event_id
            ,r.form_name AS is_repeated
            FROM redcap_metadata AS m
            LEFT JOIN redcap_events_arms AS a
            ON m.project_id=a.project_id
            LEFT JOIN redcap_events_metadata AS em
            ON em.arm_id=a.arm_id
            LEFT JOIN redcap_events_repeat AS r
            ON r.event_id=em.event_id AND r.form_name=m.form_name
            WHERE m.project_id='%u'
            ORDER BY m.field_order",
            $project_id
        );
        $result = db_query($query_string);
        $rows = array();
        while($row = db_fetch_object($result)) {
            $rows[$row->field_name] = $row;
        }
        return $rows;
    }

    /**
     * Retrieves all data for a specific record across all instances in a project.
     *
     * @param integer $project_id The ID of the REDCap project.
     * @param string|int $record The record ID within the project.
     * @param int $eventID The event ID
     * @return array An array of data for each instance of the record.
     */
    public static function getData($project_id, $record, $eventID) {
        $instances = Record::getInstances($project_id, $record=1);
        $data = [];
        foreach ($instances as $instance) {
            $data[$instance] = static::getInstanceData($project_id, $record, $instance, $eventID);
        }
        return $data;
    }

    /**
     * Retrieves specific data for a given record within a project, optionally returning an alternative data structure.
     *
     * This function fetches participant-specific data based on provided settings and mappings. It is designed to work
     * with specific project configurations and can adjust its data retrieval based on whether fields are marked as repeated.
     * An optional reference parameter allows the caller to receive a mapped array of field identifiers to their values,
     * providing an alternative view of the same data.
     *
     * @param int $projectId The unique identifier of the project from which to fetch data.
     * @param string $recordId The unique identifier of the record for which data is being retrieved.
     * @param int|null $formInstance The instance number of the form/event, relevant for repeated forms/events. Use NULL for non-repeated.
     * @location int|null $eventId Optional. The specific event ID to use for data retrieval. If null, defaults to a project-specific setting.
     * @param array|null &$alternateData Optional. A reference to an array that will be populated with the field settings keys and their corresponding data values.
     *
     * @return array An associative array of field names to their corresponding values as fetched based on the project settings.
     *
     * @throws Exception If data retrieval fails or settings are incorrectly configured.
     */
    public static function getInstanceData($project_id, $record, $instance, $eventID, &$alternateData=null) {
        $eventID = $eventID ?? EpicParticipantUpdater::getInstance()->getProjectSetting(EpicParticipantUpdater::SETTINGS_FIELD_EVENT_ID,$project_id);
        $settings = EpicParticipantUpdater::getInstance()->getProjectSettings($project_id);
        $fields = [
            EpicParticipantUpdater::SETTINGS_FIELD_LASTNAME => $settings[EpicParticipantUpdater::SETTINGS_FIELD_LASTNAME]['value'] ?? null,
            EpicParticipantUpdater::SETTINGS_FIELD_FIRSTNAME => $settings[EpicParticipantUpdater::SETTINGS_FIELD_FIRSTNAME]['value'] ?? null,
            EpicParticipantUpdater::SETTINGS_FIELD_DATE_START => $settings[EpicParticipantUpdater::SETTINGS_FIELD_DATE_START]['value'] ?? null,
            EpicParticipantUpdater::SETTINGS_FIELD_DATE_END => $settings[EpicParticipantUpdater::SETTINGS_FIELD_DATE_END]['value'] ?? null,
            EpicParticipantUpdater::SETTINGS_FIELD_DOB => $settings[EpicParticipantUpdater::SETTINGS_FIELD_DOB]['value'] ?? null,
            EpicParticipantUpdater::SETTINGS_FIELD_MRN => $settings[EpicParticipantUpdater::SETTINGS_FIELD_MRN]['value'] ?? null,
            EpicParticipantUpdater::SETTINGS_FIELD_STUDY_ID => $settings[EpicParticipantUpdater::SETTINGS_FIELD_STUDY_ID]['value'] ?? null,
            EpicParticipantUpdater::SETTINGS_ALTERNATE_ID_FIELD => $settings[EpicParticipantUpdater::SETTINGS_ALTERNATE_ID_FIELD]['value'] ?? null,
        ];
        $alternateData = $data = [];
        $form_data = self::getFormData($project_id);
        foreach ($fields as $settingKey => $fieldName) {
            if(!$fieldName) continue;
            $isRepeated = boolval($form_data[$fieldName]->is_repeated ?? false);
            $adjustedInstance = ($isRepeated) ? $instance : null; // get the non-repeated value if applicable
            $data[$fieldName] = $fieldValue = Record::findFieldValue($project_id, $record, $eventID, $fieldName, $adjustedInstance);
            $alternateData[$settingKey] = $fieldValue;
        }
        return $data;
    }

    /**
     * Retrieves all instance numbers for a given record in a project.
     *
     * @param integer $project_id The ID of the REDCap project.
     * @param string|int $record The record ID to search for instances.
     * @return array An array of distinct instance numbers.
     */
    public static function getInstances($project_id, $record): array {
        $dataTable = Records::getDataTable($project_id);
        $params = [$project_id, $record];
        $query_string = "SELECT DISTINCT CAST(COALESCE(instance, 1) AS UNSIGNED) AS instance_transformed
            FROM $dataTable
            WHERE project_id = ? AND record = ?
            ORDER BY instance_transformed";
        $result = db_query($query_string, $params);
        $instances = [];
        while($row = db_fetch_assoc($result)) $instances[] = $row['instance_transformed'];
        return $instances;
    }

    /**
     * 
     * Constructs a schema compatible with REDCap::saveData method, considering repetition settings.
     * 
     * $schema = array(
     *	'record_id' => array(
     *		'event_id' => $fields=array(), // if standard project
     *		// if hasRepeatingFormsEvents
     *		'repeat_instances' => array(
     *			'event_id' => array(
     *				'form_name' => array(
     *					'instance_number' => $fields=array(),
     *				)
     *			)
     *		)
     *	)
     * );
     *
     * @param integer $project_id The ID of the REDCap project.
     * @param integer $event_id The event ID associated with the record.
     * @param string $record_id The specific record ID.
     * @param array $fields Associative array of field names and values.
     * @param integer $instance_number Instance number if applicable.
     * @return array Structured array following REDCap schema requirements for data saving.
    */
    public static function getRecordSchema($project_id, $event_id, $record_id, $fields=array() ,$instance_number=1)
    {
        $form_data = self::getFormData($project_id);
        
        $data = array();
        $repeatedInstancesData = array();
        
        foreach ($fields as $key => $value) {
            if(array_key_exists($key, $form_data))
            {
                $field_data = $form_data[$key];
                $form_name = $field_data->form_name;
                $is_repeated = boolval($field_data->is_repeated);

                if($is_repeated) {
                    if(empty($repeatedInstancesData[$form_name][$instance_number])) $repeatedInstancesData[$form_name][$instance_number] = [];
                    $repeatedInstancesData[$form_name][$instance_number][$key] = $value;
                }else {

                    $data[$key] = $value;
                }
            }
        }
        $schema = [
            $record_id => [
                $event_id => $data,
                'repeat_instances' => [$event_id => $repeatedInstancesData]
            ]
        ];

        return $schema;
    }

    /**
     * Searches for a record ID by matching a specific field's value.
     *
     * @param integer $project_id The ID of the REDCap project.
     * @param integer $event_id The event ID to look in.
     * @param string $field_name The field name to match against.
     * @param string $value The value to search for.
     * @return string|false The found record ID or false if not found.
     */
	public static function findRecordID($project_id, $event_id, $field_name, $value)
	{
        $dataTable = Records::getDataTable($project_id);
        $params = [$project_id, $event_id, $field_name, $value];
        $query_string = "SELECT * FROM $dataTable
            WHERE project_id=? AND event_id=?
            AND field_name=? AND value=? LIMIT 1";
        $result = db_query($query_string, $params);
        if($row = db_fetch_object($result)) return $row->record;
        return false;
    }

    /**
     * Retrieves the value of a specified field for a given record and instance.
     *
     * @param integer $project_id The ID of the REDCap project.
     * @param string|int $record_id The record ID.
     * @param integer $event_id The event ID associated with the field.
     * @param string $field_name The name of the field.
     * @param string|int $instance The instance number (optional).
     * @return mixed The value of the field or false if not found.
     */
    public static function findFieldValue($project_id,$record_id,$event_id,$field_name,$instance = "") {
        $dataTable = Records::getDataTable($project_id);
        $params = [$project_id, $event_id, $field_name, $record_id];

        $query_string = "SELECT value FROM $dataTable
			WHERE project_id=? AND event_id=?
            AND field_name=? AND record=?";
        if($instance != '' && $instance != '1') {
            $query_string .= ' AND instance=?';
            $params[] = $instance;
        } else {
            $query_string .= ' AND instance IS NULL';
        }
        $query_string .= " LIMIT 1";

        $result = db_query($query_string, $params);

        if($row = db_fetch_object($result)) return $row->value;
        return false;
    }

    /**
     * Retrieves the instance number for a specific field value or assigns a new one if not present.
     *
     * @param integer $project_id The ID of the REDCap project.
     * @param integer $event_id The event ID.
     * @param integer $record_id The record ID.
     * @param string $field_name The field name to look up.
     * @param mixed $value The value to match.
     * @return integer|null The instance number if found or assigned, null otherwise.
     */
    public static function getInstanceNumber($project_id, $event_id, $record_id, $field_name, $value)
    {
        /**
         * helper function to get the next instance number
         */
        $getNextInstanceNumber = function($project_id, $event_id, $record_id, $field_name) {
            $dataTable = Records::getDataTable($project_id);
            $params = [
                $project_id,
                $event_id,
                $record_id,
                $field_name
            ];
            $query_string = "SELECT MAX(IFNULL(instance, 1)) AS max_instance
                FROM $dataTable
                WHERE project_id=?
                AND event_id=?
                AND record=?
                AND field_name=?";
            $result = db_query($query_string, $params);
            if($row = db_fetch_object($result)) return intval($row->max_instance)+1;
            else return 1;
        };

        if(empty($field_name)) return 1;

        $dataTable = Records::getDataTable($project_id);
        $params = [
            $project_id,
			$event_id,
			$record_id,
			$field_name,
			$value
        ];
		$query_string = "SELECT *, IFNULL(instance, 1) AS normalized_instance
            FROM $dataTable
			WHERE project_id=?
            AND event_id=?
            AND record=?
            AND field_name=? AND value=? LIMIT 1";
        $result = db_query($query_string, $params);
        if($row = db_fetch_object($result)) return intval($row->normalized_instance);
        else return $getNextInstanceNumber($project_id, $event_id, $record_id, $field_name);
    }

    /**
	 * get next available record ID for a project
	 *
	 * @param integer $project_id
	 * @return string|integer
	 */
	public static function getNextAutoNumberedRecordId($project_id)
	{
        $dataTable = Records::getDataTable($project_id);
        $params = [$project_id];
		$query_string = "SELECT record FROM $dataTable
			WHERE project_id=?
			GROUP BY record
			ORDER BY CAST(record AS UNSIGNED INTEGER) DESC limit 1";
		$result = db_query($query_string, $params);
		if($row=db_fetch_assoc($result))
		{
			$record = $row['record'];
			$next_record = $record+1;
			// add elading zeroes if any
			if(preg_match('/^0+/', $record, $matches))
				$next_record = str_pad($next_record, strlen($record), '0', STR_PAD_LEFT);
				return $next_record;
		}
		return 1;
	}
}