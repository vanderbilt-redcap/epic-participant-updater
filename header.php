<script src="<?= $module->getUrl('./assets/js/axios/dist/axios.min.js'); ?>"></script>
<script src="<?= $module->getUrl('./assets/js/alpine/dist/alpine.js'); ?>"></script>
<link rel="stylesheet" href="<?= $module->getUrl('./assets/css/style.css'); ?>">
<script>
  // API client
  var api_client = axios.create({
      baseUrl: '/api/',
      // params,
      paramsSerializer: params => {
        const search_params =  new URLSearchParams()
        search_params.append('type', 'module')
        search_params.append('page', 'api')
        search_params.append('prefix', '<?= $module->PREFIX; ?>')
        if(window.redcap_csrf_token) search_params.append('redcap_csrf_token',window.redcap_csrf_token) // csrf token for post requests
        if(pid) search_params.append('pid', pid) //inject pid

        for(let [key, value] of Object.entries(params)) {
          search_params.append(key, value)
        }
        return search_params.toString()
      },
      headers: {common: {'X-Requested-With': 'XMLHttpRequest'}}
    })
</script>

<header class="mb-2" x-data="Header()" x-init="init">
  <nav class="navbar navbar-expand-sm navbar-light bg-light ">
    <a class="navbar-brand" href="<?= $module->getUrl('index.php') ?>">Epic Participant Updater (<span x-text="module_version"></span>)</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="<?= $module->getUrl('index.php') ?>">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="<?= $module->getUrl('test.php') ?>">Test</a>
        </li>
        <!-- <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li> -->
      </ul>
      <div class="dropdown">
        <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span>Enabled Projects</span>
        </button>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
          <template x-for="(project, index) in projects" :key="index">
            <a class="dropdown-item" :href="`${app_base_path}?pid=${project.project_id}`">
              <span class="badge badge-secondary" x-text="`PID ${project.project_id}`"></span>  
              <span> - </span>
              <span x-text="project.app_title"></span>
          </a>
          </template>
        </div>
      </div>
    </div>
  </nav>
</header>

<script>

  function Header() {
    var app_base_path = '<?= APP_PATH_WEBROOT; ?>'
    var module_version = '<?= $module->VERSION ?>'
  
    // public methods and properties
    return {
      module_version: module_version,
      app_base_path: app_base_path,
      projects: [], // list of projects using the module

      init() {
        this.getProjects()
      },

      /**
       * load list of projects using the module
       */
      async getProjects() {
        const params = {
          route: 'projects'
        }
        const response = await api_client.get('', {params})
        const projects = response.data
        this.projects = projects.map(project => project.project)
      },
      
    }
  }
</script>