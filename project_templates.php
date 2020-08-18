<?php
namespace Vanderbilt\EpicParticipantUpdater;

$page = new \HtmlPage();
$page->PrintHeaderExt();

include APP_PATH_VIEWS . 'HomeTabs.php';
$module_path = $module->getModulePath();
include($module_path.'header.php')
?>


<h5>Project Templates</h5>

<div class="alert alert-light">
  <a href="<?= $module->getUrl('data/EPU_single.xml') ?>" download="EPU_single.xml">
    <i class="fas fa-file-download"></i>
    <span>download template for single study</span>
  </a>
</div>

<div class="alert alert-light">
  <a href="<?= $module->getUrl('data/EPU_multiple.xml') ?>" download="EPU_multiple.xml">
    <i class="fas fa-file-download"></i>
    <span>download template for multiple studies</span>
  </a>
</div>

<style>
.drop-target {
  position: relative;
}
.drop-target.dragover {
  box-shadow: 0 0 3px rgb(201,255,0);
}
.drag-indicator {
  position: absolute;
  left: 50%;
  top: 50%;
  pointer-events: none;
  opacity: 0;
  z-index: 1;
  transition-property: opacity;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
}
.dragover .drag-indicator {
  opacity: 1;
}
</style>
<?php $page->PrintFooterExt();

