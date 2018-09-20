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

    // check data from epic
    function checkData(params = {}) {
        request_instance.post('epic/check', params)
        .then(function(response) {
            // const target = document.getElementById('results-container');

            const data = response.data || [];
        })
        .catch(ajaxFail)
        .then(function() { });
    }

    //helper function to display a basic alert on error
    function ajaxFail(error) {
        var response = error.response || {message: 'unexpected error'};
        console.error(response.message);
        return response;
    }

    window.checkEpicData = checkData; //expose the check function

}(window, document));