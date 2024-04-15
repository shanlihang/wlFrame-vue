import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HelloWord from '@/components/HelloWorld.vue'

const routes = [
    {
        path:'/',
        component:HelloWord
    },
    {
        path:'/test1',
        component:() => import('@/views/Test1.vue')
    },
    {
        path:'/test2',
        component:() => import('@/views/Test2.vue')
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router