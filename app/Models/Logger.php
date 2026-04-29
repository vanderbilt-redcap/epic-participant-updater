<?php namespace Vanderbilt\EpicParticipantUpdater\App\Models;

use Vanderbilt\EpicParticipantUpdater\EpicParticipantUpdater;

class Logger {
    private const SEARCHABLE_FIELDS = [
        'log_id',
        'timestamp',
        'username',
        'ip',
        '_project_id',
        '_record_id',
        'message',
        'status',
        'description',
        'MRN',
        'study_id',
        'event_id',
        'epic_status',
        'save_action',
        'save_error_count',
        'save_item_count',
        'save_errors',
    ];

    /**
     *
     * @var EpicParticipantUpdater
     */
    private $module;

    /**
     *
     * @var Logger
     */
    private static $instance;

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
    private static $DB_fields = [
        'log_id',
        'timestamp',
        'username AS user',
        'ip',
        '_project_id AS project_id',
        '_record_id AS record',
        'message',
        'status',
        'description',
        'MRN',
        'study_id',
        'event_id',
        'epic_status',
        'save_action',
        'save_error_count',
        'save_item_count',
        'save_errors',
    ];


    public function __construct($module)
    {
        $this->module = $module;
    }

    /**
     * Undocumented function
     *
     * @return Logger
     */
    public static function make() {
        if (!self::$instance) {
            $module = EpicParticipantUpdater::getInstance();
            self::$instance = new self($module);
        }
        return self::$instance;
    }

    /**
     * save the log using the module log function
     * the parameters keys are transformed to a safe version before logging
     *
     * @param string $message
     * @param array $parameters
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
            }else
            {
                $safe_parameters[$key] = $value;
            }
        }
        $this->module->log($message, $safe_parameters);
    }

    /**
     * List logs using server-side pagination and a global text filter.
     *
     * Set $limit to -1 to skip pagination for legacy callers.
     *
     * @param int $start
     * @param int $limit
     * @param string $query
     * @return array
     */
	public function getList($start, $limit, $query = '')
	{
        $parameters = [];
        $whereClause = $this->getSearchWhereClause($query, $parameters);

		$query_string = "SELECT ".implode(',',self::$DB_fields);
        if($whereClause !== '') $query_string .= " WHERE {$whereClause}";
        $query_string .= " ORDER BY timestamp DESC";
		if($limit>0) $query_string .= " LIMIT {$start}, {$limit}";
		$result = $this->module->queryLogs($query_string, $parameters);
		$logs = [];
		while($row = db_fetch_object($result)){
			$logs[] = $row;
        }

        return array(
            'data' => $logs,
            'metadata' => array(
                'total' => $this->getTotalCount($query),
                'page' => $limit > 0 ? intval(floor($start / $limit)) + 1 : 1,
                'perPage' => $limit,
                'start' => $start,
                'limit' => $limit,
                'query' => $query,
            ),
        );
    }


    /**
     * Get the total count of results after applying the active filter.
     *
     * @param string $query
     * @return integer
     */
    private function getTotalCount($query = '')
    {
        $parameters = [];
        $whereClause = $this->getSearchWhereClause($query, $parameters);
        $query_string = "SELECT COUNT(*) AS total";
        if($whereClause !== '') $query_string .= " WHERE {$whereClause}";
        $result = $this->module->queryLogs($query_string, $parameters);
        if($result && $row=db_fetch_assoc($result))
        {

            return intval($row['total']);
        }
        return 0;
    }

    /**
     * Build the global search clause shared by the list and count queries.
     *
     * @param string $query
     * @param array $parameters
     * @return string
     */
    private function getSearchWhereClause($query, &$parameters)
    {
        $query = trim((string)$query);
        if($query === '') return '';

        $likeValue = '%' . $query . '%';
        $clauses = [];

        foreach(self::SEARCHABLE_FIELDS as $field)
        {
            $clauses[] = "{$field} LIKE ?";
            $parameters[] = $likeValue;
        }

        return '(' . implode(' OR ', $clauses) . ')';
    }

    public static function printArray($array) {
        $result = '';
        foreach ($array as $key => $value) {
            $result .= "{$key} = {$value}\n";
        }
        return $result;
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
        } catch (\Exception $th) {
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
