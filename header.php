

<link rel="stylesheet" type="text/css" href="<?= $module->getUrl('./assets/css/style.css'); ?>">
<link rel="stylesheet" type="text/css" href="<?= $module->getUrl('./assets/css/fontawesome/css/all.css'); ?>">
  
<nav id="epu_menu" class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Epic Participant Updater</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="<?= $module->getUrl('dashboard.php'); ?>">DASHBOARD</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="<?= $module->getUrl('test.php'); ?>">TEST</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="<?= $module->getUrl('examples.php'); ?>">EXAMPLES</a>
      </li>
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
<script>
(function($, window, document){
  const module_prefix = '<?= $module->PREFIX; ?>';
  const api_base_url = `//${location.host}/api/?type=module&prefix=${module_prefix}&page=api&route=`;
  let loading = false;
    /**
     * load data
     */
    const loadData = function() {
      const dfd = $.Deferred();
      
      laoding = true;

      $.ajax({
        url: `${api_base_url}/epic/projects`,
        type: 'GET',
      }).done( ( data, textStatus, jqXHR ) => {
        dfd.resolve(data);
      }).fail( ( jqXHR, textStatus, errorThrown ) => {
        console.log(arguments);
        dfd.reject(errorThrown);
      }).always(() =>{
        loading = false; // no more loading
      });
      return dfd;
    };

  /**
   * set the active menu item
   */
  function setActiveLink(menu_element) {
      const links = menu_element.querySelectorAll('.navbar-nav li.nav-item a');
      links.forEach(element => {
        if(element.href == location.href) {
          element.parentNode.classList.add('active');
        }else {
          element.parentNode.classList.remove('active');
        }
      });
    }
  $(function(){

    const menu = document.getElementById('epu_menu');
    setActiveLink(menu);

    const projectsList = document.getElementById('projects-list');
    
    /**
     * load the projects that enabled the module 
     * and display them in the menu
     */
    loadData().done(function(data){
      projectsList.innerHTML = '';
      data.forEach(element => {
        const a = document.createElement('a');
        a.classList.add('dropdown-item');
        a.href = '#';
        const text = document.createTextNode(`project ${element}`);
        a.appendChild(text);
        projectsList.appendChild(a);
      });
    });

  });
})(jQuery, window, document);
</script>