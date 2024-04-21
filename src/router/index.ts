import { createRouter, createWebHistory } from 'vue-router';
import IndexPage from '@/views/base/IndexPage.vue'

const routes = [
    {
        path:'/',
        component:IndexPage
    },
    {
        path:'/login',
        component:() => import('@/views/base/LoginPage.vue')
    },
    {
        path:'/home',
        component:() => import('@/views/system/UserCenter.vue')
    },
    //
    {
        path:'/user',
        component:() => import('@/views/system/UserManage.vue')
    },
    {
        path:'/role',
        component:() => import('@/views/system/RoleManage.vue')
    },
    {
        path:'/good',
        component:() => import('@/views/medical/GoodManage.vue')
    },
    {
        path:'/result',
        component:() => import('@/views/medical/ResultManage.vue')
    },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(() => {})

router.afterEach(() => {})

export default router