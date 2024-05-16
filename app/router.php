<?php
namespace Vanderbilt\EpicParticipantUpdater\App;

use Vanderbilt\EpicParticipantUpdater\App\Controllers\BaseController;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\Router;
use Vanderbilt\EpicParticipantUpdater\App\Middlewares\CheckApiTokenMiddleware;
use Vanderbilt\EpicParticipantUpdater\App\Middlewares\CheckRedcapUserMiddleware;
use Vanderbilt\EpicParticipantUpdater\App\Middlewares\LogMiddleware;
use Vanderbilt\EpicParticipantUpdater\App\Models\Logger;

require_once __DIR__."/bootstrap.php";


// httpMethod, route, handler
$routes = [
    [['POST','PUT'], "check", ['Vanderbilt\EpicParticipantUpdater\App\Controllers\EpicController/check', [new LogMiddleware(), new CheckApiTokenMiddleware()]]],
    ['GET', "logs", ['Vanderbilt\EpicParticipantUpdater\App\Controllers\EpicController/getLogs']],
    ['GET', "settings", ['Vanderbilt\EpicParticipantUpdater\App\Controllers\EpicController/getSettings']],
    ['GET', "/test[/{id:\d+}]", ['Vanderbilt\EpicParticipantUpdater\App\Controllers\BaseController/test', [new LogMiddleware()]]],
    ['POST', "regenerate_token", ['Vanderbilt\EpicParticipantUpdater\App\Controllers\EpicController/regenerateAPIToken', [new LogMiddleware(), new CheckRedcapUserMiddleware()]]],
];

// create a BaseController to manage common routes or errors
$baseController = new BaseController();

$router = new Router($routes, $baseController);

$route = Router::extractRoute('route');

// $is_API_Page = preg_match('/^api$/i', $_GET['page'], $matches); // do not log other pages access

$router->dispatch($route);