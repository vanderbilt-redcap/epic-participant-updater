import { createRouter, createWebHashHistory } from 'vue-router'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import HomePage from '@/pages/HomePage.vue'
import ProjectTemplatesPage from '@/pages/ProjectTemplatesPage.vue'
import ApiTokenPage from '@/pages/ApiTokenPage.vue'
import LogsPage from '@/pages/LogsPage.vue'

/**
 * supported routes.
 * PLEASE NOTE: inbox is included for further development (more folders),
 * and home is redirected to inbox automatically
 */
const routes = [
    {
        path: '/',
        component: MainLayout,
        // redirect: '/inbox',
        children: [
            { path: '', name: 'home', component: HomePage },
            { path: 'project-templates', name: 'project-templates', component: ProjectTemplatesPage },
            { path: 'api-token', name: 'api-token', component: ApiTokenPage },
            { path: 'logs', name: 'logs', component: LogsPage },
            { path: '/:pathMatch(.*)*', component: NotFoundPage },
        ],
    },
]

let router

const useRouter = () => {
    if (router) return router
    // Create the router instance and pass the `routes` option
    // You can pass in additional options here, but let's
    // keep it simple for now.
    router = createRouter({
        // Provide the history implementation to use. We are using the hash history for simplicity here.
        history: createWebHashHistory(),
        routes,
    })
    return router
}

export default useRouter
