(function($,window,document){
    
    var app = {
        /**
        * the data retrieved from the endpoint is cached
        * this is a placeholder for load on scroll
        */
        page: 0, // pagination, used in infinite scrolling
        cachedData: {}, // data saved in pages chunks
        loading: false,
        options: {},
        
        /**
         * initialize the app
         * 
         * @param {object} params 
         */
        init: function(params) {
            
            this.options = $.extend({}, this.options, params);
            this._setTemplatingEngineHelpers();
            return this;
        },
        
        /**
         * load data from the endpoint and display the results
         * 
         * @param {object} params 
         */
        loadAndRender: function(params={}) {
            var dfd = $.Deferred();
            var page = params.p || 1;
            var target = this.options.logs.target;
            var template = this.options.logs.template;
            var self = this;
            
            
            if(this.loading) dfd.reject('already loading');
            if(!this._shouldLoad(page)) dfd.reject('no more loading');
            
            target.innerHTML = 'loading...';
            return this._loadData(params).done(function(data) {
                self.render(target, template, data);
                dfd.resolve(data);
            }).fail((error)=>{
                target.innerHTML = 'error';
                dfd.reject(error);
            });
            
            return dfd;
        },

        regenerateAPIToken: function() {
            var dfd = $.Deferred();
            var redcap_csrf_token = window.redcap_csrf_token || '';
            var api_token = this.options.api_token || '';
            $.ajax({
                url: `${this.options.api_base_url}/regenerate_api`,
                type: 'POST',
                data: {
                    redcap_csrf_token: redcap_csrf_token,
                    api_token: api_token,
                },
                dataType: 'json',
            }).done( function( data, textStatus, jqXHR ) {
                dfd.resolve(data);
            }).fail( function( jqXHR, textStatus, errorThrown ) {
                dfd.reject(jqXHR, textStatus, errorThrown);
            });
            return dfd;
        },
        
        /**
         * check if the app should load a page or not
         * @param {number} page 
         */
        _shouldLoad: function(page) {
            if(page==1) return true; // should load the first time
            
            previousPageData = this.cachedData[page-1];
            return (previousPageData && previousPageData.length>0);
        },
        
       /**
        * load data
        * 
        * @param {object} params 
        */
        _loadData: function(params={}) {
            var dfd = $.Deferred();
            var defaultParams = {p:1};
            var data = $.extend({}, defaultParams, params);
            this.page = data.p; //set current page (for pagination)
            
            this.loading = true; // something is loading
            var self = this; // keep scope in closures
            $.ajax({
                url: `${this.options.api_base_url}/epic/logs`,
                type: 'GET',
                data: data
            }).done( function( data, textStatus, jqXHR ) {
                self.cachedData[self.page] = data; //save data
                dfd.resolve(data);
            }).fail( function( jqXHR, textStatus, errorThrown ) {
                console.log(arguments);
                dfd.reject(errorThrown);
            }).always(function() {
                self.loading = false; // no more loading
            });
            return dfd;
        },
        
        /**
        * return the cached data in array format
        */
        _getCachedData: function() {
            var data = [];
            for(var p in this.cachedData) {
                data = data.concat(this.cachedData[p]);
            }
            return data;
        },
        
       /**
        * load data and append it to the cached data
        */
        loadNext: function() {
            var dfd = $.Deferred();
            var self = this; // keep scope in closures
            
            if(this.loading) dfd.reject(Error("already loading"));
            else if(!this._shouldLoad(this.page+1, this.cachedData)) dfd.reject(Error("can't load anymore"));
            else {
                this.page = this.page+1;
                
                this._loadData({p:this.page}).done(function() {
                    var data = self._getCachedData();
                    dfd.resolve(data);
                }).fail(()=>{
                    dfd.reject();
                });
            }
            
            return dfd;
        },
        
       /**
        * render data using a templating engine
        * 
        * @param {Element} target 
        * @param {Object} Handlebars template 
        * @param {Object} data 
        */
        render: function(target, template, data) {
            var context = data; 
            var html = template(context);
            target.innerHTML = html;
        },
        
        /**
        * calculate the gap between 2 elements
        */
        _getDistance: function(topElement,bottomElement) {
            var rect_top = topElement.getBoundingClientRect();
            var rect_bottom = bottomElement.getBoundingClientRect();
            return Math.abs(rect_bottom.top - rect_top.bottom);
        },
        
        
        /**
         * register the templating engine helper functions
         */
        _setTemplatingEngineHelpers: function() {
            /**
            * translate the status to a class
            * used to better see rows with errors
            */
            Handlebars.registerHelper('class', function(status) {
                let className = '';
                switch (status) {
                    case 'success':
                        className = 'table-success';
                        break;
                    case 'warning':
                        className = 'table-warning';
                        break;
                    case 'error':
                        className = 'table-danger';
                        break;
                    case 'info':
                    default:
                        className = '';
                        break;
                }
                return className;
            });
            
            /**
            * date helper
            */
            Handlebars.registerHelper('date', function(dateString) {
                var date1 = new Date(dateString);
                var input_format = "YYYY-MM-DD HH:mm:ss"
                var output_format = "MM-DD-YYYY HH:mm:ss"
                var date = moment(dateString, input_format);
                if(date.isValid()) {
                    return date.format(output_format);
                }else {
                    return 'invalid date';
                }
            });
        }
        
    };
    
    window.DashboardApp = app; //expose the app
    
})(jQuery,window,document);