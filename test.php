<?php
namespace Vanderbilt\EpicParticipantUpdater;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\File as FileHelper;

$page = new \HtmlPage();
$page->PrintHeaderExt();

include APP_PATH_VIEWS . 'HomeTabs.php';


function upload()
{
  global $module;

  $query_params = array(
    'NOAUTH' => '',
    'type' => 'module',
    'prefix' => $module->PREFIX,
    'page' => 'api',
    'action' => '/epic/check'
    // 'token' => '3A4AC0D0622589C429049363426C6AE2',
  );
  $URL = APP_PATH_WEBROOT_FULL.'api/index.php?' . http_build_query($query_params, '', '&');
  /* $action = urldecode(http_build_query(['action' => '/epic/check']));
  $URL = join([$URL, $action],'&'); */
  
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
    curl_setopt($ch, CURLOPT_POST, true); // POST method
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
  <?php include('header.php');?>
  <hr>
  <h3>Test</h3>
  <hr>
  
  <h3 style="text-transform:uppercase;">
  <i class="fas fa-file-download"></i>
  <a style="font-size:20px;" href="<?= $module->getUrl('data/epic_example.xml'); ?>" download="sample.xml">download epic xml file example</a>
  </h3>
  
  <hr>
  
  <h3>File Upload test</h3>
  <p>upload an xml file via form (curl)</p>
  <form action="" method="post" enctype="multipart/form-data">
    <input type="file" name="file[]" multiple>
    <input type="hidden" name="upload" value="1">
    <input type="submit">
  </form>
  <p>upload an xml file via form (API URL in form action)</p>
  <form action="<?=APP_PATH_WEBROOT_FULL;?>api/index.php?type=module&prefix=<?= $module->PREFIX; ?>&page=api&pid=13&action=/epic/check" method="post" enctype="multipart/form-data">
    <input type="file" name="file[]" multiple>
    <input type="hidden" name="upload" value="1">
    <input type="submit">
  </form>
  <?php

    if ( isset($_POST['upload']) )
    {
      echo '<pre>';
      upload();
      echo '</pre>';
    }
  ?>
  <hr>
  <h3>AJAX call test</h3>
  <p>check an xml file at a specific url</p>
  <button id="checkButton">remote check</button>
  <hr>
  <h3>AJAX upload test</h3>
  <p>upload an xml file via ajax</p>
  <input type="file" name="file" id="file" multiple>
  <button id="jq_uploadButton">jQuery ajax upload</button>
  <button id="uploadButton">axios ajax upload</button>
  <button id="sa_uploadButton">superagent ajax upload</button>
  
  <!-- SCRIPTS -->
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/superagent/3.8.3/superagent.min.js"></script>
  <!-- MAIN SCRIPT -->
  <script>
  
  </script>
  <script>
  const PREFIX = '<?= $module->PREFIX; ?>';
  const APP_PATH_WEBROOT_FULL = '<?= preg_replace('/^http(?:s)?:\/\/(.*?)(?:\/)?$/','$1', APP_PATH_WEBROOT_FULL); ?>';
  </script>
  <script src="<?= $module->getUrl('./assets/js/main.js').'&ver='.time(); ?>"></script>
  <script>
  (function($, window, document) {
    const checkButton = document.getElementById('checkButton');
    const remotePath = '<?=APP_PATH_WEBROOT_FULL;?>modules/<?= $module->PREFIX; ?>_<?= $module->VERSION; ?>/data/epic_example.xml';

    const onEpicDataUploaded = function(e) {
      try {
        const message = e.detail.response.message;
        const projects = e.detail.response.projects.join(',');
        alert(`${message}.\nprojects: ${projects}`);
      } catch (error) {
        alert(error);
      }
    };
    
    /* check remote file */

    checkButton.addEventListener('click', function(e){
      e.preventDefault();
      checkEpicData({
        path: remotePath,
      }, this);
    });
    
    checkButton.addEventListener('epicDataChecked', (e) => {
      onEpicDataUploaded(e);
    });

    /* jQuery */

    const jquery_uploadButton = document.getElementById('jq_uploadButton');
    jquery_uploadButton.addEventListener('click', function(e) {
      e.preventDefault();
      const files = document.getElementById('file').files; //get the file from the form
      if(typeof files !== 'undefined')
        jq_ajaxFileUpload(files, uploadButton);
    });

    jquery_uploadButton.addEventListener('epicDataUploaded', (e) => {
      console.log(e);
      onEpicDataUploaded(e);
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
      onEpicDataUploaded(e);
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
      onEpicDataUploaded(e);
    });

  
  }(window.jQuery, window, document));
</script>
<?php

/* if ( isset($_GET['sendmail']) )
{
  $msg = 'Email testing is cool locally';
  // mail('nick@scotch.io', 'Test email', $msg);
  $result = mail('fakee.mail@dummy.org', 'Test email', $msg);
  var_dump('email sent:', $result);
} */

$page->PrintFooterExt();
?>