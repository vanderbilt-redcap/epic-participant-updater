
import './style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import useRouter from './router'

// Vue UI utilities
// import { BootstrapVue } from 'bootstrap-vue'
// import 'bootstrap-vue/dist/style.css'

const init = (target) => {
    const app = createApp(App)
    const pinia = createPinia()
    app.use(pinia)
    const router = useRouter()
    app.use(router)
    // app.use(BootstrapVue)
    app.mount(target)
    return app
}

export { init as default }