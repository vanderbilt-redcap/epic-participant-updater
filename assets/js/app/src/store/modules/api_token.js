const initialState = {
    api_token: '',
    listening_url_base: '',
    listening_url: '',
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