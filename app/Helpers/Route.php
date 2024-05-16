<?php
namespace Vanderbilt\EpicParticipantUpdater\App\Helpers;

/**
 * TODO: maybe complete this later
 */
class Route {

    const GET = 'GET';
    const POST = 'POST';
    const PATCH = 'PATCH';
    const PUT = 'PUT';
    const DELETE = 'DELETE';

        
    private array $methods;
    private string $path;
    private array|string $handler;
    private array $middlewares;

    public function __contruct($methods, $path, $handler, $middlewares) {
        $this->methods = $methods;
        $this->path = $path;
        $this->handler = $handler;
        $this->middlewares = $middlewares;
    }

    
    public static function make($methods, $path, $handler, $middlewares=[]) { return new static($methods, $path, $handler, $middlewares); }
    public static function get($path, $handler, $middlewares) { return static::make(self::GET, $path, $handler, $middlewares); }
    public static function post($path, $handler, $middlewares) { return static::make(self::POST, $path, $handler, $middlewares); }
    public static function patch($path, $handler, $middlewares) { return static::make(self::PATCH, $path, $handler, $middlewares); }
    public static function put($path, $handler, $middlewares) { return static::make(self::PUT, $path, $handler, $middlewares); }
    public static function delete($path, $handler, $middlewares) { return static::make(self::DELETE, $path, $handler, $middlewares); }

    public function handle() {

    }

    public function getMethods() { return $this->methods; }
    public function getPath() { return $this->path; }
    public function getHandler() { return $this->handler; }
    public function getMiddlewares() { return $this->middlewares; }
}