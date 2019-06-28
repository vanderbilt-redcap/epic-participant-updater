<?php namespace Vanderbilt\EpicParticipantUpdater\App\Models;

/**
 * TODO: delete this class
 */
class _Record extends BaseModel implements \JsonSerializable
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
		$this->schema = self::arrayToObject($record); // save the schema as an object
		return $this->schema;
	}

	/**
	 * get a record witha a data structure suitable for being used in REDCap::saveData
	 *
	 * @return array|object record structure
	 */
	public function getData($as_array=true)
	{
		if($as_array) return self::objectToArray($this->schema);
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
	 * get a reference to the data container
	 *
	 * @return object the record schema by reference
	 */
	private function &getDataContainer()
	{
		return $this->schema->{$this->record_id}->{$this->event_id};
	}

	/**
	 * get a reference to the repeated data container
	 *
	 * @return object the record schema by reference
	 */
	private function &getRepeatedDataContainer()
	{
		return $this->schema->{$this->record_id}->{self::REPEATED_INSTRUMENTS_CONTAINER_KEY}->{$this->event_id};
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
		$container = &$this->getDataContainer();
		$container[$key] = $value;
	}

	/**
	 * add data to the repeatable data container of the record
	 *
	 * @param string $key
	 * @param string $value
	 * @param string $instrument_key
	 * @param string $instance_number defaults to first instance
	 * @return void
	 */
	private function addDataToRepeatedInstances($key, $value, $instrument_key, $instance_number = 1)
	{
		$container = &$this->getRepeatedDataContainer();
		$form_entry = array($instrument_key => array($instance_number => array($key=>$value)) );
		$container = array_merge($container, $form_entry);
	}

	public function jsonSerialize()
	{
		return $this->getData();
	}
}