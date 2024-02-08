import axios from 'axios';

// Assuming location.href is accessible in the context where this script runs

class API {
    #defaultParams = {
        page: 'api',
        type: 'module',
        prefix: 'REPLACE_WITH_MODULE_NAME',
        route: '',
    }

    constructor(baseURL, prefix, page='api') {
        this.#defaultParams['prefix'] = prefix;
        this.#defaultParams['page'] = page;

        this.client = axios.create({
            baseURL: baseURL,
            timeout: 60000,
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            params: this.getDefaultParams()
        });
    }

    getDefaultParams() {
        const url = new URL(location.href);
        const searchParams = url.searchParams;
        const defaultParams = {...this.#defaultParams}
        for (const [key, value] of searchParams) {
            defaultParams[key] = value;
        }
        if(window.redcap_csrf_token) defaultParams['redcap_csrf_token'] = window.redcap_csrf_token;
        return defaultParams;
    }

    static makeRoute(route, config = {}) {
        config.params = config.params || {};
        config.params.route = encodeURIComponent(route);
        return config;
    }

    read(route, config = {}) {
        config = API.makeRoute(route, config);
        return this.client.get('', config);
    }

    readOne(route, id, config = {}) {
        config = API.makeRoute(`${route}/${id}`, config);
        return this.client.get('', config);
    }

    create(route, data, config = {}) {
        config = API.makeRoute(`${route}`, config);
        return this.client.post('', data, config);
    }

    update(route, id, data, config = {}) {
        config = API.makeRoute(`${route}/${id}`, config);
        return this.client.put('', data, config);
    }

    delete(route, id, config = {}) {
        config = API.makeRoute(`${route}/${id}`, config);
        return this.client.delete(route, config);
    }
}

// const api = new API();

export default API;
