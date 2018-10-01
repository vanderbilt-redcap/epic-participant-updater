(function(window, document) {
    /*
    * API FUNCTIONS
    */
    const module_prefix = PREFIX || 'epic_participant_updater';
    const baseURL = `//${location.host}/api/?type=module&prefix=${module_prefix}&page=api&action=`;

    const request_instance = axios.create({
        // baseURL: `//${location.host}${API_BASE_URL}`,
        baseURL: baseURL,
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
    * create a FormData
    * @param {object} files retrieved from an html input of type file
    * @return {object} FormData with files
    */
    function getFilesAsFormData(files)
    {
        if(typeof files.length !== 'undefined' && files.length<1) files = [files];
        var data = new FormData();
        for (var key in files) {
            // is the item a File?
            if (files.hasOwnProperty(key) && files[key] instanceof File) {
                data.append(key, files[key]);
            }
        }
        return data;    
    }

    /**
    * fires upload event on succesful upload
    * @param {object} caller html element used to listen for the epicDataUploaded event
    * @fires epicDataUploaded
    */
    function fireUploadEvent(caller, data)
    {
        if(caller) {
            const dataUploadedEvent = new CustomEvent('epicDataUploaded', {
                detail: {response:data},
            });
            caller.dispatchEvent(dataUploadedEvent);
        }
    }
    
    /**
    * upload an xml epic file
    * @param {object} files retrieved from an html input of type file
    * @param {object} caller optional html element used to listen for the epicDataUploaded event
    * @fires epicDataUploaded
    */
    function axios_ajaxFileUpload(files, caller)
    {
        var formData = getFilesAsFormData(files);
        
        request_instance.put('epic/check', formData)
        .then(function (response) {
            const data = response.data || [];
            fireUploadEvent(caller, data);
        })
        .catch(ajaxFail);
    }

    /**
    * upload an xml epic file using superagent
    * @param {object} files retrieved from an html input of type file
    * @param {object} caller optional html element used to listen for the epicDataUploaded event
    * @fires epicDataUploaded
    */
   function sa_ajaxFileUpload(files, caller)
   {
       var formData = getFilesAsFormData(files);
       
        superagent.put(`${baseURL}/epic/check`)
            .send(formData)
            .on('error', ajaxFail)
            .then(response => {
                const data = response.body || [];
                fireUploadEvent(caller, data);
            });
   }
    
    //helper function to display a basic alert on error
    function ajaxFail(error) {
        var response = error.response || {message: 'unexpected error'};
        console.error(response.message);
        return response;
    }
    
    window.checkEpicData = checkData; //expose the check function
    window.axios_ajaxFileUpload = axios_ajaxFileUpload; //expose the ajaxFileUpload function
    window.sa_ajaxFileUpload = sa_ajaxFileUpload; //expose the ajaxFileUpload function
    window.epicEndpoint = `//${location.host}/api/?type=module&prefix=${module_prefix}&page=api&action=/epic/check`; //expose the epic endpoint
    
}(window, document));