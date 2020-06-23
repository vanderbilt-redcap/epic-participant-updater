<?php
namespace Vanderbilt\EpicParticipantUpdater;

$page = new \HtmlPage();
$page->PrintHeaderExt();

include APP_PATH_VIEWS . 'HomeTabs.php';
$api_token = $module->getApiToken();


?>

  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.3.5/dist/alpine.min.js" defer></script>
  <?php //include('header.php');?>

  <div id="app" class="mt-5">

    <div x-data="Dashboard()" x-init="init">
      <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light ">
          <a class="navbar-brand" href="#">Epic Participant Updater (<span x-text="module_version"></span>)</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <!-- <li class="nav-item active">
                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Features</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Pricing</a>
              </li> -->
            </ul>
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Enabled Projects
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <template x-for="(project, index) in projects" :key="index">
                    <a class="dropdown-item" :href="`${app_base_path}?pid=${project.project_id}`" x-text="project.app_title"></a>
                  </template>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <div class="main">

      <!-- API token -->
      <div class="alert alert-light mt-2" style="border-color: rgba(0,0,0,0.2) !important">
        <span>API token: </span>
        <pre class="my-2" style="white-space:pre-wrap;" x-text="api_token"></pre>
        <button class="btn btn-outline-secondary" @click="regenerateToken($event)">Regenerate token</button>
      </div>

        <!-- logs -->
        <template x-if="logs.length>0">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <td>MRN</td>
              <td>description</td>
              <td>ip</td>
              <td>irb_number</td>
              <td>log_id</td>
              <td>message</td>
              <td>project_id</td>
              <td>record</td>
              <td>status</td>
              <td>timestamp</td>
              <td>user</td>
            </tr>
          </thead>
          <tbody>
            <template x-for="(row, index) in logs" :key="index">
            <tr>
              <td x-text="row.MRN"></td>
              <td>
                <template x-if="(row.description).length>100">
                  <details>
                    <summary>Expand...</summary>
                    <pre x-text="row.description"></pre>
                  </details>
                </template>
                <template x-else>
                  <span x-text="row.description"></span>
                </template>
              </td>
              <td x-text="row.ip"></td>
              <td x-text="row.irb_number"></td>
              <td x-text="row.log_id"></td>
              <td x-text="row.message"></td>
              <td x-text="row.project_id"></td>
              <td x-text="row.record"></td>
              <td x-text="row.status"></td>
              <td x-text="row.timestamp"></td>
              <td x-text="row.user"></td>
            </tr>
            </template>
          </tbody>
        </table>
        </template>
      </div>

    </div>
  </div>
    

  <script>

    function Dashboard() {
      var module_prefix = '<?= $module->PREFIX; ?>'
      var app_base_path = '<?= APP_PATH_WEBROOT; ?>'
      var api_base_path = '/api/'
      var module_version = '<?= $module->VERSION ?>'

      // API client
      var api_client = axios.create({
        api_base_path,
        // params,
        paramsSerializer: params => {
          const search_params =  new URLSearchParams()
          search_params.append('type', 'module')
          search_params.append('page', 'api')
          search_params.append('prefix', module_prefix)
          if(window.redcap_csrf_token) search_params.append('redcap_csrf_token',window.redcap_csrf_token) // csrf token for post requests
          if(pid) search_params.append('pid', pid) //inject pid

          for(let [key, value] of Object.entries(params)) {
            search_params.append(key, value)
          }
          return search_params.toString()
        },
        headers: {common: {'X-Requested-With': 'XMLHttpRequest'}}
      })

    
      // public methods and properties
      return {
        module_version: module_version,
        app_base_path: app_base_path,
        api_token: '<?= $module->getAPIToken() ?>',

        projects: [], // list of projects using the module
        logs: [], // list of logs

        init() {
          this.getProjects()
          this.getLogs()
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
        /**
         * load the logs
         */
        async getLogs() {
          const params = {
            route: 'logs'
          }
          const response = await api_client.get('', {params})
          const logs = response.data
          this.logs = logs
        },
        /**
         * generate a new token
         * disable the button during the ajax call
         */
        async regenerateToken(event) {
          try {
            event.target.setAttribute('disabled', true)
            const params = {
              route: 'regenerate_token'
            }
            const search_params =  new URLSearchParams()
            search_params.append('api_token', this.api_token)
            const data = search_params.toString()
            const response = await api_client.post('', data, {params})
            const api_token = response.data
            this.api_token = api_token            
          } catch (error) {
            console.log(error)
          }finally {
            event.target.removeAttribute("disabled")
          }
          
        },

        onClick() {
            alert('ciao')
        },
      }
    }
  </script>


  
<?php $page->PrintFooterExt();

