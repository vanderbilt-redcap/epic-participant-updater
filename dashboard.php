<?php
namespace Vanderbilt\EpicParticipantUpdater;

$page = new \HtmlPage();
$page->PrintHeaderExt();

include APP_PATH_VIEWS . 'HomeTabs.php';

?>

  <?php include('header.php');?>
  <hr>
  <h3>Dashboard</h3>
  <hr>
  <section>
    <h6>ENDPOINT</h6>
    <em id="endpoint-container"><?=APP_PATH_WEBROOT_FULL?>api/index.php?NOAUTH=&type=module&prefix=epic_participant_updater&page=api&action=/epic/check</em>
    <input class="btn btn-primary" type="button" value="copy to clipboard" id="copy-button">
  </section>
  
  <hr>
  <section>
    <div class="container">
      <h6 class="row">
          <div class="col">
            <span>LOGS</span>
          </div>
          <div class="col col-md-auto">
            <a href="#" id="refresh-button" class="btn btn-primary">
              <i class="fas fa-sync"></i>
              <span>refresh</span>
            </a>
          </div>
      </h6>
    </div>
    <div id="logs"></div>
  </section>
  <script src="<?= $module->getUrl('./assets/js/momentjs/moment.js'); ?>"></script>
  <script src="<?= $module->getUrl('./assets/js/handlebars-latest.js'); ?>"></script>
  <script>
    
    (function($,window,document){
      
      /**
       * copy a string to the clipboard
       **/
      const copyToClipboard = str => {
        const el = document.createElement('textarea');  // Create a <textarea> element
        el.value = str;                                 // Set its value to the string that you want copied
        el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof               
        // make it invisible
        el.style.width = 0;                 
        el.style.height = 0;                 
        el.style.position = 'absolute';
        document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
        const selected =            
        document.getSelection().rangeCount > 0        // Check if there is any content selected previously
        ? document.getSelection().getRangeAt(0)     // Store selection if found
        : false;                                    // Mark as false to know no selection existed before
        el.select();                                    // Select the <textarea> content
        document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
        document.body.removeChild(el);                  // Remove the <textarea> element
        if (selected) {                                 // If a selection existed before copying
          document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
        document.getSelection().addRange(selected);   // Restore the original selection
      }
    };

    const module_prefix = '<?= $module->PREFIX; ?>';
    const api_base_url = `//${location.host}/api/?type=module&prefix=${module_prefix}&page=api&action=`;
    /**
     * the data retrieved from the endpoint is cached
     * this is a placeholder for load on scroll
     */
    let page = 0; // pagination, used in infinite scrolling
    let cachedData = {}; // data saved in pages chunks
    let loading = false;

    const shouldLoad = function(page, cachedData) {
      if(page==1) return true; // should load the first time

      let previousPageData = cachedData[page-1];
      return (previousPageData && previousPageData.length>0);
    }
    /**
     * load data and render
     */
    const loadData = function(params={}) {
      const dfd = $.Deferred();
      const defaultParams = {p:1};
      const data = $.extend({}, defaultParams, params);
      page = data.p; //set current page (for pagination)

      loading = true; // something is loading
      $.ajax({
        url: `${api_base_url}/epic/logs`,
        type: 'GET',
        data: data
      }).done( ( data, textStatus, jqXHR ) => {
        cachedData[page] = data; //save data
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
     * return the cached data in array format
     */
    const getCachedData = function() {
      let data = [];
      for(let p in cachedData) {
        data = data.concat(cachedData[p]);
      }
      return data;
    }

    /**
     * load data and append it to the cached data
     */
    const loadNext = function(callback) {
      const dfd = $.Deferred();

      if(typeof callback !== 'function') dfd.reject(Error("not a valid callback"));
      else if(loading) dfd.reject(Error("already loading"));
      else if(!shouldLoad(page+1, cachedData)) dfd.reject(Error("can't load anymore"));
      else {
        page = page+1;

        loadData({p:page}).done(() => {
          const data = getCachedData();
          callback(data);
          dfd.resolve(data);
        }).fail(()=>{
          dfd.reject();
        });
      }

      return dfd;
    };

    /**
     * render data using a templating engine
     */
    const render = function(template, data, container) {
      var context = data; 
      var html = template(context);
      container.innerHTML = html;
    };

    /**
     * calculate the gap between 2 elements
     */
    const getDistance = function(topElement,bottomElement) {
      const rect_top = topElement.getBoundingClientRect();
      const rect_bottom = bottomElement.getBoundingClientRect();
      return Math.abs(rect_bottom.top - rect_top.bottom);
    }
    
    /**
     * translate the status to a class
     * used to better see rows with errors
     */
    Handlebars.registerHelper('class', function(status) {
      let className = '';
      switch (status) {    
        case 'error':
          className = 'table-danger';           
        break;
        default:
          break;
      }
      return className;
    });

    /**
     * date helper
     */
    Handlebars.registerHelper('date', function(dateString) {
      const date1 = new Date(dateString);
      const input_format = "YYYY-MM-DD HH:mm:ss"
      const output_format = "MM-DD-YYYY HH:mm:ss"
      const date = moment(dateString, input_format);
      if(date.isValid()) {
        return date.format(output_format);
      }else {
        return 'invalid date';
      }
    });

    $(function(){
      const refreshButton = document.getElementById('refresh-button');
      const logsTable = document.getElementById('logs');
      const templateSource = document.getElementById("entry-template").innerHTML;
      
      const template = Handlebars.compile(templateSource);

      const loadAndRender = (params={}) => {
        const dfd = $.Deferred();
        const page = params.p || 1;

        if(loading) dfd.reject('already loading');
        if(!shouldLoad(page, cachedData)) dfd.reject('no more loading');

        logsTable.innerHTML = 'loading...';
        return loadData(params).done(data => {
          render(template, data, logsTable);
          dfd.resolve(data);
        }).fail((error)=>{
          logsTable.innerHTML = 'error';
          dfd.reject(error);
        });

        return dfd;
      }; //closure for easy re-use
      
      loadAndRender();
      
      /** refresh the data */
      refreshButton.addEventListener('click', function(e){
        refreshButton.style.pointerEvents = 'none'; //disable the button
        // add animation
        const icon = refreshButton.querySelector('i');
        const animationClass = "fa-spin";
        icon.classList.add(animationClass);
        
        loadAndRender().always(function(){
          icon.classList.remove(animationClass); // remove animation
          refreshButton.style.pointerEvents = 'all'; //enable the button
        });
      });
      
      /** copy  endpoint to clipboard */
      const endpointContainer = document.getElementById('endpoint-container');
      const copyButton = document.getElementById('copy-button');

      copyButton.addEventListener('click', function(e){
        const el = e.target;
        const endpoint = endpointContainer.textContent;
        
        copyToClipboard(endpoint);
        const message = `The URL has been copied to the clipboard`;
        alert(message);
      });

      /**
       * infinite scrolling
       */
      window.addEventListener("scroll", function(e){
          const scrolledToBottom = $(window).scrollTop() + $(window).height() == $(document).height();
          if(scrolledToBottom) {

            loadNext( data => {
              render(template, data, logsTable);
            }).fail(error=>{
              console.log(error);
            });
          }
      });
    });

  })(jQuery,window,document);
  </script>
  <script id="entry-template" type="text/x-handlebars-template">
  <!-- 
    description: "record 14 has been updated"
    ip: null
    log_id: "18"
    message: "updateRecord"
    project_id: null
    record: null
    status: "success"
    timestamp: "2018-11-01 15:48:48"
    user(): "homestead@localhost"
  -->
  <table class="table table-striped table-bordered">
    <thead class="thead-light">
      <tr scope="row">
        <th scope="col">id</th>
        <th scope="col">timestamp</th>
        <th scope="col">project id</th>
        <th scope="col">record</th>
        <th scope="col">message</th>
        <th scope="col">description</th>
      </tr>
    </thead>
    <tbody>
      {{#each .}}  
      <tr class="entry {{class status}}">
        <td>{{log_id}}</td>
        <td>{{date timestamp}}</td>
        <td>{{project_id}}</td>
        <td>{{record}}</td>
        <td>{{message}}</td>
        <td>{{description}}</td>
      </tr>
      {{else}}
        <tr class="entry {{class status}}">
          <td colspan="6">no content</td>
        </tr>
      {{/each}}
    </tbody>
  </table>
  </script>
<?php $page->PrintFooterExt();

