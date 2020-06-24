(function($, window, document) {
    
    var app = {
        /**
         * variables
         */
        request_instance: null,
        options: {
            timeout: 5000, // ajax request timeout
        },

        /**
         * inizialize the app
         * 
         * @param {object} params 
         */
        init: function(params) {
             // options configuration
            this.options = $.extend({}, this.options, params);

            this.request_instance = axios.create({
                baseURL: this.options.baseURL,
                timeout: this.options.timeout,
            });
            return this;
        },
        
        /**
        * check data from epic
        * 
        * @param {object} params 
        * @param {object} caller an html element
        * @fires epicDataChecked
        */
        checkData: function(params = {}, caller) {
            
            this.request_instance.post('epic/check', params)
            .then(function(response) {
                // var target = document.getElementById('results-container');
                console.log(typeof caller)
                var data = response.data || [];
                if(caller) {
                    var dataCheckedEvent = new CustomEvent('epicDataChecked', {
                        detail: {response:data},
                    });
                    caller.dispatchEvent(dataCheckedEvent);
                }
            })
            .catch(this.ajaxFail)
            .then(function() { });
        },
        
        /**
        * create a FormData
        * 
        * @param {object} files retrieved from an html input of type file
        * @return {object} FormData with files
        */
        getFilesAsFormData: function(files)
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
        },
        
        /**
        * fires upload event on succesful upload
        * 
        * @param {object} caller html element used to listen for the epicDataUploaded event
        * @fires epicDataUploaded
        */
        fireUploadEvent: function(caller, data)
        {
            if(caller) {
                var dataUploadedEvent = new CustomEvent('epicDataUploaded', {
                    detail: {response:data},
                });
                caller.dispatchEvent(dataUploadedEvent);
            }
        },
        
        /**
        * upload an xml epic file using axios
        * 
        * @param {object} files retrieved from an html input of type file
        * @param {object} caller optional html element used to listen for the epicDataUploaded event
        * @fires epicDataUploaded
        */
        axios_ajaxFileUpload: function(files, caller)
        {
            var self = this; // keep the scope in closures
            var formData = this.getFilesAsFormData(files);
            
            this.request_instance.put('epic/check', formData)
            .then(function (response) {
                var data = response.data || [];
                self.fireUploadEvent(caller, data);
            })
            .catch( function(e) {
                self.ajaxFail(e.response.data);
            });
        },
        
        /**
        * upload an xml epic file using superagent
        * 
        * @param {object} files retrieved from an html input of type file
        * @param {object} caller optional html element used to listen for the epicDataUploaded event
        * @fires epicDataUploaded
        */
        sa_ajaxFileUpload: function(files, caller)
        {
            var self = this; // keep the scope in closures
            var formData = this.getFilesAsFormData(files);
            superagent.put( (this.options.baseURL)+'/epic/check' )
            .send(formData)
            .on('error', e => {
                self.ajaxFail(e.response.body);
            })
            .then(response => {
                var data = response.body || [];
                self.fireUploadEvent(caller, data);
            });
        },
        
        /**
        * upload an xml epic file using jQuery
        * 
        * @param {object} files retrieved from an html input of type file
        * @param {object} caller optional html element used to listen for the epicDataUploaded event
        * @fires epicDataUploaded
        */
        jq_ajaxFileUpload: function(files, caller)
        {
            var self = this; // keep the scope in closures
            // see https://stackoverflow.com/a/8244082
            var formData = self.getFilesAsFormData(files);
            $.ajax({
                url: (this.options.baseURL)+'/epic/check',
                type: 'PUT',
                data: formData,
                processData: false,
                contentType: false,
            })
            .done( ( data, textStatus, jqXHR ) => {
                self.fireUploadEvent(caller, data);
            }).fail( ( jqXHR, textStatus, errorThrown ) => {
                self.ajaxFail(jqXHR.responseJSON);
            });
            
        },
        
        /**
         * helper function to display a basic alert on error
         * 
         * @param {string} error 
         */
        ajaxFail: function(error) {
            var message = error.message || 'unexpected error';
            console.error(message);
            alert(message);
            return error;
        },
    };
    
    window.EpicTestApp = app; //expose the app
}(jQuery, window, document));