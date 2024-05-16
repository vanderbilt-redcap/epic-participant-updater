<?php namespace Vanderbilt\EpicParticipantUpdater\App\Middlewares;

use Vanderbilt\EpicParticipantUpdater\App\Models\Logger;

class LogMiddleware implements MiddlewareInterface
{
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

    public function handle() {
        $this->logRequest();
    }

}