<?php namespace Vanderbilt\EpicParticipantUpdater\App\Middlewares;

use Authentication;


class CheckRedcapUserMiddleware implements MiddlewareInterface
{
    public function handle() {
        return Authentication::authenticate();
    }

}