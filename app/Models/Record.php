<?php namespace Vanderbilt\EpicParticipantUpdater\App\Models;

class Record extends BaseModel implements \JsonSerializable
{

	const REPEATED_INSTRUMENTS_CONTAINER_KEY = 'repeat_instances';
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

	/**
	 * holds the schema of the record:
	 * 
	 * $schema = array(
	 *	'record_id' => array(
	 *		'event_id' => $fields=array(), // if standard project
	 *		// if hasRepeatingFormsEvents
	 *		'repeat_instances' => array(
	 *			'event_id' => array(
	 *				'form_name' => array(
	 *					'record_id' => $fields=array(),
	 *				)
	 *			)
	 *		)
	 *	)
	 * );
	 *
	 * @var array
	 */
	private $schema = array();


	/**
	 * schema of a record
	 
	*/
					

	function __construct($project_id, $event_id, $record_id, $data)
	{
		
		$this->project = new \Project($project_id);
		$this->event_id = $event_id;
		$this->record_id = $record_id;

		$this->build();
		$this->setData($data);
	}

	private function getFieldInstrument($field_name)
    {
        $metadata = $this->project->metadata;
        $field_info = $metadata[$field_name];
        if(!$field_info) return false;
        return $field_info['form_name'];
	}
	
	/**
	 * get the record structure
	 *
	 * @return array
	 */
	private function build()
	{
		// container schema for the events used both for repeatable an non repeatable instruments
		$events_schema = array( $this->event_id => array() );
		// create a spot for non repeatable instruments data
		$record = array( $this->record_id => $events_schema );
		if($this->project->hasRepeatingFormsEvents())
		{
			// create a spot for repeated instruments data
			$record[$this->record_id][self::REPEATED_INSTRUMENTS_CONTAINER_KEY] = $events_schema;
		}
		$this->schema = $record;
		return $record;
	}

	/**
	 * get the instruments part of the structure along with the data
	 *
	 * @return void
	 */
	public function getInstruments()
	{
		$instruments = array();
		foreach ($this->data as $key => $value) {
			$instrument_key = $this->getFieldInstrument($key);
			// $project_primary_key = $this->project->table_pk;
			if(!array_key_exists($instrument_key, $instruments))
			{
				$instruments[$instrument_key] = array($this->record_id=>array());
			}
			$instruments[$instrument_key][$this->record_id][$key] = $value;
		}
		return $instruments;
	}

	/**
	 * get a record witha a data structure suitable for being used in REDCap::saveData
	 *
	 * @return array record structure
	 */
	public function getData()
	{
		return $this->schema;
	}

	/**
	 * set data in the record structure
	 *
	 * @param array $data key => value
	 * @return array record structure
	 */
	private function setData($data)
	{
		// get all events and relative instruments
		$repeatingFormsEvents = $this->project->getRepeatingFormsEvents();
		// get intruments for the event of this record
		$formsForEvent = $repeatingFormsEvents[$this->event_id];

		foreach ($data as $key => $value) {
			$instrument_key = $this->getFieldInstrument($key);
			if(in_array($instrument_key, array_keys($formsForEvent)))
			{
				$this->addDataToRepeatedInstances($key, $value, $instrument_key);
			}else {
				$this->addData($key, $value);
			}
		}
		return $this->schema;
	}

	/**
	 * add data to the non repeatable data container of the record
	 * 
	 * @param string $key
	 * @param string $value
	 * @return void
	 */
	private function addData($key, $value)
	{
		$record = &$this->schema;
		$record[$this->record_id][$this->event_id][$key] = $value;
	}

	/**
	 * add data to the repeatable data container of the record
	 *
	 * @param string $key
	 * @param string $value
	 * @param string $instrument_key
	 * @return void
	 */
	private function addDataToRepeatedInstances($key, $value, $instrument_key)
	{
		$record = &$this->schema;

		$instrument_container = &$record[$this->record_id][self::REPEATED_INSTRUMENTS_CONTAINER_KEY][$this->event_id];
		$form_entry = array( $instrument_key => array($this->record_id => array($key=>$value)) );
		$instrument_container = array_merge($instrument_container, $form_entry);
	}

	public function jsonSerialize()
	{
		return $this->getData();
	}
}