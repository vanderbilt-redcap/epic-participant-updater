<?php namespace Vanderbilt\EpicParticipantUpdater\App\Models;

use Vanderbilt\EpicParticipantUpdater\EpicParticipantUpdater;

class Settings extends BaseModel {
	
	private $module;

	/**
	 * constructor
	 *
	 * @param EpicParticipantUpdater $module
	 */
	function __construct($module)
	{
		$this->module = $module;
		
		parent::__construct();
	}

	public function getStudyIDs($project_id)
	{
		$study_id_string =  $this->module->getProjectSetting(EpicParticipantUpdater::SETTINGS_STUDY_ID, $project_id);
		// check if the project is set to catch any study ID
		if(preg_match("/\s*\*\s*/",$study_id_string)) return EpicParticipantUpdater::CATCH_ALL_IDENTIFIER;

		preg_match_all("/(?<study_id>[\w\d]+)|\s*\*\s*/",$study_id_string, $matches);
		if(!$matches) return array();
		$study_ids = $matches['study_id'];
		return $study_ids;
	}

	public function getMrnFieldName($project_id)
	{
		return $this->module->getProjectSetting(EpicParticipantUpdater::SETTINGS_FIELD_MRN, $project_id);
	}

	public function getStudyIdFieldName($project_id)
	{
		return $this->module->getProjectSetting(EpicParticipantUpdater::SETTINGS_FIELD_STUDY_ID, $project_id);
	}

	public function getStatusFieldName($project_id)
	{
		return $this->module->getProjectSetting(EpicParticipantUpdater::SETTINGS_FIELD_STATUS, $project_id);
	}

	public function getStartDateFieldName($project_id)
	{
		return $this->module->getProjectSetting(EpicParticipantUpdater::SETTINGS_FIELD_DATE_START, $project_id);
	}

	public function getEndDateFieldName($project_id)
	{
		return $this->module->getProjectSetting(EpicParticipantUpdater::SETTINGS_FIELD_DATE_END, $project_id);
	}

	public function getEventID($project_id)
	{
		return $this->module->getProjectSetting(EpicParticipantUpdater::SETTINGS_FIELD_EVENT_ID, $project_id);
	}

}