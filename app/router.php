<?php
namespace Vanderbilt\EpicParticipantUpdater\App;

function redcapConnect()
{
    $module_root = dirname(__DIR__);
    $app_root = dirname ( dirname( $module_root ) );
    // Set constant for distinguishing this file from plugins or modules that call redcap_connect.php
    define("REDCAP_CONNECT_NONVERSIONED", true);
    require_once join(array($app_root,'redcap_connect.php'), DIRECTORY_SEPARATOR);
    // require_once join(array($app_root,'redcap_v'.$redcap_version,'Config','init_functions.php'), DIRECTORY_SEPARATOR);
    $redcap_directory = "{$app_root}/redcap_v{$redcap_version}";
}

// redcapConnect();

require_once __DIR__."/bootstrap.php";

/**
 * create a dispatcher and register the routes
 * each route is managed by a controller and one of it's functions.
 */
$dispatcher = \FastRoute\simpleDispatcher(function(\FastRoute\RouteCollector $r) {
    $r->addRoute('GET', "/settings/{pid:\d+}", 'Vanderbilt\EpicParticipantUpdater\App\Controllers\SettingsController/listItems');
    $r->addRoute('POST', "/epic/check", 'Vanderbilt\EpicParticipantUpdater\App\Controllers\EpicController/check');
});


// get current fetch method and URI
$httpMethod = $_SERVER['REQUEST_METHOD'];

$REDCAP_ROUTING = true; //use the redcap generated url
if($REDCAP_ROUTING)
{
    $uri = $_GET['action']; //redcap version
}else{
    // standard version
    $uri = $_SERVER['REQUEST_URI'];
    
    // Strip query string (?foo=bar) and decode URI
    if (false !== $pos = strpos($uri, '?')) {
        $uri = substr($uri, 0, $pos);
    }
}

$uri = rawurldecode($uri);

// dispatch the current route
$routeInfo = $dispatcher->dispatch($httpMethod, $uri);

/* var_dump($routeInfo);
var_dump($uri); */


// create a BaseController to manage common routes or errors
$baseController = new \Vanderbilt\EpicParticipantUpdater\App\Controllers\BaseController();

switch ($routeInfo[0]) {
    case \FastRoute\Dispatcher::NOT_FOUND:
        // ... 404 Not Found
        $baseController->notFound();
        break;
    case \FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        $allowedMethods = $routeInfo[1];
        // ... 405 Method Not Allowed
        $baseController->notAllowed();
        break;
    case \FastRoute\Dispatcher::FOUND:
        $handler = $routeInfo[1];
        $vars = $routeInfo[2];
        // ... call $handler with $vars
        list($class, $method) = explode("/", $handler, 2);
    	call_user_func_array(array(new $class, $method), $vars);
        break;
} 