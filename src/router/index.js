import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SysMenu from '../components/sys/SysMenu'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/sys/menu',
        name: '',
        component: SysMenu
        // component: () => import('../views/sys/SysMenu')
    },
    {
        path: '/sys/role',
        name: '',
        component: () => import('../views/sys/SysRole')
    },
    {
        path: '/sys/user',
        name: '',
        component: () => import('../views/sys/SysUser')
    }
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
