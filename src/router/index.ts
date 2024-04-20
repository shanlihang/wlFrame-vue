import { createRouter, createWebHistory } from 'vue-router';
import HelloWord from '@/components/HelloWorld.vue'

const routes = [
    {
        path:'/',
        component:HelloWord
    },
    {
        path:'/login',
        component:() => import('@/views/login/LoginPage.vue')
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

router.beforeEach((to, from, next) => {
    console.log('to:',to);
})

router.afterEach(() => {})

export default router