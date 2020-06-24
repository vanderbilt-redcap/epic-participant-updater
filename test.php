<?php
namespace Vanderbilt\EpicParticipantUpdater;

$page = new \HtmlPage();
$page->PrintHeaderExt();

include APP_PATH_VIEWS . 'HomeTabs.php';
?>


<?php include('header.php') ?>

<h5>Test the API endpoint</h5>

<div class="alert alert-light" style="border-color: rgba(0,0,0,0.2) !important">
  <a href="<?= $module->getUrl('data/request_DEV_dates.xml') ?>" download="epu_demo.xml">
  <i class="fas fa-file-download"></i>
  <span>download demo file</span>
</a>
</div>


<div x-data="Test()">
  <form action="" @submit.prevent="onSubmit" @drop.prevent="onDrop($event)" @dragover.prevent>
    <input class="hidden" x-ref="file" type="file" @change="onFileChange">
    <button class="btn btn-outline-secondary" type="button" @click="$refs.file.click()" >Choose File...</button>
    <button class="btn btn-outline-primary" type="submit" :disabled="loading">Test</button>
  </form>

  <div class="mt-2">
    <template x-if="file_content">
      <details>
        <summary>Show file content</summary>
        <pre x-text="file_content"></pre>
      </details>
    </template>
  </div>

  <div class="mt-2">
    <template x-if="response">
      <div>
        <h6>Response:</h6>
        <pre x-text="response"></pre>
      </div>
    </template>
  </div>
</div>
    

<script>

  function Test() {
    var api_token =  '<?= $module->getAPIToken() ?>'
  
    // public methods and properties
    return {
      response: null,
      file_content: null,
      loading: false,

      init() {
        this.getLogs()
      },

      onDrop(event) {
        let droppedFiles = event.dataTransfer.files
        if(!droppedFiles) return
        this.$refs.file.files = droppedFiles
        this.onFileChange()
        // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
       /*  ([...droppedFiles]).forEach(f => {
          this.files.push(f);
        }); */
      },

      /**
       * load the logs
       */
      async onFileChange() {
        const files = this.$refs.file.files
        if(files.length>0) {
          const file = files[0]
          let file_content = ''
          var reader = new FileReader()
          reader.readAsText(file, "UTF-8")

          reader.onload = (event) => {
            const content = event.target.result
            this.file_content = content
          }

          reader.onerror = (event) => {
              alert("error reading file")
          }
        }
      },

      onSubmit() {
        this.sendFile(this.file_content)
      },

      async sendFile(file_content) {
        try {
          this.loading = true
          this.response = null
          const params = {
            route: 'check',
            api_token: api_token
          }
          const response = await api_client.put('', file_content, {params})
          const xml = response.data
          this.response = xml
        } catch (error) {
          console.log(error)
        }finally {
          this.loading = false
        }
      }

    }
  }
</script>
  
<?php $page->PrintFooterExt();

