import Vue from 'vue'
import Vuex from 'vuex'


import app_settings from '@/store/modules/app_settings'
import projects from '@/store/modules/projects'
import api_token from '@/store/modules/api_token'

Vue.use(Vuex)

var initialState = {}

const store = new Vuex.Store({
    state: Object.assign({}, initialState),
    modules: {
        app_settings,
        projects,
        api_token,
    }
})

export default store