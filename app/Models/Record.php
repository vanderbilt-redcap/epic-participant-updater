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
class Record extends BaseModel implements \JsonSerializable
{

	const DB_TABLE = 'redcap_data';

	/**
	 * event ID of the record
	 *
	 * @var integer
	 */
	private $project_id;

	/**
	 * event ID of the record
	 *
	 * @var integer
	 */
	private $event_id;

	/**
	 * the ID of the record we want to create
	 *
	 * @var integer
	 */
	private $id;

	/**
	 * list of fields in this record
	 *
	 * @var Field[]
	 */
	private $fields;

	/**
	 * create a record
	 *
	 * @param integer $project_id
	 * @param integer $event_id
	 * @param string $record_id
	 * @param Field[] $fields
	 * 	
	 */
	private function __construct($project_id, $event_id, $id=null, $fields=array())
	{
		$this->project_id = $project_id;
		$this->event_id = $event_id;
		$this->id = $id;
		$this->fields = $fields;
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

	/**
	 * create a new record and save it to the database
	 *
	 * @param [type] $project_id
	 * @param [type] $event_id
	 * @param array $fields
	 * @return void
	 */
	public static function create($project_id, $event_id)
	{
		$project = new \Project($project_id);
		$project_primary_key =  $project->table_pk;
		
		$id = self::getNextAutoNumberedRecordId($project_id);
        // return key($proj->metadata);
		$field = new Field(array(
			'project_id' => $project_id,
			'event_id' => $event_id,
			'record' => $id,
			'field_name' => $project_primary_key,
			'value' => $id
		));
		$field->save();
		$record = new self($project_id, $event_id, $id, array($field));
		return $record;
	}

	public function getFields($record_id)
	{
		$query_string = sprintf(
			"SELECT %s FROM %s
			WHERE project_id=%u AND event_id=%u
			AND record='%s'",
			implode(',', Field::DB_COLUMNS),
			self::DB_TABLE,
			$this->project_id,
			$this->event_id
		);
		$result = db_query($query_string);
		if(!$result) return false;
		while($row = db_fetch_assoc($result))
		{
			$this->fields[] = new Field($row);
		}
	}

	/**
	 * TODO: add a field to the record
	 *
	 * @return void
	 */
	public function addField()
	{

	}

	private static function createInstanceFromDBQueryString($query_string)
	{
		$result = db_query($query_string);
		if(!$result) return false;
		$fields = array();
		while($row = db_fetch_assoc($result))
		{
			$fields[] = new Field($row);
		}
		if(empty($fields)) return false; // no record

		$field = $fields[0];
		$record = new self($field->project_id, $field->event_id, $field->record, $fields);
		return $record;
	}

	/**
	 * get a record instance from database
	 * using project_id, event_id and record_id
	 *
	 * @param integer $project_id
	 * @param integer $event_id
	 * @param string $record_id
	 * @return Record
	 */
	public static function get($project_id, $event_id, $record_id)
	{
		$query_string = sprintf(
			"SELECT %s FROM %s
			WHERE project_id=%u AND event_id=%u
			AND record='%s'",
			implode(',',Field::DB_COLUMNS), self::DB_TABLE,
			$project_id, $event_id,
			$record_id
		);

		return self::createInstanceFromDBQueryString($query_string);
	}

	/**
	 * find a record instance from the database seraching for a specific field_name => value pair
	 *
	 * @param integer $project_id
	 * @param integer $event_id
	 * @param string $field_name
	 * @param string $value
	 * @return void
	 */
	public static function find($project_id, $event_id, $field_name, $value)
	{
		$query_string = sprintf(
			'SELECT %1$s FROM %2$s
			WHERE project_id=%3$u AND event_id=%4$u
			AND record =
			(SELECT record FROM %2$s
			WHERE project_id=%3$u AND event_id=%4$u
			AND field_name=\'%5$s\' AND value=\'%6$s\' LIMIT 1)',
			implode(',',Field::DB_COLUMNS),
			self::DB_TABLE,
			$project_id,
			$event_id,
			$field_name,
			$value
		);

		return self::createInstanceFromDBQueryString($query_string);
	}


	public function jsonSerialize()
	{
		return $this->getData();
	}
}