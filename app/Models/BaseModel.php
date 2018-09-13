<?php namespace Vanderbilt\EpicParticipantUpdater\App\Models;

use \RedBeanPHP\R as R;

class BaseModel extends \RedBeanPHP\SimpleModel {

	/**
	 * fields that must be sanitized before rendering
	 */
	private $fieldsToSanitize = array(
		"name",
		"url",
		"description",
		"stars",
	);

    /**
     * Escape Data for presentation
     */
    private function sanitize()
    {
       	foreach ($this->fieldsToSanitize as $field) {
       		$this->$field = htmlspecialchars($this->$field);
    	}
    }
    
    public function open() {
       // echo "\n\rcalled open: ".$this->id;
        // echo "\n\rcalled open() ".$this->bean;
       $this->sanitize();
    }
}