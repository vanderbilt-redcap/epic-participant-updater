<?php namespace Vanderbilt\EpicParticipantUpdater\App\Models;

use Vanderbilt\EpicParticipantUpdater\EpicParticipantUpdater;

class Settings extends BaseModel {
	
	/**
	 *
	 * @var EpicParticipantUpdater
	 */
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

	public function getFirstNameFieldName($project_id)
    {
        return $this->module->getProjectSetting(EpicParticipantUpdater::SETTINGS_FIELD_FIRSTNAME,$project_id);
    }

    public function getLastNameFieldName($project_id)
    {
        return $this->module->getProjectSetting(EpicParticipantUpdater::SETTINGS_FIELD_LASTNAME,$project_id);
    }

    public function getDOBFieldName($project_id)
    {
        return $this->module->getProjectSetting(EpicParticipantUpdater::SETTINGS_FIELD_DOB,$project_id);
    }

    public function getCallHook($project_id) {
	    return $this->module->getProjectSetting(EpicParticipantUpdater::SETTINGS_CALL_HOOK,$project_id);
    }

	public function getEventID($project_id)
	{
		return $this->module->getProjectSetting(EpicParticipantUpdater::SETTINGS_FIELD_EVENT_ID, $project_id);
	}

	/**
	 * get a list of status that will trigger an action.
	 * available status are:
	 * - Identified - Being Considered for Study
	 * - Interested
	 * - Inelegible - May Re-screen
	 * - Pre-Screening
	 * - Scheduling, Pending Consent
	 * - In Screening, Consented
	 * - On Study
	 * - Follow-up - With Billing
	 * - Completed Study Protocol - No future activity planned
	 * - Whitdrawn from Study - No future activity planned
	 * - Patient Expired Before Completing Study
	 * - Excluded - Screen Failure
	 * - Excluded - Ineligible
	 * - Not Interested
	 * - Consent Declined
	 * - Removed From Consideration During Recruitment
	 * - Associated in Error - Delete Enrollment
	 * - Survival Follow-Up (VICC only)
	 * - (IT Use Only) Interested - Pt answered in MHAV
	 * - (IT Use Only) Identified - RWB Recruitment Message or Auto DL
	 * - (IT Use Only) Identified - Data Link File
	 * - (IT Use Only) Identified - Data Link Query
	 * - (IT Use Only) Not Interested - Pt answered in MHAV
	 *
	 * @param integer $project_id
	 * @return array
	 */
	public function getStatusList($project_id)
	{
		$status_list_string =  $this->module->getProjectSetting(EpicParticipantUpdater::SETTINGS_FIELD_STATUS_LIST, $project_id);
		$list = preg_split("/[\r\n]/", $status_list_string);
		$non_empty_list = array_filter($list, function($item){ return !empty(trim($item));});
		return $non_empty_list;

	}

}

