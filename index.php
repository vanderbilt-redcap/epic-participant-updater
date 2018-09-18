<?php
require_once join(['vendor','autoload.php'],DIRECTORY_SEPARATOR);

if ( isset($_POST['upload']) )
{

  $string = file_get_contents($_FILES['file']['tmp_name']);
  $string1 = <<<XML
<?xml version='1.0'?> 
<document>
 <title>Forty What?</title>
 <from>Joe</from>
 <to>Jane</to>
 <body>
  I know that's the answer -- but what's the question?
 </body>
</document>
XML;

  libxml_use_internal_errors(true);
  $xml=simplexml_load_string($myXMLData); //or simplexml_load_file

  foreach( libxml_get_errors() as $error ) {

      print_r($error);

  }
  libxml_clear_errors();

  var_dump($xml);
  /* $xml_string = $module->readXML('file', $save=false);
  $xml = simplexml_load_string($xml_string);
  var_dump(htmlspecialchars($xml_string));
  var_dump($xml);
  $xml_data = $module->getXMLDataFromString($xml_string);
  var_dump("xml data: ", $xml_data);
  $result = $module->checkXML($xml_data);
  var_dump($result); */
}

$page = new HtmlPage();
$page->PrintHeaderExt();

// $config = $module->getConfig();

$settings = $module->getProjectSettings();

include APP_PATH_VIEWS . 'HomeTabs.php';

?>
  <link rel="stylesheet" type="text/css" href="<?= $module->getUrl('./assets/css/style.css'); ?>">
    <h3>Check the <strong>MRN</strong> (Medical Record Number) and the <strong>study status</strong>.</h3>

    <hr>
    <button id="checkButton">check</button>
    <form action="" method="post" enctype="multipart/form-data">
      <input type="file" name="file">
      <input type="hidden" name="upload" value="1">
      <input type="submit">
    </form>

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


$localPath = __DIR__.'/data/epic_example.xml';
$remotePath = 'https://localhost/redcap/modules/epic_participant_updater_v1.0.0/data/ep"ic_example.xml';
// $module->checkXML(['params' => ['path'=> $localPath]]);

$page->PrintFooterExt();

echo '<pre>';

if ( isset($_GET['sendmail']) )
{
  $msg = 'Email testing is cool locally';
  // mail('nick@scotch.io', 'Test email', $msg);
  $result = mail('francesco.delacqua@gmail.com', 'Test email', $msg);
  var_dump('email sent:', $result);
}

echo '</pre>';
