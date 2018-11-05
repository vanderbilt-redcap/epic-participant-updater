<?php
namespace Vanderbilt\EpicParticipantUpdater;

$page = new \HtmlPage();
$page->PrintHeaderExt();

include APP_PATH_VIEWS . 'HomeTabs.php';

?>

  <!-- SYNTAX HIGHLIGHTING -->
  <link rel="stylesheet" type="text/css" href="<?= $module->getUrl('./assets/js/rainbow/themes/github.css').'&v='.time(); ?>">
  <script src="<?= $module->getUrl('./assets/js/rainbow/rainbow-custom.min.js'); ?>"></script>
  <!--/ SYNTAX HIGHLIGHTING -->


  <?php include('header.php');?>
  <hr>
  <h3>Examples</h3>
  <hr>


  <h6>FORM EXAMPLE</h6>
  <pre><code data-language="html" >
  <form action="<?=APP_PATH_WEBROOT_FULL;?>api/index.php?type=module&prefix=epic_participant_updater&page=api&action=/epic/check" method="post" enctype="multipart/form-data">
    <input type="file" name="file">
    <input type="submit">
  </form>
  </code></pre>

  <h6>CURL EXAMPLE</h6>
  <pre>
  <code data-language="php">
  $query_params = array(
    'NOAUTH' => '',
    'type' => 'module',
    'prefix' => $module->PREFIX, //epic_participant_updater
    'page' => 'api',
    'action' => '/epic/check',
  );

  $redcap_URL = '<?=APP_PATH_WEBROOT_FULL;?>api/index.php';
  $URL = "{$redcap_URL}?" . http_build_query($query_params, '', '&');
  
  $file = array_pop($_FILES);

  $file_data = array();

  $file_data[] = new CurlFile(
        $file["tmp_name"][0],
        $file["type"][0],
        $file["name"][0]
    );

  $extra_params = array(
    'foo' => 'bar',
  );

  $data = array_merge($file_data, $extra_params);

  
  try {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $URL);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); // ignore error for self signed certificate
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_AUTOREFERER, true);
    curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
    curl_setopt($ch, CURLOPT_FRESH_CONNECT, 1);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    $output = curl_exec($ch);
    print $output;
  } catch(Exception $e) {
    
    trigger_error(sprintf(
      'Curl failed with error #%d: %s',
      $e->getCode(), $e->getMessage()),
      E_USER_ERROR);
      
  }
  </code>
  </pre>

  <h6>JQUERY EXAMPLE</h6>
  <pre>
  <code data-language="html">
    <input type="file" id="file">
    <input type="button" id="send-button" value="send XML" />

    &lt;script&gt;
      const redcap_URL = 'YOUR REDCAP BASE URL';
      const base_url = `//${redcap_URL}/api/index.php?NOAUTH=&type=module&prefix=epic_participant_updater&page=api&action=`;

      function ajaxFileUpload(files)
      {
          // see https://stackoverflow.com/a/8244082
          var formData = getFilesAsFormData(files);
          $.ajax({
              url: `${baseURL}/epic/check`,
              type: 'PUT',
              data: formData,
              processData: false,
              contentType: false,
          })
          .done( ( data, textStatus, jqXHR ) => {
              console.log(data);
          }).fail( ( jqXHR, textStatus, errorThrown ) => {
              console.log(errorThrown);
          });
          
      }

      var file_input = document.getElementById('file');
      var send_button = document.getElementById('send-button');

      send_button.addEventListener('click', function(e) {
        e.preventDefault();
        ajaxFileUpload(file_input.files[0]);
      });
    &lt;/script&gt;
  </code></pre>

  <h6>AXIOS EXAMPLE</h6>
  <pre>
  <code data-language="html">
    <input type="file" id="file">
    <input type="button" id="send-button" value="send XML" />

     &lt;script&gt;
      const redcap_URL = 'YOUR REDCAP BASE URL';
      const base_url = `//${redcap_URL}/api/index.php?NOAUTH=&type=module&prefix=epic_participant_updater&page=api&action=`;
      
      function ajaxFileUpload(file)
      {
        var request_instance = axios.create({
          baseURL: base_url,
          timeout: 5000,
        });
        var data = new FormData();
        data.append('file', file);
        
        var config = {
          headers: { 'content-type': 'multipart/form-data' }
        };
        
        request_instance.put('epic/check', data, config)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      }
      
      var file_input = document.getElementById('file');
      var send_button = document.getElementById('send-button');
      
      send_button.addEventListener('click', function(e) {
        e.preventDefault();
        ajaxFileUpload(file_input.files[0]);
      });
    &lt;/script&gt;
  </code></pre>

<?php $page->PrintFooterExt();

