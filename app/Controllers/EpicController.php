<?php namespace Vanderbilt\EpicParticipantUpdater\App\Controllers;

use Vanderbilt\EpicParticipantUpdater\EpicParticipantUpdater;
use Vanderbilt\EpicParticipantUpdater\App\Models\EpicModel;
use Vanderbilt\EpicParticipantUpdater\App\Models\Logger;

class EpicController extends BaseController
{
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
    
    /*
    * list the logs
    * @todo add pagination
    */
	public function getLogs()
	{
        $start = $_GET['_start'] ?: 0;
        $limit = $_GET['_limit'] ?: $this->defaults['logs_per_page'];
        $logger = new Logger($this->module);
        $response = $logger->getList($start, $limit);
        $this->printJSON($response);
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
        $listening_url_base = sprintf("%sapi/?NOAUTH&prefix=%s&type=module&page=api&route=check&api_token=",APP_PATH_WEBROOT_FULL, $module_prefix);
        $listening_url = $listening_url_base.$api_token;
        $data = [
            'api_token' => $api_token,
            'listening_url_base' => $listening_url_base,
            'listening_url' => $listening_url,
        ];
        return $data;
    }

}