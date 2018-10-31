<?php
namespace Vanderbilt\EpicParticipantUpdater\App;

use Vanderbilt\EpicParticipantUpdater\App\Controllers\BaseController;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\Router;

require_once __DIR__."/bootstrap.php";

// httpMethod, route, handler
$routes = [
    [['POST','PUT'], "/epic/check", 'Vanderbilt\EpicParticipantUpdater\App\Controllers\EpicController/check'],
    ['GET', "/epic/logs", 'Vanderbilt\EpicParticipantUpdater\App\Controllers\EpicController/getLogs'],
    ['GET', "/test", 'Vanderbilt\EpicParticipantUpdater\App\Controllers\BaseController/test'],
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
     * {APP_PATH_WEBROOT_FULL}/api?type=module&prefix={PREFIX}&page=api&action=/route_name
     **/
    $route = Router::extractRoute('action');
}

$router->dispatch($route);