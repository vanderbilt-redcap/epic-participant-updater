<?php
namespace Vanderbilt\EpicParticipantUpdater\App\Helpers;

class Tester
{

    const REDCAP_URL = 'https://redcap.test/api/index.php';

    public $url = '';

    /**
     * Undocumented function
     *
     * @param string $base_url
     * @param string $module_prefix
     * @param string $api_token
     * @param string $csrf_token
     */
    public function __construct($base_url, $module_prefix, $api_token, $csrf_token)
    {
        $query_params = array(
            'NOAUTH' => '',
            'type' => 'module',
            'prefix' => $module_prefix, //epic_participant_updater
            'page' => 'api',
            'route' => '/epic/check',
            'api_token' =>  $api_token,
            'redcap_csrf_token' => $csrf_token,
        );

        $this->url = $base_url .'?'. http_build_query($query_params, '', '&');
    }

    public function sendXML()
    {
        $file = reset($_FILES); // get first element
        
        $data_string = file_get_contents($file["tmp_name"]);
        
        try {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $this->URL);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); // ignore error for self signed certificate
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($ch, CURLOPT_AUTOREFERER, true);
            curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
            curl_setopt($ch, CURLOPT_FRESH_CONNECT, 1);
            curl_setopt($ch, CURLOPT_HEADER, false);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
            curl_setopt($ch, CURLOPT_HTTPHEADER,     array('Content-Type: text/plain'));
            $output = curl_exec($ch);
            print $output;
        } catch(Exception $e) {
            trigger_error(sprintf(
                'Curl failed with error #%d: %s',
                $e->getCode(), $e->getMessage()),
                E_USER_ERROR);
        }
    }
}