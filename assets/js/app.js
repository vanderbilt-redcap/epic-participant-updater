const APP = class {
    constructor(prefix) {
        this.prefix = prefix;
        this.request_instance = axios.create({
            // baseURL: `//${location.host}${API_BASE_URL}`,
            baseURL: `//${location.host}${location.pathname}?prefix=${this.prefix}&page=api&action=`,
            timeout: 5000,
        });
    }

    checkData() {
        request_instance.post('epic/check')
        .then(function(response) {
            // const target = document.getElementById('results-container');

            const data = response.data || [];
        })
        .catch(this.ajaxFail)
        .then(function() { });

    }

    //helper function to display a basic alert on error
    ajaxFail(error) {
        var response = error.response || {message: 'unexpected error'};
        alert(response.message);
    }

};