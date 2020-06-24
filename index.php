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

  <div class="d-flex justify-content-start align-items-center">

    <template x-if="total>limit">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" :class="{disabled: start==0}">
            <a class="page-link" href="#" @click.prevent="getLogs(start-limit,limit)">Previous</a>
          </li>
          <template x-for="(page, index) in getPages()">
            <li class="page-item" :class="{active: page.start==start}">
              <a class="page-link" href="#" @click.prevent="getLogs(page.start,limit)"x-text="index+1"></a>
            </li>
          </template>
          <li class="page-item" :class="{disabled: start>total-limit}">
            <a class="page-link" href="#" @click.prevent="getLogs(start+limit,limit)">Next</a>
          </li>
        </ul>
      </nav>
    </template>

    <template x-if="loading">
      <div class="ml-2 my-auto">
        <i class="fas fa-spinner fa-spin"></i>
        <span>loading...</span>
      </div>  
    </template>
  </div>

  <template x-if="logs.length>0">
  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <td>ID</td>
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

    <tbody x-ref="tbody">
      <template x-for="(row, index) in logs" :key="`row.log_id`">
      <tr>
        <td x-text="row.log_id"></td>
        <td x-text="row.MRN"></td>
        <td>
          <template x-if="row.description && (row.description).length>100">
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
      limit: 25,
      start: 0,
      logs: [], // list of logs
      total: null,
      loading: false,

      
      init() {
        this.getLogs(this.start, this.limit)
      },

      /**
       * load the logs
       */
      async getLogs(start, limit) {
        try {
          const params = {
            route: 'logs',
            _start: start,
            _limit: limit,
          }
          this.loading = true
          /* if(this.$refs.tbody) {
            const rows = this.$refs.tbody.querySelectorAll('tr')
            rows.forEach(row => {
              this.$refs.tbody.removeChild(row)
              console.log(row)
            })
          } */
          const response = await api_client.get('', {params})
          const data = response.data || {}
          const logs = data.data || []          
          this.logs = logs
          this.start = start
          this.total = (data.metadata && data.metadata.total) ? data.metadata.total : 0
        } catch (error) {
          console.log(error)
        }finally {
          this.loading = false
        }
      },

      getPages() {
        let total_pages = Math.floor(this.total/this.limit)
        if(total_pages*this.limit<this.total) total_pages += 1
        const pages = []
        for(let i=0 ; i<total_pages ; i++) {
          pages.push({
            start: i*this.limit,
            limit: this.limit
          })
        }
        return pages
      }

    }
  }
</script>
  
<?php $page->PrintFooterExt();

