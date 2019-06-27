<?php namespace Vanderbilt\EpicParticipantUpdater\App\Models;

class Field extends BaseModel implements \JsonSerializable
{

	const DATA_TABLE = 'repeat_data';
	/**
	 * project of the record
	 *
	 * @var \Project
	 */
	private $project;

	/**
	 * event ID of the record
	 *
	 * @var integer
	 */
	private $event_id;

	/**
	 * the ID of the record the field belongs to
	 *
	 * @var string
	 */
	private $record;

	/**
	 * name of the field
	 *
	 * @var string
	 */
	private $field_name;

	/**
	 * value of the field
	 *
	 * @var string
	 */
	private $value;

	/**
	 * instance the field belongs to (for longitudinal projects and repeatable instruments )
	 *
	 * @var integer
	 */
	private $instance;

					
	function __construct($project_id, $event_id, $record, $field_name, $value, $instance=null)
	{
		$this->project_id = $project_id;
		$this->project = new \Project($project_id);
		$this->event_id = $event_id;
		$this->record = $record;
		$this->field_name = $field_name;
		$this->value = $value;
		$this->instance = $instance;
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
	 * todo
	 *
	 * @return void
	 */
	public function save()
	{
		$query_string = sprintf("INSERT INTO %s", self::DATA_TABLE);
	}
	

	public function jsonSerialize()
	{
		return array();
	}
}