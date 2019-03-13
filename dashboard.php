<?php
namespace Vanderbilt\EpicParticipantUpdater;

$page = new \HtmlPage();
$page->PrintHeaderExt();

include APP_PATH_VIEWS . 'HomeTabs.php';
$api_token = $module->getAPIToken();


?>

  <?php include('header.php');?>
  <hr>
  <h3>Dashboard</h3>
  <hr>
  <section>    
    <div class="card">
      <div class="card-body">
        <p><strong>Endpoint:</strong> <em id="endpoint-container"><?=APP_PATH_WEBROOT_FULL?>api/index.php?NOAUTH=&type=module&prefix=epic_participant_updater&page=api&route=/epic/check?api_token=<?php echo $api_token?></em></p>
        <a href="#"  id="copy-button" class="btn btn-primary">
          <i class="far fa-clipboard"></i>
          <span>copy to clipboard</span>
        </a>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <p><strong>API Token:</strong> <em id="api-token"><?php echo $api_token?></em></p>
        <p class="card-text">
          The API token is required when using the <em>/epic/check</em> endpoint.
        </p>
        <div class="alert alert-warning" >
          <p>Warning: regenerate the API token only if necessary.<br/>
          Once regenerated, the new API token must be communicated to the Epic technical team.</p>
          <a href="#" id="regenerate-api" class="btn btn-warning">
            <i class="fas fa-sync"></i>
            <span>regenerate</span>
          </a>
        </div>
      </div>
    </div>
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
    

    /**
     * add interaction to the user interface
     */
    var UserInterface = function(app){
      this.app = app;
    };
    /**
     * copy the endpoint to the clipboard
     */
    UserInterface.prototype.enableCopyToClipboardButton = function() {
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
    };
    /**
     * reload the logs table
     */
    UserInterface.prototype.enableRefreshButton = function() {
      var _this = this;
      var refreshButton = document.getElementById('refresh-button');
      /** refresh the data */
      refreshButton.addEventListener('click', function(e) {
        refreshButton.style.pointerEvents = 'none'; //disable the button
        // add animation
        var icon = this.querySelector('i');
        var animationClass = "fa-spin";
        icon.classList.add(animationClass);
        
        _this.app.loadAndRender().always(function(){
          icon.classList.remove(animationClass); // remove animation
          refreshButton.style.pointerEvents = 'all'; //enable the button
        });
      });
    };
    /**
     * create a new API token
     */
    UserInterface.prototype.enableRegenerateAPIButton = function() {
      var _this = this;
      var regenerate_api_button = document.getElementById('regenerate-api');
      var apiTokenText = document.getElementById('api-token');
      /** regenerate the API token */
      regenerate_api_button.addEventListener('click', function(e) {
        if(confirm("Are you sure you want to regenerate the API token?"))
        {
          var icon = this.querySelector('i');
          var animationClass = "fa-spin";
          if(icon) icon.classList.add(animationClass);

          regenerate_api_button.style.pointerEvents = 'none'; //disable the button
          _this.app.regenerateAPIToken().done(function(response) {
            location.reload();
          }).always(function(){
            if(icon) icon.classList.remove(animationClass); // remove animation
            regenerate_api_button.style.pointerEvents = 'all'; //enable the button
          });
        }
      });
    };

    /**
     * load new log entries scrolling the page
     */
    UserInterface.prototype.enableInfiniteScroll = function(logsTable, templateSource, template) {
      var _this = this;
      /**
       * infinite scrolling
       */
      window.addEventListener("scroll", function(e){
          var scrolledToBottom = $(window).scrollTop() + $(window).height() == $(document).height();
          if(scrolledToBottom) {

            _this.app.loadNext()
              .then(function(data){
                _this.app.render(logsTable, template, data);
              })
              .fail(function(error) {
                console.log(error);
              });
          }
      });
    };



    (function($,window,document){
          
      $(function(){
        var api_token = '<?= $api_token; ?>';
        var module_prefix = '<?= $module->PREFIX; ?>';
        var api_base_url = `//${location.host}/api/?type=module&prefix=${module_prefix}&page=api&route=`;

        var logsTable = document.getElementById('logs');
        var templateSource = document.getElementById("entry-template").innerHTML;
        var template = Handlebars.compile(templateSource);
        
        // initialize the app
        var app = DashboardApp.init({
          api_base_url: api_base_url,
          api_token: api_token,
          logs: {
            target:logsTable,
            template:template,
          },
        });
        
        app.loadAndRender(); // load and display the logs
        
        var ui = new UserInterface(app);
        ui.enableRefreshButton();
        ui.enableRegenerateAPIButton();
        ui.enableCopyToClipboardButton();
        ui.enableInfiniteScroll(logsTable, templateSource, template);

      });

    })(jQuery,window,document);
  </script>
  <script id="entry-template" type="text/x-handlebars-template">
    <table class="table table-striped table-bordered table-hover">
      <thead class="thead-light">
        <tr scope="row">
          <th scope="col">id</th>
          <th scope="col">timestamp</th>
          <th scope="col">project id</th>
          <th scope="col">record</th>
          <th scope="col">MRN</th>
          <th scope="col">IRB number</th>
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
          <td>{{MRN}}</td>
          <td>{{irb_number}}</td>
          <td>{{message}}</td>
          <td>
            <section>{{description}}</section>
          </td>
        </tr>
        {{else}}
          <tr class="entry {{class status}}">
            <td colspan="8">no content</td>
          </tr>
        {{/each}}
      </tbody>
    </table>
  </script>
<?php $page->PrintFooterExt();

