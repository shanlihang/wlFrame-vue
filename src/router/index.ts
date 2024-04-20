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
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(() => {})

router.afterEach(() => {})

export default router