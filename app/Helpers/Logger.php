<?php
namespace Vanderbilt\EpicParticipantUpdater\App\Helpers;

class Logger
{

    public static function log($file, $data)
    {
        $now = date('m/d/Y h:i:s a', time());
        $mode = 'a'; // a means append at the end and try to create
        $handle = fopen($file, $mode);
        $line = "{$now} - {$data}\r\n";
        fwrite($handle, $line);
        fclose($handle);
    }

}