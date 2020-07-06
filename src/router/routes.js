const routes = [
    {
        path: '*',
        name: 'not-found',
        component: () => import('../views/404.vue')
    },
    {
        path: '/orders',
        name: 'orders',
        component: () => import('../views/Orders.vue')
    },
    {
        path: '/history',
        name: 'history',
        component: () => import('../views/History.vue')
    },
    {
        path: '/info/:id',
        name: 'info',
        component: () => import('../views/Info.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/couriers',
        name: 'couriers',
        component: () => import('../views/Couriers.vue')
    },
    {
        path: '/courier/:id',
        name: 'courier',
        component: () => import('../views/Courier.vue')
    }
]

export default routes