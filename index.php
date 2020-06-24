<?php
namespace Vanderbilt\EpicParticipantUpdater;

$page = new \HtmlPage();
$page->PrintHeaderExt();

include APP_PATH_VIEWS . 'HomeTabs.php';
?>


<?php include('header.php') ?>


<!-- API token -->
<div x-data="ApiToken()" >

  <div class="alert alert-light" style="border-color: rgba(0,0,0,0.2) !important">
    <span>API token: </span>
    <pre class="my-2" style="white-space:pre-wrap;" x-text="api_token"></pre>
    <button class="btn btn-outline-secondary" @click="regenerateToken($event)">Regenerate token</button>
  </div>

  <div class="alert alert-light" style="border-color: rgba(0,0,0,0.2) !important">
    <span>Check URL: </span>
    <pre class="my-2" style="white-space:pre-wrap;" x-text="check_url()"></pre>
  </div>
</div>



<div x-data="Logs()" x-init="init">
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
    

<script>

  function ApiToken() {
    var api_token =  '<?= $module->getAPIToken() ?>'
    module_prefix = '<?= $module->PREFIX; ?>'
    redcap_base_url = '<?= APP_PATH_WEBROOT_FULL; ?>'

    return {
      api_token: api_token,
      check_url() {
        return `${redcap_base_url}api/?NOAUTH&prefix=${module_prefix}&type=module&page=api&route=check&api_token=${this.api_token}`
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
    }
  }

  function Logs() {
  
    // public methods and properties
    return {
      logs: [], // list of logs

      init() {
        this.getLogs()
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

    }
  }
</script>
  
<?php $page->PrintFooterExt();

