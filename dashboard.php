<?php
namespace Vanderbilt\EpicParticipantUpdater;

$page = new \HtmlPage();
$page->PrintHeaderExt();

include APP_PATH_VIEWS . 'HomeTabs.php';

?>

  <link rel="stylesheet" type="text/css" href="<?= $module->getUrl('./assets/css/style.css'); ?>">
  <h3>Check the <strong>MRN</strong> (Medical Record Number) and the <strong>study status</strong>.</h3>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis praesentium unde, eveniet dolores nobis ducimus omnis earum mollitia, vero eligendi doloribus quas. Iure neque totam ex quaerat vero distinctio numquam.</p>
  <hr>


  <section>
    <h6>ENDPOINT</h6>
    <em id="endpoint-container"><?=APP_PATH_WEBROOT_FULL?>api/index.php?NOAUTH=&type=module&prefix=epic_participant_updater&page=api&action=/epic/check</em>
    <input class="btn btn-primary" type="button" value="copy to clipboard" id="copy-button">
  </section>

  <hr>


  <script>

  (function($,window,document){

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
      const message = `The URL has been copied to the clipboard`;
      alert(message);
    };

    const module_prefix = '<?= $module->PREFIX; ?>';
    const api_base_url = `//${location.host}/api/?type=module&prefix=${module_prefix}&page=api&action=`;
    $.ajax({
          url: `${api_base_url}/epic/logs`,
          type: 'GET',
      })
      .done( ( data, textStatus, jqXHR ) => {
        console.log(arguments);
      }).fail( ( jqXHR, textStatus, errorThrown ) => {
        console.log(arguments);
      });

    $(function(){
      const endpointContainer = document.getElementById('endpoint-container');
      const copyButton = document.getElementById('copy-button');
      copyButton.addEventListener('click', function(e){
        const el = e.target;
        const endpoint = endpointContainer.textContent;

        copyToClipboard(endpoint);
      });
    });

  })(jQuery,window,document);
  </script>

<?php $page->PrintFooterExt();

