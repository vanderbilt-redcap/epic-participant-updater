<?php
/**
 * copy this file to "config.php" and fill in the values.
 */
return array(
	'base_URL' => '/base_project', //no need to change this unless you change the directory name of the project
	// db params:
    'mysql_connection' => array(
        'dbname' => 'my_database',
        'user' => 'root',
        'password' => 'root',
        'host' => 'localhost',
    ),
    'log_file_path' => MODULE_ROOT . DIRECTORY_SEPARATOR . 'log.txt',
);
 ?>