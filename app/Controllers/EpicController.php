<?php namespace Vanderbilt\EpicParticipantUpdater\App\Controllers;

use Vanderbilt\EpicParticipantUpdater\EpicParticipantUpdater;
use Vanderbilt\EpicParticipantUpdater\App\Models\EpicModel;
use Vanderbilt\EpicParticipantUpdater\App\Models\Logger;
use Vanderbilt\EpicParticipantUpdater\App\Services\LogArchiveService;

class EpicController extends BaseController
{
    private const LOGS_PARAM_START = '_start';
    private const LOGS_PARAM_LIMIT = '_limit';
    private const LOGS_PARAM_PAGE = '_page';
    private const LOGS_PARAM_PER_PAGE = '_per_page';
    private const LOGS_PARAM_QUERY = 'q';
    private const LOGS_MAX_PER_PAGE = 500;

    /**
     *
     * @var EpicParticipantUpdater
     */
    private $module;

    /**
     *
     * @var EpicModel
     */
    private $app;

    private $defaults = [
        'logs_per_page' => 50,
    ];

    function __construct()
    {
        global $module;
        parent::__construct();
		
        $this->module = $module;
		$this->app = new EpicModel($module);
	}
    
    /*
    * check the XML
    */
	public function check()
	{
        $response = $this->app->check();
        $this->printJSON($response);
    }
    
    /**
     * List logs using normalized pagination and search request parameters.
     *
     * @return void
     */
	public function getLogs()
	{
        $request = $this->getLogRequestParameters();
        $response = Logger::make()->getList($request['start'], $request['limit'], $request['query']);
        $response['metadata'] = array_merge($response['metadata'] ?? [], [
            'page' => $request['page'],
            'perPage' => $request['perPage'],
            'start' => $request['start'],
            'limit' => $request['limit'],
            'query' => $request['query'],
        ]);
        $this->printJSON($response);
    }

    /**
     * List cold-storage archive files available for download.
     *
     * @return void
     */
    public function getLogArchives()
    {
        $archives = (new LogArchiveService($this->module))->getArchiveList();
        foreach($archives as &$archive)
        {
            $archive['archive_download_url'] = $this->getLogArchiveDownloadUrl($archive['month'], 'archive');
            $archive['manifest_download_url'] = $this->getLogArchiveDownloadUrl($archive['month'], 'manifest');
        }

        $this->printJSON([
            'data' => $archives,
            'metadata' => [
                'total' => count($archives),
            ],
        ]);
    }

    /**
     * Download an archive artifact after resolving the edoc from the archive index.
     *
     * @param string $month
     * @param string $fileType
     * @return void
     */
    public function downloadLogArchive($month, $fileType)
    {
        try {
            $file = (new LogArchiveService($this->module))->getArchiveFile($month, $fileType);
            $contents = $file['contents'];
            $filename = $this->sanitizeDownloadFilename($file['filename']);
            $mimeType = $file['mime_type'] ?: 'application/octet-stream';

            header('Content-Type: ' . $mimeType);
            header('Content-Disposition: attachment; filename="' . $filename . '"');
            header('Content-Length: ' . strlen($contents));
            print $contents;
            exit;
        } catch(\Exception $exception) {
            $this->printJSON([
                'error' => true,
                'message' => $exception->getMessage(),
            ], $this->getExceptionStatusCode($exception, 404));
        }
    }

    /**
     * Delete the zip and manifest files for a cold-storage archive month.
     *
     * @param string $month
     * @return void
     */
    public function deleteLogArchive($month)
    {
        try {
            $result = (new LogArchiveService($this->module))->deleteArchiveFiles($month);
            $this->printJSON($result);
        } catch(\Exception $exception) {
            $this->printJSON([
                'error' => true,
                'message' => $exception->getMessage(),
            ], $this->getExceptionStatusCode($exception, 500));
        }
    }

    /**
     * Run the same archive cleanup job used by the scheduled cron.
     *
     * @return void
     */
    public function runLogArchiveCleanup()
    {
        try {
            $result = $this->module->runLogArchiveCleanup();
            $statusCode = ($result['status'] ?? '') === LogArchiveService::STATUS_ERROR ? 500 : 200;
            $this->printJSON([
                'message' => $this->module->getLogArchiveCleanupMessage($result),
                'result' => $this->sanitizeLogArchiveRunResult($result),
            ], $statusCode);
        } catch(\Throwable $throwable) {
            $this->printJSON([
                'error' => true,
                'message' => $throwable->getMessage(),
            ], $this->getExceptionStatusCode($throwable, 500));
        }
    }

    /**
     * Normalize logs request input while preserving the current offset-based API.
     *
     * @return array
     */
    private function getLogRequestParameters()
    {
        $defaultPerPage = intval($this->defaults['logs_per_page']);
        $rawLimit = $this->getIntegerRequestParameter(self::LOGS_PARAM_LIMIT, $defaultPerPage);
        $page = $this->getIntegerRequestParameter(self::LOGS_PARAM_PAGE, null);
        $query = substr(trim((string)($_GET[self::LOGS_PARAM_QUERY] ?? '')), 0, 255);

        if($page !== null)
        {
            $perPage = $this->getIntegerRequestParameter(self::LOGS_PARAM_PER_PAGE, $rawLimit);
            $perPage = $this->clampLogsPerPage($perPage, $defaultPerPage);
            $page = max(1, $page);

            return [
                'page' => $page,
                'perPage' => $perPage,
                'start' => ($page - 1) * $perPage,
                'limit' => $perPage,
                'query' => $query,
            ];
        }

        $start = max(0, $this->getIntegerRequestParameter(self::LOGS_PARAM_START, 0));
        $limit = $this->normalizeLogsLimit($rawLimit, $defaultPerPage);

        return [
            'page' => $limit > 0 ? intval(floor($start / $limit)) + 1 : 1,
            'perPage' => $limit,
            'start' => $start,
            'limit' => $limit,
            'query' => $query,
        ];
    }

    /**
     * Read an integer query parameter with an explicit fallback.
     *
     * @param string $key
     * @param integer|null $default
     * @return integer|null
     */
    private function getIntegerRequestParameter($key, $default)
    {
        if(!isset($_GET[$key]) || $_GET[$key] === '')
        {
            return $default;
        }

        return intval($_GET[$key]);
    }

    /**
     * Normalize page size values for regular paged requests.
     *
     * @param integer $perPage
     * @param integer $defaultPerPage
     * @return integer
     */
    private function clampLogsPerPage($perPage, $defaultPerPage)
    {
        if($perPage < 1)
        {
            return $defaultPerPage;
        }

        return min($perPage, self::LOGS_MAX_PER_PAGE);
    }

    /**
     * Normalize offset API limits, including the legacy unpaged `-1` value.
     *
     * @param integer $limit
     * @param integer $defaultPerPage
     * @return integer
     */
    private function normalizeLogsLimit($limit, $defaultPerPage)
    {
        if($limit === -1)
        {
            return -1;
        }

        return $this->clampLogsPerPage($limit, $defaultPerPage);
    }

    /**
     * Build the authenticated REDCap API URL for an indexed archive artifact.
     *
     * @param string $month
     * @param string $fileType
     * @return string
     */
    private function getLogArchiveDownloadUrl($month, $fileType)
    {
        return APP_PATH_WEBROOT_FULL . 'api/?' . http_build_query([
            'type' => 'module',
            'page' => 'api',
            'prefix' => $this->module->PREFIX,
            'route' => "archives/{$month}/{$fileType}",
        ]);
    }

    /**
     * Strip unsafe characters from a browser download filename.
     *
     * @param string $filename
     * @return string
     */
    private function sanitizeDownloadFilename($filename)
    {
        $filename = basename(str_replace(["\r", "\n"], '', (string)$filename));
        $filename = preg_replace('/[^A-Za-z0-9._-]/', '_', $filename);
        return $filename ?: 'log_archive.bin';
    }

    /**
     * Return archive cleanup result fields that are safe for the browser.
     *
     * @param array $result
     * @return array
     */
    private function sanitizeLogArchiveRunResult($result)
    {
        return [
            'status' => $result['status'] ?? '',
            'month' => $result['month'] ?? '',
            'deleted_count' => intval($result['deleted_count'] ?? 0),
            'row_count' => intval($result['archive']['row_count'] ?? 0),
            'message' => $result['message'] ?? '',
        ];
    }

    /**
     * Normalize thrown exception codes into HTTP status codes.
     *
     * @param \Throwable $exception
     * @param int $default
     * @return int
     */
    private function getExceptionStatusCode($exception, $default)
    {
        $code = intval($exception->getCode());
        return $code >= 400 && $code <= 599 ? $code : $default;
    }
    
    /*
    * list the logs
    * @todo add pagination
    */
	public function getSettings()
	{
        try {
            $code = 200;

            $app_settings = $this->appSettings();
            $projects = $this->projectsData();
            $api_token_data = $this->apiTokenData();
            $epic_upload_url = $this->module->getEpicUploadURL();

            $response = [
                'app_settings' => $app_settings,
                'projects' => $projects,
                'api_token_data' => $api_token_data,
                'epic_upload_url' => $epic_upload_url,
            ];
        } catch (\Exception $e) {
            $response = [
                'message' => $e->getMessage(),
            ];
            $code = $e->getCode();
        }finally {
            $this->printJSON($response, $code);
        }
    }

    private function projectsData()
    {
        $project_ids = $this->app->getModuleEnabledProjectsIds();
        $data = array_map(function($project_id) {
            return new \Project($project_id);
        }, $project_ids);
        return $data;
    }

    public function regenerateAPIToken()
    {
        $this->module->generateAPIToken();
        $token_data = $this->apiTokenData();
        $this->printJSON($token_data);
    }

    private function appSettings()
    {
        // get the base URL to the module (for downloads)
        $getModuleUrl = function() {
            return strtok($this->module->getUrl(''), '?');
        };
        $removeExtraSlashes = function($url) {
            return preg_replace("/(?<!https:)(?<!http:)\/{2,}/", "/", $url);
        };
        $project_templates = [
            'template for single study' => $this->module->getUrl('data/EPU_single.xml'),
            'template for multiple studies' => $this->module->getUrl('data/EPU_multiple.xml'),
        ];
        $data = [
            'module_version' => $this->module->VERSION,
            'module_prefix' => $this->module->PREFIX,
            'module_url' => $getModuleUrl(),
            'redcap_root_url' => APP_PATH_WEBROOT_FULL,
            'redcap_relative_url' => APP_PATH_WEBROOT,
            'redcap_full_url' => $removeExtraSlashes(APP_PATH_WEBROOT_FULL.APP_PATH_WEBROOT),
            'project_templates' => $project_templates,
        ];
        return $data;
    }

    private function apiTokenData()
    {
        $module_prefix = $this->module->PREFIX;
        $api_token = $this->module->getApiToken();
        $listening_url_base = sprintf("%sapi/?NOAUTH&prefix=%s&type=module&page=api&route=check",APP_PATH_WEBROOT_FULL, $module_prefix);
        $listening_url = $listening_url_base;
        $data = [
            'api_token' => $api_token,
            'listening_url_base' => $listening_url_base,
            'listening_url' => $listening_url,
        ];
        return $data;
    }

}
