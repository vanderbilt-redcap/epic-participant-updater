<?php namespace Vanderbilt\EpicParticipantUpdater\App\Models;

use Vanderbilt\EpicParticipantUpdater\EpicParticipantUpdater;

class LogModel {

    private $message;
    private $parameters;

    private $reserved_keys = [
        'project_id' => '_project_id',
        'record_id' => '_record_id',
        'message' => 'description',
    ]; // list of reserved keys and key to use as sobstitute
    private $reserved_keys_prefix = '_'; // prefix to use in front of reserved keys

    private $status_list = [
        'info', // generic log not related to a specific project or record
        'success', // success updating or creating a record
        'warning', // generic warning
        'error', // project or record specific error
    ]; // list of available status

     //fields to get from database 
    private static $DB_fields = ['log_id', 'timestamp', 'user', 'ip',
        '_project_id AS project_id', '_record_id AS record',
        'message', 'status', 'description', 'MRN', 'irb_number'];


    public function __construct($message, $parameters=[])
    {

        $this->message = $message;
        foreach ($parameters as $key => $value) {
            $this->{$key} = $value;
        };
    }


    /**
     * save the log using a module
     *
     * @param EpicParticipantUpdater $module
     * @return void
     */
    public function save(EpicParticipantUpdater $module)
    {
        $module->log($this->message, $this->parameters);
    }

    /**
     * list the logs using pagination
     * set $limit to -1 to skip pagination
     *
     * @param EpicParticipantUpdater $module
     * @param int $page
     * @param int $limit
     * @return void
     */
	public static function getList(EpicParticipantUpdater $module, int $page, int $limit)
	{
        $offset = ($page-1)*$limit; // when page is 1 the offset is 0
		$sql = "SELECT ".implode(',',self::$DB_fields)." ORDER BY timestamp DESC";
		if($limit>0) $sql .= " LIMIT {$offset}, {$limit}";
		$result = $module->queryLogs($sql);
		$logs = [];
		while($row = mysqli_fetch_assoc($result)){
			$logs[] = $row;
		}

		return $logs;
    }
    
    /**
     * normalize status with specific values
     *
     * @param string $value
     * @return void
     */
    private function setStatus($value)
    {
        if(!in_array($value, $this->status_list))
            $value = 'info'; //set the default status

        $this->parameters['status'] = $value;
    }
 
    /**
     * setter magic function
     *
     * @param string $name
     * @param mixed $value
     */
	public function __set($name, $value)
    {
        if($name=='status')
        {
            // normalize the status
            $this->setStatus($value);
            return;
        }
        if(array_key_exists($name, $this->reserved_keys))
        {
            // use different key as specified in $this->reserved_keys
            $name = $this->reserved_keys[$name];
        }
        if(is_array($value)) $value = implode(', ',$value); // arrays must be converted to strings
		$this->parameters[$name] = $value;
    }

	/**
	 * getter for params values
     * converts underscores to dashes
	 */
    /**
     * Undocumented function
     *
     * @param string $name
     * @return void
     */
	public function __get($name)
    {
        if (array_key_exists($name, $this->parameters)) {
            return $this->parameters[$name];
        }

        $trace = debug_backtrace();
        trigger_error(
            'Undefined property via __get(): ' . $name .
            ' in ' . $trace[0]['file'] .
            ' on line ' . $trace[0]['line'],
            E_USER_NOTICE);
        return null;
	}

    
}