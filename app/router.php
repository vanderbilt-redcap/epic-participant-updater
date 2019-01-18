<?php
namespace Vanderbilt\EpicParticipantUpdater\App;

use Vanderbilt\EpicParticipantUpdater\App\Controllers\BaseController;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\Router;
use Vanderbilt\EpicParticipantUpdater\App\Models\LogModel;

require_once __DIR__."/bootstrap.php";

// httpMethod, route, handler
$routes = [
    [['POST','PUT'], "/epic/check", 'Vanderbilt\EpicParticipantUpdater\App\Controllers\EpicController/check'],
    ['GET', "/epic/logs", 'Vanderbilt\EpicParticipantUpdater\App\Controllers\EpicController/getLogs'],
    ['GET', "/epic/projects", 'Vanderbilt\EpicParticipantUpdater\App\Controllers\EpicController/getProjects'],
    ['GET', "/test[/{id:\d+}]", 'Vanderbilt\EpicParticipantUpdater\App\Controllers\BaseController/test'],
];

// create a BaseController to manage common routes or errors
$baseController = new BaseController();

$router = new Router($routes, $baseController);

if(defined("MODULE_DIRECT_ACCESS"))
{
    // standard routing with url rewrite
    $route = Router::extractRoute();
}else{
    /**
     * redcap routing
     * {APP_PATH_WEBROOT_FULL}/api?type=module&prefix={PREFIX}&page=api&route=/route_name
     **/
    $route = Router::extractRoute('route');
}


/**
 * temporary verbose logging
 * log the current request
 *
 * @return void
 */
function logRequest()
{
    global $module; //$module is expose globally
    $request_log = LogModel::getRequestLog();
    $message = 'API';
    $parameters = array(
        'status' => 'info',
        'description' => $request_log,
    );
    $log = new LogModel($message, $parameters);
    $log->save($module);
}

$is_API_Page = preg_match('/^api$/i', $_GET['page'], $matches); // do not log other pages access
$no_log_routes = array('/epic/logs','/epic/projects'); // do not log these routes
$skip_route = in_array($route, $no_log_routes);

if($is_API_Page && !$skip_route) logRequest();
/** end of temporary verbose logging */

$router->dispatch($route);