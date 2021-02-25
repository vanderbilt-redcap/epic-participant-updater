const initialState = {
    api_token: '',
    module_prefix: '',
    module_url: '',
    module_version: '',
}

const module = {
    namespaced: true,
    state: {...initialState},
    mutations: {
        SET: function(state, payload) {
            for(let [key, value] of Object.entries(payload)) state[key] = value
        },
    },
    actions: {
        set(context, settings) {
            context.commit('SET', settings)
        },
    }
}

export default module;