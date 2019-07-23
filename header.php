
<?php
function printVersion($module)
{
  $version = $module->VERSION ? sprintf("(%s)", $module->VERSION) : '';
  echo $version;
}
?>

<link rel="stylesheet" type="text/css" href="<?= $module->getUrl('./assets/css/style.css'); ?>">
<link rel="stylesheet" type="text/css" href="<?= $module->getUrl('./assets/css/fontawesome/css/all.css'); ?>">
  
<nav id="epu_menu" class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <a class="navbar-brand" href="#">Epic Participant Updater <?php printVersion($module)?></a>

  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item">
        <a class="nav-link" href="<?= $module->getUrl('dashboard.php'); ?>">DASHBOARD</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="<?= $module->getUrl('test.php'); ?>">TEST</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="<?= $module->getUrl('examples.php'); ?>">EXAMPLES</a>
      </li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
      <!-- projects -->
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          ENABLED PROJECTS
        </a>
        <div id="projects-list" class="dropdown-menu" aria-labelledby="navbarDropdown">
          <!-- <a class="dropdown-item" href="#">Action</a> -->
          <!-- <div class="dropdown-divider"></div> -->
        </div>
      </li>
    </ul>
  </div>
</nav>
 <!-- MAIN SCRIPT - exposes HeaderApp -->
<script src="<?= $module->getUrl('./assets/js/header-app.js'); ?>"></script>
<script>
(function($, window, document){

  $(function(){
    var module_prefix = '<?= $module->PREFIX; ?>';
    var app_base_path = '<?= APP_PATH_WEBROOT; ?>';
    var api_base_path = '/api/?type=module&prefix='+module_prefix+'&page=api&route=';

    var app = HeaderApp.init({
      app_base_path: app_base_path,
      api_base_path: api_base_path,
    });

  });
})(jQuery, window, document);
</script>