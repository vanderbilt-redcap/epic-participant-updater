<?php
namespace Vanderbilt\EpicParticipantUpdater;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\File as FileHelper;

$page = new \HtmlPage();
$page->PrintHeaderExt();

include APP_PATH_VIEWS . 'HomeTabs.php';

function upload()
{
  $query_params = array(
    'type' => 'module',
    'prefix' => 'epic_participant_updater',
    'pid' => '13',
    'page' => 'api',
    'action' => '/epic/check',
    // 'token' => '3A4AC0D0622589C429049363426C6AE2',
  );
  $URL = 'https://redcap.test/api/?' . http_build_query($query_params, '', '&');
  
  
  $files = FileHelper::getFormFiles();
  $file_data = array();
  foreach($files as $key => $file)
  {
    $file_data[$key] = new \CurlFile($file["tmp_name"], $file["type"], $file["name"]);
  }
  
  $extra_params = array(
    'format' => 'json',
    'returnFormat' => 'json'
  );
  
  $data = array_merge($file_data, $extra_params);
  
  try {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $URL);
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
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
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
  <p>upload an xml file via form</p>
  <form action="" method="post" enctype="multipart/form-data">
    <input type="file" name="file[]" multiple>
    <input type="hidden" name="upload" value="1">
    <input type="submit">
  </form>
  <form action="/api/?type=module&prefix=epic_participant_updater&page=api&pid=13&action=/epic/check" method="post" enctype="multipart/form-data">
    <input type="file" name="file[]" multiple>
    <input type="hidden" name="upload" value="1">
    <input type="submit">
  </form>
  
  <hr>
  <h3>AJAX call test</h3>
  <p>check an xml file at a specific url</p>
  <button id="checkButton">remote check</button>
  <hr>
  <h3>AJAX upload test</h3>
  <p>upload an xml file via ajax</p>
  <input type="file" name="file" id="file" multiple>
  <button id="uploadButton">axios ajax upload</button>
  <button id="sa_uploadButton">superagent ajax upload</button>
  
  <!-- SCRIPTS -->
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/superagent/3.8.3/superagent.min.js"></script>
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

    /* axios */

    const uploadButton = document.getElementById('uploadButton');
    uploadButton.addEventListener('click', function(e) {
      e.preventDefault();
      const files = document.getElementById('file').files; //get the file from the form
      if(typeof files !== 'undefined')
        axios_ajaxFileUpload(files, uploadButton);
    });

    uploadButton.addEventListener('epicDataUploaded', (e) => {
      console.log(e);
      try {
        const message = e.detail.response.message;
        const projects = e.detail.response.projects.join(',');
        alert(`${message}.\nprojects: ${projects}`);
      } catch (error) {
        alert(error);
      }
    });

    /* superagent */

    const sa_uploadButton = document.getElementById('sa_uploadButton');
    sa_uploadButton.addEventListener('click', function(e) {
      e.preventDefault();
      const files = document.getElementById('file').files; //get the file from the form
      if(typeof files !== 'undefined')
        sa_ajaxFileUpload(files, uploadButton);
    });

    sa_uploadButton.addEventListener('epicDataUploaded', (e) => {
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