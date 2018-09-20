<?php

$page = new \HtmlPage();
$page->PrintHeaderExt();

// $config = $module->getConfig();

$settings = $module->getProjectSettings();

include APP_PATH_VIEWS . 'HomeTabs.php';

?>
  <link rel="stylesheet" type="text/css" href="<?= $module->getUrl('./assets/css/style.css'); ?>">
  <h3>Check the <strong>MRN</strong> (Medical Record Number) and the <strong>study status</strong>.</h3>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis praesentium unde, eveniet dolores nobis ducimus omnis earum mollitia, vero eligendi doloribus quas. Iure neque totam ex quaerat vero distinctio numquam.</p>
  <a href="<?= $module->getUrl('test.php'); ?>">go to the test page</a>
<?php

$page->PrintFooterExt();

