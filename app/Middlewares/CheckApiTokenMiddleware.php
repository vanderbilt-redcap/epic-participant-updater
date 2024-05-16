<?php namespace Vanderbilt\EpicParticipantUpdater\App\Middlewares;


class CheckApiTokenMiddleware implements MiddlewareInterface
{
    // Method to extract the bearer token from the Authorization header
    private function getBearerToken() {
        $headers = null;
    
        // Get all headers
        if (isset($_SERVER['Authorization'])) {
            $headers = trim($_SERVER["Authorization"]);
        } elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) { // Nginx or fast CGI
            $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            // Server-side fix for bug in old versions of PHP
            if (isset($requestHeaders['Authorization'])) {
                $headers = trim($requestHeaders['Authorization']);
            }
        }
    
        // Get the token from the header
        if (!empty($headers)) {
            if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
                return $matches[1];
            }
        }
    
        return null;
    }
    

    private function getRequestoken() {
        return $_REQUEST['api_token'] ?? null;
    }
    
    public function handle() {
        global $module;

        $api_token = $module->getApiToken();
        // disable control if the API token is not set
        if(empty($api_token)) return;

        // Get the submitted API token from either the header or request parameters
        $submittedApiToken = $this->getBearerToken() ?? $this->getRequestoken();

        // Ensure an API token is provided
        if (empty($submittedApiToken)) {
            throw new \Exception("An API token must be provided", 401);
        }

        // Validate the provided API token
        if ($api_token != $submittedApiToken) {
            throw new \Exception("Invalid API token", 401);
        }
    }
}