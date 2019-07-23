<?php
namespace Vanderbilt\EpicParticipantUpdater;

$page = new \HtmlPage();
$page->PrintHeaderExt();

include APP_PATH_VIEWS . 'HomeTabs.php';

$query_params = array(
  'NOAUTH' => '',
  'type' => 'module',
  'prefix' => $module->PREFIX, //epic_participant_updater
  'page' => 'api',
  'route' => '/epic/check',
  'api_token' => $module->getAPIToken(),
  'redcap_csrf_token' => \System::getCsrfToken(),
);

$query_string = http_build_query($query_params, '', '&');

$url = sprintf("%s/api/index.php?%s", APP_PATH_WEBROOT_FULL, $query_string);
?>

  <!-- SYNTAX HIGHLIGHTING -->
  <link rel="stylesheet" type="text/css" href="<?= $module->getUrl('./assets/js/rainbow/themes/github.css').'&v='.time(); ?>">
  <script src="<?= $module->getUrl('./assets/js/rainbow/rainbow-custom.min.js'); ?>"></script>
  <!--/ SYNTAX HIGHLIGHTING -->


  <?php include('header.php');?>
  <hr>
  <h3>Examples</h3>
  <hr>


  <h6>JAVSCRIPT EXAMPLE</h6>
  <pre><code data-language="html" >
    <form action="" method="post" enctype="multipart/form-data" id="file-form">
        <input type="file" name="file" >
        <input type="submit">
    </form>

    <script>
        var form = document.getElementById('file-form'); // form element
        var fileChooser = form.querySelector('[name="file"]'); //file input
        var url = '<?= $url ?>'; // URL for ajax requests

        // process file if form is submitted
        form.addEventListener('submit', function(e) {
            e.preventDefault()
            processFile()
        })
        
        // also process file when file is selected
        fileChooser.addEventListener('change', function(e) {
            processFile()
        })

        /**
         * read a file and send it with an ajax request
         */
        function processFile(){
            var files = fileChooser.files;
            if(files.length<1) return
            var file = files[0];
            readFile(file)
        }

        /**
         * send an ajax request with text to parse
         * 
         * @param {string} url 
         * @param {string} data_string 
         */
        function send(url, data_string) {
            var encoded_data = encodeURIComponent(data_string);
            return fetch(url, {
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'text/plain'
                },
                method: "POST",
                body: data_string
            })
        }

        /**
         * read a file
         * 
         * @param {File} file 
         */
        function readFile(file) {
            var reader = new FileReader();

            reader.addEventListener('load', async function(){
                var text = reader.result;
                var response = await send(url, text);
                var text = await response.text()
                print(text)
            });
            reader.readAsText(file);
        }

        /**
         * print text inside an output node
         * 
         * @param {string} text 
         */
        function print(text) {
            var output = document.getElementById('output')
            if(!output) {
                // create output node if does not exists
                output = document.createElement('div');
                output.setAttribute('id', 'output');
                document.body.appendChild(output)
            }
            output.innerHTML = text;
        }

    </script>
  </code></pre>

  <h6>CURL EXAMPLE</h6>
  <pre>
  <code data-language="php">

  $MODULE_PREFIX = $module->PREFIX; // epic_participant_updater
  $API_TOKEN = '<?=$module->getAPIToken();?>';

  $redcap_URL = '<?=APP_PATH_WEBROOT_FULL;?>api/index.php';
  
  $query_params = array(
    'NOAUTH' => '',
    'type' => 'module',
    'prefix' => $MODULE_PREFIX, //epic_participant_updater
    'page' => 'api',
    'route' => '/epic/check',
    'api_token' => $API_TOKEN,
  );

  $URL = "{$redcap_URL}?" . http_build_query($query_params, '', '&');
  
  $file = reset($_FILES); // get first element
  $data_string = file_get_contents($file["tmp_name"]);
        
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
      curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
      curl_setopt($ch, CURLOPT_HTTPHEADER,     array('Content-Type: text/plain'));
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

<?php $page->PrintFooterExt();

