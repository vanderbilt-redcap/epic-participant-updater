<?php
namespace Vanderbilt\EpicParticipantUpdater;

$page = new \HtmlPage();
$page->PrintHeaderExt();

include APP_PATH_VIEWS . 'HomeTabs.php';

?>

  <link rel="stylesheet" type="text/css" href="<?= $module->getUrl('./assets/css/style.css'); ?>">
  <link rel="stylesheet" type="text/css" href="<?= $module->getUrl('./assets/css/fontawesome/css/all.css'); ?>">
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
    let page = 1; // pagination, used in infinite scrolling
    let cachedData = []; // data

    /**
     * load data and render
     */
    const loadData = function(template, container, params={}) {
      const defaultParams = {p:1};
      const data = $.extend({}, defaultParams, params);
      page = data.p; //set current page (for pagination)

      container.innerHTML = 'loading...';
      
      return $.ajax({
        url: `${api_base_url}/epic/logs`,
        type: 'GET',
        data: data
      }).done( ( data, textStatus, jqXHR ) => {
        cachedData = data;
        render(template, cachedData, container)
      }).fail( ( jqXHR, textStatus, errorThrown ) => {
        container.innerHTML = 'error';
        console.log(arguments);
      });
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
      loadData(template, logsTable); // load data 
      
      /** refresh the data */
      refreshButton.addEventListener('click', function(e){
        refreshButton.style.pointerEvents = 'none'; //disable the button
        // add animation
        const icon = refreshButton.querySelector('i');
        const animationClass = "fa-spin";
        icon.classList.add(animationClass);
        
        loadData(template, logsTable).always(function(){
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
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            /* console.log("simulating page load!");
            setTimeout(()=>{
              alert("content loaded. increasing pagination!");
            }, 5000);   */
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
        <th scope="col">message</th>
        <th scope="col">description</th>
      </tr>
    </thead>
    {{#each .}}  
    <tr class="entry {{class status}}">
      <td>{{log_id}}</td>
      <td>{{date timestamp}}</td>
      <td>{{message}}</td>
      <td>{{description}}</td>
    </tr>
    {{else}}
      <tr class="entry {{class status}}">
        <td colspan="4">no content</td>
      </tr>
    {{/each}}
  </table>
  </script>
<?php $page->PrintFooterExt();
