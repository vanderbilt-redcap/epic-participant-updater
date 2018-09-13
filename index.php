<?php
require_once join(['vendor','autoload.php'],DIRECTORY_SEPARATOR);

$page = new HtmlPage();
$page->PrintHeaderExt();

// $config = $module->getConfig();

$settings = $module->getProjectSettings();

// include APP_PATH_VIEWS . 'HomeTabs.php';

?>
  <link rel="stylesheet" type="text/css" href="<?= $module->getUrl('./assets/css/style.css'); ?>">
    <h3>Check the <strong>MRN</strong> (Medical Record Number) and the <strong>study status</strong>.</h3>

      <hr>
    <button id="checkButton">check</button>

    <!-- SCRIPTS -->
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <!-- MAIN SCRIPT -->
    <script>
      
    </script>
    <script>const PREFIX = '<?= $module->PREFIX; ?>';</script>
    <script src="<?= $module->getUrl('./assets/js/main.js'); ?>"></script>
<?php

$module->checkXML();

$page->PrintFooterExt();