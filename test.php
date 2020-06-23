<?php
namespace Vanderbilt\EpicParticipantUpdater;
use Vanderbilt\EpicParticipantUpdater\App\Helpers\File as FileHelper;

$page = new \HtmlPage();
$page->PrintHeaderExt();

include APP_PATH_VIEWS . 'HomeTabs.php';

/**
 * get the URL to use in AJAX request
 *
 * @return string
 */
function getTestUrl()
{
  global $module;

  $query_params = array(
    'NOAUTH' => '',
    'type' => 'module',
    'prefix' => $module->PREFIX, //epic_participant_updater
    'page' => 'api',
    'route' => '/epic/check',
    'api_token' => $module->getApiToken(),
    'redcap_csrf_token' => \System::getCsrfToken(),
  );
  
  $query_string = http_build_query($query_params, '', '&');
  
  $url = sprintf("%s/api/index.php?%s", APP_PATH_WEBROOT_FULL, $query_string);
  return $url;
}

$example_files = array(
  (object)array(
    'label' => 'DEV',
    'path' => 'data/request_DEV.xml'
  ),
  (object)array(
    'label' => 'DEV, multiple studies',
    'path' => 'data/request_DEV_multiple_studies.xml'
  ),
  (object)array(
    'label' => 'DEV, dates',
    'path' => 'data/request_DEV_dates.xml'
  ),
);


  ?>
  <?php include('header.php');?>
  <hr>
  <h3>Test</h3>
  <hr>
  <?php foreach ($example_files as $file) : ?>
    <h3 style="text-transform:uppercase;">
      <i class="fas fa-file-download"></i>
      <a style="font-size:20px;" href="<?= $module->getUrl($file->path); ?>" download="<?= basename($file->path) ?>"><?= sprintf("download epic xml file example (%s)", $file->label) ?></a>
    </h3>
  <?php endforeach; ?>
  
  <hr>
  
  <h3>File Upload test</h3>
  <p>upload an xml file via Javascript</p>
  <form action="" method="post" enctype="multipart/form-data" id='file-form'>
    <input type="file" name="file" multiple>
    <input type="submit">
  </form>

  <div id="output"></div>

  <script>
    var form = document.getElementById('file-form'); // form
    var fileChooser = form.querySelector('[name="file"]'); //file input

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
     * send an ajax request with text to parse (jQuery)
     * 
     * @param {string} url 
     * @param {string} data_string 
     */
    function jQuerySend(url, data_string) {
      return $.ajax({
        url: url,
        type: "POST",
        data: data_string,
        contentType: 'text/plain',
      });
    }

    /**
     * read a file (legacy version)
     * 
     * @param {File} file 
     */
    function readFileLegacy(file) {
        var url = '<?php echo getTestUrl() ?>';
        var reader = new FileReader();

        reader.addEventListener('load', function(){
            var text = reader.result;
            var ajax_promise = send(url, text);
            ajax_promise.then(function(response) {
              var text_promise = response.text();
              text_promise.then(function(text) {
                print(text)
              })    
            });
        });
        reader.readAsText(file);
    }

    /**
     * read a file
     * 
     * @param {File} file 
     */
    function readFile(file) {
        var url = '<?php echo getTestUrl() ?>';
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
     * escape HTML or XML strings
     * 
     * @param {string} text 
     */
    function escapeHtml(html_string) {
      return html_string
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
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
        var escaped = escapeHtml(text)
        output.innerHTML = escaped;
    }

</script>

<style>
  #output {
    white-space: pre;
    padding: 20px;
    margin: 20px 0;
    border: solid 1px #ccc;
    color: #333;
    background: #f8f8f8;
    border-radius: 3px;
  }
</style>

<?php

/* if ( isset($_GET['sendmail']) )
{
  $msg = 'Email testing is cool locally';
  // mail('nick@scotch.io', 'Test email', $msg);
  $result = mail('fakee.mail@dummy.org', 'Test email', $msg);
  var_dump('email sent:', $result);
} */

$page->PrintFooterExt();
?>