<?php namespace Vanderbilt\EpicParticipantUpdater\App\Models;

use Vanderbilt\EpicParticipantUpdater\EpicParticipantUpdater;

class Settings extends BaseModel {
	
	private $module;

	/**
	 * keys used in the project settings
	 */
	const KEYS = array(
		'MRN' => 'mrn-mapping-field',
		'status' => 'status-mapping-field',
		'date_start' => 'date-start-mapping-field',
		'date_end' => 'date-end-mapping-field',
		'event_id' => 'event-id',
	);

	/**
     * setting key to retrieve the MRN field
     *
     * @var string
     */
    private $mrn_field_name;

    /**
     * setting key to retrieve the study status field
     *
     * @var string
     */
	private $status_field_name;
	
	/**
	 * setting key to retrieve the date start field
	 *
	 * @var string
	 */
	private $date_start_field_name;

	/**
	 * setting key to retrieve the date end field
	 *
	 * @var string
	 */
	private $date_end_field_name;

    /**
     * setting key to retrieve the event containing the module fields (mrn, patient status, dates)
     *
     * @var string
     */
	private $event_id;

	/**
	 * constructor
	 *
	 * @param EpicParticipantUpdater $module
	 * @param integer $project_id
	 */
	function __construct($module, $project_id)
	{
		$this->module = $module;

        $this->mrn_field_name = $this->module->getProjectSetting(self::KEYS['MRN'], $project_id);
		$this->status_field_name = $this->module->getProjectSetting(self::KEYS['status'], $project_id);
		$this->date_start_field_name = $this->module->getProjectSetting(self::KEYS['date_start'], $project_id);
		$this->date_end_field_name = $this->module->getProjectSetting(self::KEYS['date_end'], $project_id);
		$this->event_id = $this->module->getProjectSetting(self::KEYS['event_id'], $project_id);
		
		parent::__construct();
	}

	public function getMrnFieldName()
	{
		return $this->mrn_field_name;
	}

	public function getStatusFieldName()
	{
		return $this->status_field_name;
	}

	public function getStartDateFieldName()
	{
		return $this->date_start_field_name;
	}

	public function getEndDateFieldName()
	{
		return $this->date_end_field_name;
	}

	public function getEventID()
	{
		return $this->event_id;
	}

}