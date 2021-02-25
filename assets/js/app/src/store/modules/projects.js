const initialState = {
    list: [],
}

const module = {
    namespaced: true,
    state: {...initialState},
    mutations: {
        SET_LIST: function(state, payload) { state['list'] = payload },
    },
    actions: {
        setList(context, projects) {
            context.commit('SET_LIST', projects)
        },
    }
}

export default module;