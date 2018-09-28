(function(window, document) {
    /*
     * API FUNCTIONS
     */
    const module_prefix = PREFIX || 'epic_participant_updater';
    const request_instance = axios.create({
        // baseURL: `//${location.host}${API_BASE_URL}`,
        baseURL: `//${location.host}/api/?type=module&prefix=${module_prefix}&page=api&action=`,
        timeout: 5000,
        // headers: {'X-API-BASE-URL': API_BASE_URL}
    });

    /**
     * check data from epic
     * @param {object} params 
     * @param {object} caller an html element
     * @fires epicDataChecked
     */
    function checkData(params = {}, caller) {
        
        request_instance.post('epic/check', params)
        .then(function(response) {
            // const target = document.getElementById('results-container');
            console.log(typeof caller)
            const data = response.data || [];
            if(caller) {
                const dataCheckedEvent = new CustomEvent('epicDataChecked', {
                    detail: {response:data},
                });
                caller.dispatchEvent(dataCheckedEvent);
            }
        })
        .catch(ajaxFail)
        .then(function() { });
    }

    /**
     * check data from epic
     * @param {object} file retrieved from an html input of type file
     * @param {object} caller an html element
     * @fires epicDataUploaded
     */
    function ajaxFileUpload(file, caller)
    {
      var data = new FormData();
      data.append('file', file);

      var config = {
        headers: { 'content-type': 'multipart/form-data' }
      };

      request_instance.put('epic/check', data, config)
        .then(function (response) {
            const data = response.data || [];
            if(caller) {
                const dataUploadedEvent = new CustomEvent('epicDataUploaded', {
                    detail: {response:data},
                });
                caller.dispatchEvent(dataUploadedEvent);
            }
        })
        .catch(ajaxFail);
    }

    //helper function to display a basic alert on error
    function ajaxFail(error) {
        var response = error.response || {message: 'unexpected error'};
        console.error(response.message);
        return response;
    }

    window.checkEpicData = checkData; //expose the check function
    window.ajaxFileUpload = ajaxFileUpload; //expose the ajaxFileUpload function
    window.epicEndpoint = `//${location.host}/api/?type=module&prefix=${module_prefix}&page=api&action=/epic/check`; //expose the epic endpoint

}(window, document));