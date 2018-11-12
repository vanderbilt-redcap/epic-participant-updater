(function($, window, document){

    var app = {
      
      loading: false,
      options: {},
  
      /**
       * initialize the App object
       * 
       * @param {Object} params 
       */
      init: function(params) {
        // set the options
        this.options = $.extend({}, this.options, params);
        // set the active menu
        var menu = document.getElementById('epu_menu');
        this._setActiveLink(menu);
        /**
        * load the projects that enabled the module 
        * and display them in the menu
        */
        var self = this; // keep the scope in closures
        var projects_endpoint = `//${location.host}${this.options.api_base_path}/epic/projects`;
        var projectsMenuItem = document.getElementById('projects-list');
        var projects_base_url = `//${location.host}${this.options.app_base_path}ProjectSetup/index.php?pid=`;
        this._loadData(projects_endpoint).done(function(data) {
          self._createProjectsMenu(projectsMenuItem, data, projects_base_url);
        });
      },

       /**
        * load data from url
        * 
        * @param {string} url 
        */
      _loadData: function(url) {
        var dfd = $.Deferred();
        
        var self = this; // keep scope in closures
        self.laoding = true;
  
        $.ajax({
          url: url,
          type: 'GET',
        }).done( function( data, textStatus, jqXHR ) {
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
      * set the active menu item
      * 
      * @param {Element} menu_element 
      */
      _setActiveLink: function(menu_element) {
        var links = menu_element.querySelectorAll('.navbar-nav li.nav-item a');
        links.forEach(element => {
          if(element.href == location.href) {
            element.parentNode.classList.add('active');
          }else {
            element.parentNode.classList.remove('active');
          }
        });
      },
  
      /**
       * create the menu with a list projects using the module
       * 
       * @param {Element} menu_item 
       * @param {Array} projects 
       * @param {string} projects_base_url 
       */
      _createProjectsMenu: function(menu_item, projects, projects_base_url) {
        menu_item.innerHTML = ''; // reset the menu
        projects.forEach(project => {
          var a = document.createElement('a');
          a.classList.add('dropdown-item');
          a.href = `${projects_base_url}${project.project_id}`;
          var text = document.createTextNode(`${project.project_name} (ID ${project.project_id})`);
          a.appendChild(text);
          menu_item.appendChild(a);
        });
      },
    };
    
    window.HeaderApp = app; //expose the app
    
  })(jQuery, window, document);