/**
 * components are lazy loaded as the routes are visited
 */
const routes = [
    { path: '', component: () => import('@/layouts/MainLayout'),
        children: [
            { path: '', name: 'home', component: () => import('@/pages/Home'), meta: { title: 'Home' }},
            { path: 'logs', name: 'logs', component: () => import('@/pages/Logs'), meta: { title: 'Logs' }},
            { path: 'api-token', name: 'api-token', component: () => import('@/pages/ApiToken'), meta: { title: 'API token' }},
            { path: 'project-templates', name: 'project-templates', component: () => import('@/pages/ProjectTemplates'), meta: { title: 'Project Templates' }},
            { path: "*", name: 'not_found', component: () => import('@/pages/PageNotFound'), meta: { title: 'Page not found' } },
        ]
    },
]

export default routes