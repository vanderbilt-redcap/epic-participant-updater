<?php
namespace Vanderbilt\EpicParticipantUpdater;

require_once join(['vendor','autoload.php'],DIRECTORY_SEPARATOR);

use Vanderbilt\EpicParticipantUpdater\App\Helpers\File as FileHelper;

function upload()
{
  $upload_url = 'https://redcap.test/api/?type=module&prefix=epic_participant_updater&page=api&action=/epic/check';
  $files = FileHelper::getFormFiles();
  /*   $file = array_walk($_FILES['file'], function($array, $key) use ($file) {
    $file[$key] = is_array($value) array_shift($value);
  }); */
  $file_data = array();
  foreach($files as $key => $file)
  {
    $file_data[$key] = new \CurlFile($file["tmp_name"], $file["type"], $file["name"]);
  }
  $data = array(
    'token' => '638C010A48EEC4D99195231CDA11BD95',
    'content' => 'project',
    'format' => 'json',
    'returnFormat' => 'json'
  );
  
  $post = array_merge($file_data, $data);

  try {
    $ch = curl_init();
    // curl_setopt($ch, CURLOPT_URL, 'https://redcap.test/api/');
    // curl_setopt($ch, CURLOPT_URL, 'https://redcap.test/modules/epic_participant_updater_v1.0.0/upload.php');
    curl_setopt($ch, CURLOPT_URL, $upload_url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); // ignore error for self signed certificate
    curl_setopt($ch, CURLOPT_VERBOSE, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_AUTOREFERER, true);
    curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
    curl_setopt($ch, CURLOPT_FRESH_CONNECT, 1);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
    $output = curl_exec($ch);
    print $output;

  } catch(Exception $e) {

      trigger_error(sprintf(
          'Curl failed with error #%d: %s',
          $e->getCode(), $e->getMessage()),
          E_USER_ERROR);

  }

  $info = curl_getinfo($ch);
  curl_close($ch);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="<?= $module->getUrl('./assets/css/style.css'); ?>">
    <title>Upload Test</title>
</head>
<body>

    <h3>Check the <strong>MRN</strong> (Medical Record Number) and the <strong>study status</strong>.</h3>
    <h3>File Upload test</h3>
    <form action="" method="post" enctype="multipart/form-data">
        <input type="file" name="file[]" multiple>
        <input type="hidden" name="upload" value="1">
        <input type="submit">
    </form>

    <hr>
    <h3>AJAX call test</h3>
    <button id="checkButton">check</button>
    <hr>
    <a href="<?= $module->getUrl('index.php'); ?>">go to the home page</a>

    <!-- SCRIPTS -->
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <!-- MAIN SCRIPT -->
    <script>
      
    </script>
    <script>const PREFIX = '<?= $module->PREFIX; ?>';</script>
    <script src="<?= $module->getUrl('./assets/js/main.js').'&ver='.time(); ?>"></script>
    <script>
    (function($, window, document) {
      const checkButton = document.getElementById('checkButton');
      const localPath = '<?=__DIR__.'/data/epic_example.xml'?>';
      const remotePath = 'https://localhost/redcap/modules/epic_participant_updater_v1.0.0/data/epic_example.xml';

      checkButton.addEventListener('click', function(e){
          e.preventDefault();
          checkEpicData({
            path: remotePath,
          });
      });
    }(window.jQuery, window, document));
    </script>
    <?php
    echo '<pre>';

    if ( isset($_POST['upload']) )
    {
      upload();
    }

    if ( isset($_GET['sendmail']) )
    {
      $msg = 'Email testing is cool locally';
      // mail('nick@scotch.io', 'Test email', $msg);
      $result = mail('fakee.mail@dummy.org', 'Test email', $msg);
      var_dump('email sent:', $result);
    }

    echo '</pre>';
    ?>
</body>
</html>