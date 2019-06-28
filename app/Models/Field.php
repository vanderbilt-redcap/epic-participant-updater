<?php namespace Vanderbilt\EpicParticipantUpdater\App\Models;

 /**
  * exposed properties:
  * @property integer $project_id
  * @property integer $event_id
  * @property string $record
  * @property string $field_name
  * @property string $value
  * @property string $instance
  */
class Field extends BaseModel implements \JsonSerializable
{

	const DB_TABLE = 'redcap_data';

	const DB_COLUMNS = array(
		'project_id',
		'event_id',
		'record',
		'field_name',
		'value',
		'instance',
	);
	
	/**
	 * project of the record
	 *
	 * @var \Project
	 */
	private $project;

	private $properties = array();

					
	function __construct($properties)
	{
		foreach ($properties as $key => $value) {
			if(in_array($key, self::DB_COLUMNS)) $this->properties[$key] = $value;
		}
		if($project_id = $properties['project_id'])
			$this->project = new \Project($project_id);
	}

	/**
	 * get field data
	 *
	 * @return array = [
	 * 	integer project_id,
	 * 	integer event_id,
	 * 	string record,
	 * 	string field_name,
	 * 	string value,
	 * 	string instance,
	 * ]
	 */
	public function __get($property)
	{
		if(array_key_exists($property, $this->properties)) return $this->properties[$property];

		$trace = debug_backtrace();
        trigger_error(
            'Undefined property via __get(): ' . $property .
            ' in ' . $trace[0]['file'] .
            ' on line ' . $trace[0]['line'],
            E_USER_NOTICE);
        return null;
	}

	private function getFieldInstrument()
    {
        $metadata = $this->project->metadata;
        $field_info = $metadata[$this->field_name];
        if(!$field_info) return false;
        return $field_info['form_name'];
	}

	/**
	 * check if the field belongs to a repeatable instrument in the current event
	 *
	 * @return boolean
	 */
	private function belongsToRepeatableInstrument()
	{
		// get all events and relative instruments
		$repeatingFormsEvents = $this->project->getRepeatingFormsEvents();
		// get intruments for the event of this record
		$formsForEvent = $repeatingFormsEvents[$this->event_id];

		$instrument_key = $this->getFieldInstrument();
		return (in_array($instrument_key, array_keys($formsForEvent)));
	}

	/**
	 * retrieve a field instance from the database
	 *
	 * @param array $args associative array with self::DB_COLUMNS as keys
	 * @return Field|false
	 */
	public static function find($args=array(), $limit=1)
	{
		$where_string = self::getWhereClause($args);
		$query_string = sprintf(
			"SELECT %s FROM %s WHERE %s %s",
			implode(',', self::DB_COLUMNS),
			self::DB_TABLE,
			$where_string,
			($limit!==false) ? "LIMIT {$limit}" : ''
		);
		$result = db_query($query_string);
		if(!$result) return false;
		if($row = db_fetch_array($result))
			return new self($row);
	}

	/**
	 * update the value of a field
	 *
	 * @param string $value
	 * @return boolean
	 */
	public function update($value)
	{
		$value = isset($value) ? $value : $this->value;
		$where_string = self::getWhereClause(array(
			'project_id' => $this->project_id,
			'event_id' => $this->event_id,
			'record' => $this->record,
			'field_name' => $this->field_name,
			'instance' => $this->instance,
		));
		$query_string = sprintf(
			"UPDATE %s
			SET %s=%s
			WHERE %s
			",
			self::DB_TABLE,
			$this->field_name, $value,
			$where_string
		);
		if($result = db_query($query_string)) return true;
		return false;
	}

	/**
	 * todo
	 *
	 * @return void
	 */
	public function save()
	{
		$columns = array();
		foreach (self::DB_COLUMNS as $key) {
			$value = $this->{$key};
			$columns[$key] = empty($value) ? 'NULL' : sprintf("'%s'", db_real_escape_string($value));
		};
		$query_string = sprintf(
			"INSERT INTO %s
			(%s)
			VALUES (%s)",
			self::DB_TABLE,
			$column_names =  implode(', ', self::DB_COLUMNS),
			$values = implode(', ', $columns)
		);
		$result = db_query($query_string);
		return $result;
	}

	/**
	 * build the SQL WHERE clause
	 *
	 * @param array $args associative array with self::DB_COLUMNS as keys
	 * @return string
	 */
	private static function getWhereClause($args=array())
	{

		$conditions = array();
		foreach ($args as $key => $value) {
			if(!in_array($key, self::DB_COLUMNS)) continue;
			switch ($key) {
				default:
					$conditions[$key] = isset($value) ? sprintf("'%s'", db_real_escape_string($value)) : 'IS NULL';
					break;
			}
		}
		if(empty($conditions)) return '';

		$query_string = implode(' AND ', array_map(function($key, $value){
			return sprintf("%s=%s", $key, $value);
		}, array_keys($conditions), $conditions));
		return $query_string;
	}
	
	public function jsonSerialize()
	{
		return array();
	}
}