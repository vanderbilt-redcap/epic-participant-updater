function Dashboard() {
    var module_prefix = '<?= $module->PREFIX; ?>'
    var app_base_path = '<?= APP_PATH_WEBROOT; ?>'
    var api_token = '<?= $module->getAPIToken() ?>'
    var api_base_path = '/api/'
    var module_version = '<?= $module->VERSION ?>'

    // API client
    var api_client = axios.create({
        api_base_path,
        // params,
        paramsSerializer: params => {
        const search_params =  new URLSearchParams()
        search_params.append('type', 'module')
        search_params.append('page', 'api')
        search_params.append('prefix', module_prefix)
        if(window.redcap_csrf_token) search_params.append('redcap_csrf_token',window.redcap_csrf_token) // csrf token for post requests
        if(pid) search_params.append('pid', pid) //inject pid

        for(let [key, value] of Object.entries(params)) {
            search_params.append(key, value)
        }
        return search_params.toString()
        },
        headers: {common: {'X-Requested-With': 'XMLHttpRequest'}}
    })


    // public methods and properties
    return {
        module_version: module_version,
        app_base_path: app_base_path,
        api_token: api_token,

        projects: [], // list of projects using the module
        logs: [], // list of logs

        init() {
        this.getProjects()
        this.getLogs()
        },

        /**
         * load list of projects using the module
         */
        async getProjects() {
        const params = {
            route: 'projects'
        }
        const response = await api_client.get('', {params})
        const projects = response.data
        this.projects = projects.map(project => project.project)
        },
        /**
         * load the logs
         */
        async getLogs() {
        const params = {
            route: 'logs'
        }
        const response = await api_client.get('', {params})
        const logs = response.data
        this.logs = logs
        },
        /**
         * generate a new token
         * disable the button during the ajax call
         */
        async regenerateToken(event) {
        try {
            event.target.setAttribute('disabled', true)
            const params = {
            route: 'regenerate_token'
            }
            const search_params =  new URLSearchParams()
            search_params.append('api_token', this.api_token)
            const data = search_params.toString()
            const response = await api_client.post('', data, {params})
            const api_token = response.data
            this.api_token = api_token            
        } catch (error) {
            console.log(error)
        }finally {
            event.target.removeAttribute("disabled")
        }
        
        },

        onClick() {
            alert('ciao')
        },
    }
}