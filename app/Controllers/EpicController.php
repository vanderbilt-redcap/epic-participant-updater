<?php namespace Vanderbilt\EpicParticipantUpdater\App\Controllers;

use Vanderbilt\EpicParticipantUpdater\EpicParticipantUpdater;
use Vanderbilt\EpicParticipantUpdater\App\Models\EpicModel;
use Vanderbilt\EpicParticipantUpdater\App\Models\Logger;
use Vanderbilt\EpicParticipantUpdater\App\Services\LogArchiveService;
use Vanderbilt\EpicParticipantUpdater\App\Services\LogArchiveFile;

/** Handles module API requests, including verified archive downloads and administrator actions. */
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
        try {
            $archives = (new LogArchiveService($this->module))->getArchiveList();
        } catch (\Throwable $error) {
            $this->printJSON(['error' => true, 'message' => 'Unable to load log archives. Contact your REDCap administrator.'], 500);
        }
        foreach($archives as &$archive)
        {
            $archive['archive_download_url'] = $this->getLogArchiveDownloadUrl($archive['month'], 'archive');
            $archive['manifest_download_url'] = $this->getLogArchiveDownloadUrl($archive['month'], 'manifest');
        }
        unset($archive);

        $this->printJSON([
            'data' => $archives,
            'metadata' => [
                'total' => count($archives),
            ],
        ]);
    }

    /**
     * Verify an indexed archive file before sending headers, then stream its owned snapshot unchanged.
     *
     * @param string $month
     * @param string $fileType
     * @return void
     */
    public function downloadLogArchive($month, $fileType)
    {
        $file = null;
        $handle = null;
        $started = false;
        // Allow the disconnect check to unwind through finally and remove the private snapshot.
        $ignoreUserAbort = ignore_user_abort(true);
        $displayErrors = ini_get('display_errors');
        ini_set('display_errors', '0');
        try {
            $file = (new LogArchiveService($this->module))->getArchiveFile($month, $fileType);
            $filename = $this->sanitizeDownloadFilename($file->getFilename());
            $size = $file->getSize();
            $handle = @fopen($file->getPath(), 'rb');
            if (!$handle) throw new \RuntimeException('Could not open verified archive for delivery.');
            if (headers_sent()) throw new \RuntimeException('Archive response headers have already been sent.');

            // REDCap page buffers and compression must not prepend HTML or change the advertised attachment length.
            while (ob_get_level() > 0) {
                if (!@ob_end_clean()) throw new \RuntimeException('Could not clear the archive response buffer.');
            }
            ini_set('zlib.output_compression', '0');
            if (function_exists('apache_setenv')) apache_setenv('no-gzip', '1');
            if (session_status() === PHP_SESSION_ACTIVE) session_write_close();
            header_remove('Content-Encoding');

            header('Content-Type: ' . ($fileType === 'archive' ? 'application/zip' : 'application/json'));
            header('Content-Disposition: attachment; filename="' . $filename . '"');
            header('Content-Length: ' . $size);
            header('Cache-Control: private, no-store, no-transform');
            header('X-Content-Type-Options: nosniff');
            $started = true;
            $sent = 0;
            while (!feof($handle)) {
                $chunk = fread($handle, LogArchiveFile::IO_BYTES);
                if ($chunk === false || ($chunk === '' && !feof($handle))) throw new \RuntimeException('Archive delivery was interrupted.');
                echo $chunk;
                $sent += strlen($chunk);
                if (connection_aborted()) throw new \RuntimeException('Archive download connection was closed.');
            }
            if ($sent !== $size) throw new \RuntimeException('Archive delivery was incomplete.');
        } catch(\Throwable $exception) {
            $safeMonth = preg_match('/^\d{4}-\d{2}$/D', (string)$month) ? $month : 'invalid';
            error_log('EPU archive download failed: month=' . $safeMonth . ' stage=' . ($started ? 'delivery' : 'verification') . ' exception=' . get_class($exception));
            // Once binary output starts, preserve the incomplete transfer; never append a JSON error to it.
            if (!$started && !headers_sent()) {
                while (ob_get_level() > 0 && @ob_end_clean()) {}
                header_remove('Content-Disposition');
                header_remove('Content-Length');
                http_response_code($this->getExceptionStatusCode($exception, 500));
                header('Content-Type: application/json');
                header('Cache-Control: private, no-store');
                echo json_encode(['error' => true, 'message' => 'Unable to download this archive. Contact your REDCap administrator with the archive month.']);
            }
        } finally {
            if (is_resource($handle)) fclose($handle);
            if ($file) $file->close();
            ini_set('display_errors', $displayErrors);
            ignore_user_abort((bool)$ignoreUserAbort);
        }
        exit;
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
