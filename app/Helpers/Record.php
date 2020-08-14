<?php
namespace Vanderbilt\EpicParticipantUpdater\App\Helpers;

class Record
{
    
    const DB_TABLE = 'redcap_data';
    const DB_FIELDS = ['project_id','event_id','record','field_name','value','instance'];
    
    /**
     * get the form name of a field
     *
     * @param integer $project_id
     * @param string $field_name
     * @return array|false 
     */
    private static function getFormDataForFields($project_id, $field_names)
    {
        $quoted_fields = array_map(function($field) {
            return "'{$field}'";
        }, $field_names);
        $fields = join(', ', $quoted_fields);
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
            LEFT JOIN redcap_events_forms AS r
            ON r.event_id=em.event_id AND r.form_name=m.form_name
            WHERE m.project_id=%u
            AND m.field_name IN (%s)
            ORDER BY m.field_order",
            $project_id,
            $fields
        );
        $result = db_query($query_string);
        $rows = array();
        while($row = db_fetch_object($result)) {
            $rows[$row->field_name] = $row;
        }
        return $rows;
    }

    /**
     *
     * get a valid schema compatible with REDCap::saveData
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
     * @param integer $project_id
     * @param integer $event_id
     * @param string $record_id
     * @param array $fields
     * @param integer $instance_number
     * @return array
     */
    public static function getRecordSchema($project_id, $event_id, $record_id, $fields=array() ,$instance_number=1, $repeated_form_name=false)
    {
        $project = new \Project($project_id);
        $repeatingFormsEvents = $project->getRepeatingFormsEvents();
        $repeatingFormsForEvent = $repeatingFormsEvents[$event_id];
        $field_names = array_keys($fields);
        $form_data = self::getFormDataForFields($project_id, $field_names);

        $data = array();
        $repeatedInstancesData = array();

        $data = $fields;

        foreach ($fields as $key => $value) {

            if(array_key_exists($key, $form_data))
            {
                $form_name = ($form_data[$key])->form_name;

                if(empty($repeatedInstancesData[$form_name][$instance_number])) $repeatedInstancesData[$form_name][$instance_number] = array();
                $repeatedInstancesData[$form_name][$instance_number][$key] = $value;
            }else {
                $data[$key] = $value;
            }
        }
        /* $schema = [
            $record_id => [
                $event_id => $data,
                'repeat_instances' => [$event_id => $repeatedInstancesData]
            ]
        ]; */
        $schema = [$record_id => []];
        if($repeated_form_name) {
            $schema[$record_id] = [
                'repeat_instances' => [$event_id => [$repeated_form_name => [$instance_number => $data]]]
            ];
        }else {
            $schema[$record_id] = [$event_id => $data];
        }

        return $schema;
    }

    /**
	 * find a record ID from the database seraching for a specific field_name => value pair
	 *
	 * @param integer $project_id
	 * @param integer $event_id
	 * @param string $field_name
	 * @param string $value
	 * @return string|false
	 */
	public static function findRecordID($project_id, $event_id, $field_name, $value)
	{
        $fields = join(', ', self::DB_FIELDS);
		$query_string = sprintf(
			"SELECT %s FROM %s
			WHERE project_id=%u AND event_id=%u
            AND field_name='%s' AND value='%s' LIMIT 1",
            $fields,
			self::DB_TABLE,
			$project_id,
			$event_id,
			$field_name,
			$value
        );
       
        $result = db_query($query_string);
        if($row = db_fetch_object($result)) return $row->record;
        return false;
    }

    /**
     * get instance number for a record entry 
     *
     * @param integer $project_id
     * @param integer $event_id
     * @param integer $record_id
     * @param string $field_name
     * @param mixed $value
     * @return integer|false
     */
    public static function getInstance($project_id, $event_id, $record_id, $field_name, $value)
    {
        $fields = join(', ', self::DB_FIELDS);
		$query_string = sprintf(
			"SELECT *, IFNULL(insance, 1) AS normalized_instance
            FROM %s
			WHERE project_id=%u
            AND event_id=%u
            AND record_id=%u
            AND field_name='%s' AND value='%s' LIMIT 1",
            $fields,
			self::DB_TABLE,
			$project_id,
			$event_id,
			$record_id,
			$field_name,
			$value
        );
        $result = db_query($query_string);
        if($row = db_fetch_object($result)) return intval($row->normalized_instance);
        return false;
    }

    /**
	 * get next available record ID for a project
	 *
	 * @param integer $project_id
	 * @return string|integer
	 */
	public static function getNextAutoNumberedRecordId($project_id)
	{
		$query_string = sprintf(
			"SELECT record FROM %s
			WHERE project_id = %u
			GROUP BY record
			ORDER BY CAST(record AS UNSIGNED INTEGER) DESC limit 1",
			self::DB_TABLE,
			$project_id
		);
		$result=db_query($query_string);
		if($row = db_fetch_assoc($result))
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