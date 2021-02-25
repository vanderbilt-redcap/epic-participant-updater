/**
 * all libraries are loaded here
 */
import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Vuex from 'vuex'
Vue.use(Vuex)

/* import API from '@/API/plugin'
Vue.use(API) */

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)
Vue.component('font-awesome-icon', FontAwesomeIcon)


import { BootstrapVue } from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'