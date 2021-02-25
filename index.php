<?php
namespace Vanderbilt\EpicParticipantUpdater;

$page = new \HtmlPage();
$page->PrintHeaderExt();

include APP_PATH_VIEWS . 'HomeTabs.php';
$module_path = $module->getModulePath();

?>

<script src="<?= $module->getUrl('assets/js/vue.min.js') ?>"></script>
<script src="<?= $module->getUrl('assets/js/app/dist/epu_app.umd.js') ?>"></script>
<link rel="stylesheet" href="<?= $module->getUrl('assets/js/app/dist/epu_app.css') ?>">

<div id="app">
  <epu-app></epu-app>
</div>

<script>
new Vue({
  components: {
    "epu-app": epu_app
  }
}).$mount('#app')
</script>
<style>
  #app {
    margin-top: 50px;
  }
</style>
<?php $page->PrintFooterExt();

