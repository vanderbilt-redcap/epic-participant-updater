<?php
namespace Vanderbilt\EpicParticipantUpdater;

$page = new \HtmlPage();
$page->PrintHeaderExt();

include APP_PATH_VIEWS . 'HomeTabs.php';

?>
  <link rel="stylesheet" type="text/css" href="<?= $module->getUrl('./assets/css/style.css'); ?>">
  <h3>Check the <strong>MRN</strong> (Medical Record Number) and the <strong>study status</strong>.</h3>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis praesentium unde, eveniet dolores nobis ducimus omnis earum mollitia, vero eligendi doloribus quas. Iure neque totam ex quaerat vero distinctio numquam.</p>
  <hr>
  <h3 style="text-align: center;text-transform:uppercase;">
    <a style="font-size:20px;" href="<?= $module->getUrl('test.php'); ?>">go to the test page</a>
  </h3>
<?php

$page->PrintFooterExt();

