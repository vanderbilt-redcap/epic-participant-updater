<?php namespace Vanderbilt\EpicParticipantUpdater\App\Models;

use Vanderbilt\EpicParticipantUpdater\EpicParticipantUpdater;

class Logger {

    private static $reserved_keys = [
        'project_id' => '_project_id',
        'record_id' => '_record_id',
        'message' => 'description',
        'status' => 'status',
        'MRN' => 'MRN',
        'irb_number' => 'irb_number',
    ]; // list of reserved keys and key to use as sobstitute
    private static $reserved_keys_prefix = '_'; // prefix to use in front of reserved keys

    const STATUS_INFO = 'info';
    const STATUS_SUCCESS = 'success';
    const STATUS_WARNING = 'warning';
    const STATUS_ERROR = 'error';

    const STATUS_LIST = [
        self::STATUS_INFO,
        self::STATUS_SUCCESS,
        self::STATUS_WARNING,
        self::STATUS_ERROR,
    ]; // list of available status

     //fields to get from database 
    private static $DB_fields = ['log_id', 'timestamp', 'user', 'ip',
        '_project_id AS project_id', '_record_id AS record',
        'message', 'status', 'description', 'MRN', 'irb_number'];


    public function __construct($module)
    {
        $this->module = $module;
    }

    /**
     * save the log using the module log function
     * the parameters keys are transformed to a safe version before logging
     *
     * @param EpicParticipantUpdater $module
     * @return void
     */
    public function log($message, $parameters)
    {
        $safe_parameters = [];
        foreach($parameters as $key => $value)
        {
            if(array_key_exists($key, self::$reserved_keys))
            {
                $safe_key = self::$reserved_keys[$key];
                $safe_parameters[$safe_key] = $value;
            }
        }
        $this->module->log($message, $safe_parameters);
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
	public static function getList($module, $page, $limit)
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
     * dump the current request in a log file
     *
     * @return void
     */
    public static function dumpRequest()
    {

        $request_log = self::getRequestLog();
        $log_directory_path = join(DIRECTORY_SEPARATOR, array(EDOC_PATH,'EPU'));
        if (!file_exists($log_directory_path)) {
            mkdir($log_directory_path, 0777, true);
        }

        $now = self::getMicroDate('Y-m-d_H-i-s-u');
        $path = join(DIRECTORY_SEPARATOR, array($log_directory_path,"EPU_request_{$now}.log"));
        try {
            $fp = fopen($path, 'c');
            fwrite($fp, $request_log);
            fclose($fp);
        } catch (\Throwable $th) {
            error_log('Epic participant updater - LogModel cannot write dump file');
        }
    }

    public static function getRequestLog()
    {
        $request_log = '';
        $requests = array(
            'METHOD' => $_SERVER['REQUEST_METHOD'],
            'php://input' => file_get_contents("php://input"),
            '$_POST' => $_POST,
            '$_GET' => $_GET,
            '$_FILES' => $_FILES,
            '$_SERVER' => $_SERVER,
        );
        foreach ($requests as $type => $request) {
            if(empty($request)) continue; //do not print empty values
            if(is_array($request))
            {
                $request_log .= "{$type}:\n\n";
                foreach ($request as $key => $value) {
                    if(is_array($value)) $value = print_r($value, true);
                    $request_log .= "\t\t{$key}: {$value}\n\n";
                }
            }else
            {
                $request_log .= "{$type}: {$request}\n\n";
            }
        }
        return $request_log;
    }

    private static function getMicroDate($format="Y-m-d H:i:s.u")
    {
        $t = microtime(true);
        $micro = sprintf("%06d",($t - floor($t)) * 1000000);
        $d = new \DateTime( date('Y-m-d H:i:s.'.$micro, $t) );

        return $d->format($format); // note at point on "u"
    }

    
}