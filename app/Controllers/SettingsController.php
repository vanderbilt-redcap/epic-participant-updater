<?php namespace Vanderbilt\EpicParticipantUpdater\App\Controllers;

class SettingsController extends BaseController
{
    private $redcap_version;

    function __construct()
    {
        // var_dump(get_defined_vars());
    }
    
    /*
    * list the repos
    */
	public function listItems($pid)
	{
        $Proj = new \Project($this_project_id=$pid, $autoLoadAttributes=true);

        try {
            $items =  array_keys($Proj->metadata);
            
			$response = array(
                "results" => $items,
				"total" => count($items),
			);
			$this->printJSON($response);
		} catch (\Exception $e) {
            $response = array(
                "error" => true,
				"message" => $e->getMessage(),
			);
			header('HTTP/1.1 500 Internal Server Error');
			$this->printJSON($response);
		}
	}

}