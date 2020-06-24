<?php
namespace Vanderbilt\EpicParticipantUpdater\App;

use Vanderbilt\EpicParticipantUpdater\App\Controllers\BaseController;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\Router;
use Vanderbilt\EpicParticipantUpdater\App\Models\Logger;

require_once __DIR__."/bootstrap.php";

// httpMethod, route, handler
$routes = [
    [['POST','PUT'], "check", ['Vanderbilt\EpicParticipantUpdater\App\Controllers\EpicController/check', Router::API_TOKEN_PROTECTED]],
    ['GET', "logs", ['Vanderbilt\EpicParticipantUpdater\App\Controllers\EpicController/getLogs']],
    ['GET', "projects", ['Vanderbilt\EpicParticipantUpdater\App\Controllers\EpicController/getProjects']],
    ['GET', "/test[/{id:\d+}]", ['Vanderbilt\EpicParticipantUpdater\App\Controllers\BaseController/test']],
    ['POST', "regenerate_token", ['Vanderbilt\EpicParticipantUpdater\App\Controllers\EpicController/regenerateAPIToken', Router::REDCAP_USER_PROTECTED]],
];

// create a BaseController to manage common routes or errors
$baseController = new BaseController();

$router = new Router($routes, $baseController);

$route = Router::extractRoute('route');


/**
 * temporary verbose logging
 * log the current request
 *
 * @return void
 */
function logRequest()
{
    global $module; //$module is exposed globally

    $request_log = Logger::getRequestLog();
    $message = 'API';
    $parameters = array(
        'status' => 'info',
        'description' => $request_log,
    );
    $logger = new Logger($module);
    $logger->log($message, $parameters);
}

$is_API_Page = preg_match('/^api$/i', $_GET['page'], $matches); // do not log other pages access
$no_log_routes = array('logs','projects'); // do not log these routes
$skip_route = in_array($route, $no_log_routes);

if($is_API_Page && !$skip_route) logRequest();
/** end of temporary verbose logging */

$router->dispatch($route);