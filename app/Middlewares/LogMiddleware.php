<?php namespace Vanderbilt\EpicParticipantUpdater\App\Middlewares;

use Vanderbilt\EpicParticipantUpdater\App\Models\Logger;

class LogMiddleware implements MiddlewareInterface
{
    function logRequest()
    {
        $request_log = Logger::getRequestLog();
        $message = 'API';
        $parameters = array(
            'status' => Logger::STATUS_INFO,
            'description' => $request_log,
        );
        Logger::make()->log($message, $parameters);
    }

    public function handle() {
        $this->logRequest();
    }

}