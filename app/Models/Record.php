<?php namespace Vanderbilt\EpicParticipantUpdater\App\Models;

class Record extends BaseModel implements \JsonSerializable
{
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
	 * the ID of the record we want to create
	 *
	 * @var integer
	 */
	private $record_id;

	/**
	 * the actual record data in key => value pairs
	 *
	 * @var array
	 */
	private $data;


	function __construct($project_id, $event_id, $record_id, $data)
	{
		$this->project = new \Project($project_id);
		$this->event_id = $event_id;
		$this->record_id = $record_id;
		$this->data = $data;
	}

	private function getFieldInstrument($field_name)
    {
        $metadata = $this->project->metadata;
        $field_info = $metadata[$field_name];
        if(!$field_info) return false;
        return $field_info['form_name'];
    }

	public function getData()
	{
		$data = $this->data;
		$instruments = array();
		foreach ($data as $key => $value) {
			$instrument_key = $this->getFieldInstrument($key);
			if(!array_key_exists($instrument_key, $instruments)) $instruments[$instrument_key] = array();
			$instruments[$instrument_key][$key] = $value;
		}
		$project_primary_key = $this->project->table_pk;
		$data[$project_primary_key] = $this->record_id;
		// check if the project is longitudinal
		$hasRepeatingFormsEvents = $this->project->hasRepeatingFormsEvents();
		if($hasRepeatingFormsEvents) $data['redcap_repeat_instance'] = 1; // use the first instance
		return $data;
	}

	public function jsonSerialize()
	{
		return array(
			$this->event_id => $this->getData(),
		);
	}
}