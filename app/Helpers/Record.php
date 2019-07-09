<?php
namespace Vanderbilt\EpicParticipantUpdater\App\Helpers;

class Record
{
    
    const DB_TABLE = 'redcap_data';
    
    /**
     * get the form name of a field
     *
     * @param integer $project_id
     * @param string $field_name
     * @return string|false 
     */
    private static function getFormNameForField($project_id, $field_name)
    {
        $project = new \Project($project_id);
        $metadata = $project->metadata;
        $field_info = $metadata[$field_name];
        if(!$field_info) return false;
        return $field_info['form_name'];
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
    public static function getRecordSchema($project_id, $event_id, $record_id, $fields=array() ,$instance_number=1)
    {
        $project = new \Project($project_id);
        $repeatingFormsEvents = $project->getRepeatingFormsEvents();
        $repeatingFormsForEvent = $repeatingFormsEvents[$event_id];

        $data = array();
        $repeatedInstancesData = array();

        foreach ($fields as $key => $value) {
            $formName = self::getFormNameForField($project_id, $key);
            if(array_key_exists($formName, $repeatingFormsForEvent))
            {
                if(empty($repeatedInstancesData[$formName][$instance_number])) $repeatedInstancesData[$formName][$instance_number] = array();
                $repeatedInstancesData[$formName][$instance_number][$key] = $value;
            }else {
                $data[$key] = $value;
            }
        }
        $schema = array(
            $record_id => array(
                $event_id => $data,
                'repeat_instances' => array(
                    $event_id => $repeatedInstancesData
                )
            )
        );

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
	public static function find($project_id, $event_id, $field_name, $value)
	{
		$query_string = sprintf(
			"SELECT record FROM %s
			WHERE project_id=%u AND event_id=%u
			AND field_name='%s' AND value='%s' LIMIT 1",
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