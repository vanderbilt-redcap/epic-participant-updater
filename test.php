<?php
namespace Vanderbilt\EpicParticipantUpdater;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\File as FileHelper;

$page = new \HtmlPage();
$page->PrintHeaderExt();

include APP_PATH_VIEWS . 'HomeTabs.php';

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
  <link rel="stylesheet" type="text/css" href="<?= $module->getUrl('./assets/css/style.css'); ?>">
  <h3 style="text-align: center;text-transform:uppercase;">
  <a style="font-size:20px;" href="<?= $module->getUrl('index.php'); ?>">go to the module page</a>
  </h3>
  
  <h3 style="text-align: center;text-transform:uppercase;">
  <a style="font-size:20px;" href="<?= $module->getUrl('data/epic_example.xml'); ?>" download="sample.xml">download epic xml file example</a>
  </h3>
  
  <hr>
  
  <h3>File Upload test</h3>
  <form action="" method="post" enctype="multipart/form-data">
  <input type="file" name="file[]" multiple>
  <input type="hidden" name="upload" value="1">
  <input type="submit">
  </form>
  
  <hr>
  <h3>AJAX call test</h3>
  <button id="checkButton">check</button>
  
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
      }, this);
    });
    
    checkButton.addEventListener('epicDataChecked', (e) => {
      console.log(e);
      try {
        const message = e.detail.response.message;
        const projects = e.detail.response.projects.join(',');
        alert(`${message}.\nprojects: ${projects}`);
      } catch (error) {
        alert(error);
      }
    });

  
  }(window.jQuery, window, document));
</script>
<?php

if ( isset($_POST['upload']) )
{
  echo '<pre>';
  upload();
  echo '</pre>';
}

/* if ( isset($_GET['sendmail']) )
{
  $msg = 'Email testing is cool locally';
  // mail('nick@scotch.io', 'Test email', $msg);
  $result = mail('fakee.mail@dummy.org', 'Test email', $msg);
  var_dump('email sent:', $result);
} */

$page->PrintFooterExt();
?>