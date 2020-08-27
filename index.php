<?php
namespace Vanderbilt\EpicParticipantUpdater;

$page = new \HtmlPage();
$page->PrintHeaderExt();

include APP_PATH_VIEWS . 'HomeTabs.php';
$module_path = $module->getModulePath();
include($module_path.'header.php')
?>


<!-- API token -->
<div x-data="ApiToken()" >

  <div class="alert alert-light">
    <span>API token: </span>
    <span class="my-2 code" x-text="api_token"></span>
    <button class="btn btn-outline-secondary" @click="regenerateToken($event)">Regenerate token</button>
  </div>

  <div class="alert alert-light">
    <span>Check URL: </span>
    <span class="my-2 code" x-text="check_url()"></span>
  </div>
</div>



<div id="epu-logs-wrapper" x-data="Logs()" x-init="init">
    <!-- logs -->

  <div class="d-flex justify-content-between align-items-center">
      <template x-if="loading">
        <div class="ml-2 my-auto">
          <i class="fas fa-spinner fa-spin"></i>
          <span>loading...</span>
        </div>  
      </template>
      <template x-if="!loading">
        <div>
          <button type="button" class="btn btn-sm btn-outline-secondary" @click="getLogs(start, limit)"><i class="fas fa-sync"></i></button>
          Showing <span x-text="start*limit+1"></span> to <span x-text="start*limit+limit"></span> of <span x-text="total"></span> results
        </div>
      </template>
      <template x-if="total>limit">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" :class="{disabled: start<=0}">
            <a class="page-link" href="#" @click.prevent="getLogs(start-1,limit)"><i class="fas fa-angle-left"></i></a>
          </li>
          <li class="page-item" :class="{active: start==0}">
            <a class="page-link" href="#" @click.prevent="getLogs(0,limit)">1</a>
          </li>

          <template x-for="(page, index) in pages">
            <li class="page-item" :class="{active: page.start==start, disabled: isNaN(page.start)}" >
            <template x-if="isNaN(page.start)">
              <a class="page-link" href="#">...</a>
            </template>
            <template x-if="!isNaN(page.start)">
                <a class="page-link" href="#" @click.prevent="getLogs(page.start,limit)" x-text="page.start+1"></a>
              </template>
            </li>
          </template>

          <li class="page-item" :class="{active: start==pages_count-1}">
            <a class="page-link" href="#" @click.prevent="getLogs(pages_count-1,limit)" x-text="pages_count"></a>
          </li>
          <li class="page-item" :class="{disabled: start>=pages_count-1}">
            <a class="page-link" href="#" @click.prevent="getLogs(start+1,limit)"><i class="fas fa-angle-right"></i></a>
          </li>
        </ul>
      </nav>
    </template>

  </div>

  <template x-if="logs.length>0">
    <table id="epu-logs" class="table table-bordered table-striped">
      <thead>
        <tr>
          <td>ID</td>
          <td>MRN</td>
          <td>description</td>
          <td>ip</td>
          <td>Study ID</td>
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
              <button class="btn btn-outline-secondary btn-sm" type="button" @click="onShowDescriptionClicked(row.description)">Show</button>
            </template>
            <template x-else>
              <span x-text="row.description"></span>
            </template>
          </td>
          <td x-text="row.ip"></td>
          <td x-text="row.study_id"></td>
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

    <!-- modal for extended description -->
    <div class="modal fade" tabindex="-1" role="dialog" id="description-modal" x-ref="modal">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Detail</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" x-ref="modal-body">
            <pre x-text="selected_description"></pre>
          </div>
          <div class="modal-footer">
            <!-- <button type="button" class="btn btn-primary">OK</button> -->
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
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
      max_pages: 5, //maximum pages except first and last
      limit: 25,
      start: 0,
      logs: [], // list of logs
      total: null,
      loading: false,
      _pages: null,
      selected_description: '',

      
      init() {
        this.getLogs(this.start, this.limit)
      },

      get pages_count() {
        let count = Math.ceil(this.total/this.limit)
        return count
      },

      /**
       * load the logs
       */
      async getLogs(start, limit) {
        try {
          const params = {
            route: 'logs',
            _start: start*limit,
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

      /**
       * get the pagination parameters
       */
      get pages() {
        
        if(!this.total) return []

        const pages = []
        for(let i=0 ; i<this.pages_count ; i++) {
          pages.push({
            start: i,
            limit: this.limit,
          })
        }

        let start = this.start-Math.floor(this.max_pages/2)
        if(start<1) start = 1
        let end = start+this.max_pages
        if(end>this.pages_count-2) {
          end = this.pages_count-1
          start = end-this.max_pages
        }

        const filtered_pages = pages.slice(start, end)

        // manage elllipsis
        if(start>1) {
          filtered_pages[0].start = '...'
        }
        if(end<this.pages_count-1) {
          filtered_pages[this.max_pages-1].start = '...'
        }


        return filtered_pages
      },

      onShowDescriptionClicked(content) {
        this.selected_description = content
        const modal = this.$refs.modal
        $(modal).modal('show')
      },

    }
  }
</script>
  <style>
    .code {
      display: block;
      white-space: pre-wrap;
      word-break: break-all;
      color: black;
    }
   #epu-logs {
    table-layout: fixed;
   } 
  </style>
<?php $page->PrintFooterExt();

