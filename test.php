<?php
namespace Vanderbilt\EpicParticipantUpdater;

$page = new \HtmlPage();
$page->PrintHeaderExt();

include APP_PATH_VIEWS . 'HomeTabs.php';
?>


<?php include('header.php') ?>

<h5>Test the API endpoint</h5>

<div class="alert alert-light">
  <a href="<?= $module->getUrl('data/request_DEV_dates.xml') ?>" download="epu_demo.xml">
  <i class="fas fa-file-download"></i>
  <span>download demo file</span>
</a>
</div>


<div x-data="Test()" >
  <div x-ref="drop_target" class="alert alert-light drop-target" @drop.prevent="onDrop($event)" @dragover.prevent="onDragOver" @dragleave.prevent="onDragLeave">
    <div class="drag-indicator">
      <i class="fas fa-arrow-down"></i>
      <span>Drop here</span>
    </div>
    <form  id="upload-form" @submit.prevent="onSubmit">
      <input class="hidden" x-ref="file" type="file" @change="onFileChange">
      <button class="btn btn-outline-secondary" type="button" @click="$refs.file.click()" >Choose File...</button>
      <button class="btn btn-outline-primary" type="submit" :disabled="loading">Test</button>
    </form>
    
    <div class="mt-2">
      <template x-if="file_content">
        <details>
          <summary>
            <template x-if="file && file.name"><span x-text="file.name"></span></template>
          </summary>
          <pre x-text="file_content"></pre>
        </details>
      </template>
    </div>

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
      loading: false,
      response: null, // response from the server
      file: null, // reference to the selected file
      file_content: null, //content of the selected file

      init() {
        this.getLogs()
      },

      /**
       * show UI interactions with drag & drop
       */
      onDragOver() {
        this.$refs.drop_target.classList.add('dragover')
      },
      onDragLeave() {
        this.$refs.drop_target.classList.remove('dragover')
      },
      
      onDrop(event) {
        this.$refs.drop_target.classList.remove('dragover')
        let droppedFiles = event.dataTransfer.files
        if(!droppedFiles) return
        this.$refs.file.files = droppedFiles
        this.onFileChange()
      },

      /**
       * load the logs
       */
      async onFileChange() {
        const files = this.$refs.file.files
        if(files.length>0) {
          this.file = files[0]
          console.log(this.file)
          let file_content = ''
          var reader = new FileReader()
          reader.readAsText(this.file, "UTF-8")

          reader.onload = (event) => {
            this.file_content = event.target.result
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
<style>
.drop-target {
  position: relative;
}
.drop-target.dragover {
  box-shadow: 0 0 3px rgb(201,255,0);
}
.drag-indicator {
  position: absolute;
  left: 50%;
  top: 50%;
  pointer-events: none;
  opacity: 0;
  z-index: 1;
  transition-property: opacity;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
}
.dragover .drag-indicator {
  opacity: 1;
}
</style>
<?php $page->PrintFooterExt();

