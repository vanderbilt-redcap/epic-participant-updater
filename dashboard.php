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
    <em id="endpoint-container"><?=APP_PATH_WEBROOT_FULL?>api/index.php?NOAUTH=&type=module&prefix=epic_participant_updater&page=api&route=/epic/check</em>
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
   <!-- expose DashboardApp -->
   <script src="<?= $module->getUrl('./assets/js/dashboard-app.js'); ?>"></script>
   <!-- expose Tools -->
  <script src="<?= $module->getUrl('./assets/js/tools.js'); ?>"></script>
  <script>
    
    (function($,window,document){
          
      $(function(){

        var module_prefix = '<?= $module->PREFIX; ?>';
        var api_base_url = `//${location.host}/api/?type=module&prefix=${module_prefix}&page=api&route=`;

        var logsTable = document.getElementById('logs');
        var templateSource = document.getElementById("entry-template").innerHTML;
        var template = Handlebars.compile(templateSource);
        
        // initialize the app
        var app = DashboardApp.init({
          api_base_url: api_base_url,
          logs: {
            target:logsTable,
            template:template,
          },
        });
        
        app.loadAndRender(); // load and display the logs
        
        var refreshButton = document.getElementById('refresh-button');

        /** refresh the data */
        refreshButton.addEventListener('click', function(e){
          refreshButton.style.pointerEvents = 'none'; //disable the button
          // add animation
          var icon = refreshButton.querySelector('i');
          var animationClass = "fa-spin";
          icon.classList.add(animationClass);
          
          app.loadAndRender().always(function(){
            icon.classList.remove(animationClass); // remove animation
            refreshButton.style.pointerEvents = 'all'; //enable the button
          });
        });

        /**
         * infinite scrolling
         */
        window.addEventListener("scroll", function(e){
            var scrolledToBottom = $(window).scrollTop() + $(window).height() == $(document).height();
            if(scrolledToBottom) {

              app.loadNext()
                .then(function(data){
                  app.render(logsTable, template, data);
                })
                .fail(function(error) {
                  console.log(error);
                });
            }
        });
        
        /** copy  endpoint to clipboard */
        var endpointContainer = document.getElementById('endpoint-container');
        var copyButton = document.getElementById('copy-button');
        var copyToClipboard = Tools.copyToClipboard;

        copyButton.addEventListener('click', function(e){
          var el = e.target;
          var endpoint = endpointContainer.textContent;
          
          copyToClipboard(endpoint);
          var message = `The URL has been copied to the clipboard`;
          alert(message);
        });

      });

    })(jQuery,window,document);
  </script>
  <script id="entry-template" type="text/x-handlebars-template">
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

