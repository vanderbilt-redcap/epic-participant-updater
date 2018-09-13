<?php
namespace Vanderbilt\EpicParticipantUpdater\App;

require_once __DIR__.'/../vendor/autoload.php';

error_reporting(E_ALL);
/**
 * ORM
 */
define( 'REDBEAN_MODEL_PREFIX', 'App\\Models\\' ); // used by redbean to connect to the model class

// use \RedBeanPHP\R as R;
// $db_params = $config['mysql_connection'];
// R::setup( "mysql:host=${db_params['host']};dbname=${db_params['dbname']}", $db_params['user'], $db_params['password'] );

//do not alter the tables structure in production
if (isset($config['production']) )
    if ($config['production'])
	    R::freeze( TRUE );