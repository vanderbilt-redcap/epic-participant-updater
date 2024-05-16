<?php
namespace Vanderbilt\EpicParticipantUpdater;

$page = new \HtmlPage();
$page->PrintHeaderExt();

include APP_PATH_VIEWS . 'HomeTabs.php';
$module_path = $module->getModulePath();

?>

<div id="app"></div>

<style>
@import url('<?= $module->getUrl('assets/js/my-vue-app/dist/style.css') ?>');
</style>

<script type="module">
import init from '<?= $module->getUrl('assets/js/my-vue-app/dist/lib.es.js') ?>'
init('#app')
</script>

<style>
  #app {
    margin-top: 50px;
  }
</style>
<?php $page->PrintFooterExt();

