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


  <link rel="stylesheet" type="text/css" href="<?= $module->getUrl('./assets/css/style.css'); ?>">
  <h3>Check the <strong>MRN</strong> (Medical Record Number) and the <strong>study status</strong>.</h3>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis praesentium unde, eveniet dolores nobis ducimus omnis earum mollitia, vero eligendi doloribus quas. Iure neque totam ex quaerat vero distinctio numquam.</p>
  <hr>
  <h3 style="text-align: center;text-transform:uppercase;">
    <a style="font-size:20px;" href="<?= $module->getUrl('test.php'); ?>">go to the test page</a>
  </h3>

  <h2>Usage</h2>
  <p>create a super API token (TODO: explain)</p>

  <h6>FORM EXAMPLE</h6>
  <pre><code data-language="html" >
  <form action="https://redcap.test/api/?type=module&prefix=epic_participant_updater&page=api&action=/epic/check" method="post" enctype="multipart/form-data">
    <input type="file" name="file">
    <input type="submit">
  </form>
  </code></pre>

  <h6>AXIOS EXAMPLE</h6>
  <pre>
  <code data-language="html">
    <input type="file" id="file">
    <input type="button" id="send-button" value="send XML" />
  </code>
  <code data-language="javascript">

    function ajaxFileUpload(file)
    {
      var request_instance = axios.create({
        baseURL: '//redcap.test/api/?type=module&prefix=epic_participant_updater&page=api&action=',
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
      ajaxFileUpload(file_input);
    });

  </code></pre>

<?php $page->PrintFooterExt();

