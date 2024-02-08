<?php
namespace Vanderbilt\EpicParticipantUpdater\App;

$app_root = dirname(__FILE__, 2);
$redcap_root = dirname($app_root, 2);
require_once $app_root . '/vendor/autoload.php';

error_reporting(E_ALL);