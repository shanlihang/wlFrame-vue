import { createRouter, createWebHistory } from 'vue-router';
import IndexPage from '@/views/base/IndexPage.vue'
import { Session } from '@/utils/storage';

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
        path:'/permission',
        component:() => import('@/views/system/PermissionManage.vue')
    },
    {
        path:'/good',
        component:() => import('@/views/medical/GoodManage.vue')
    },
    {
        path:'/people',
        component:() => import('@/views/medical/PeopleManage.vue')
    },
    {
        path:'/message',
        component:() => import('@/views/medical/PushMessage.vue')
    },
    {
        path:'/result',
        component:() => import('@/views/medical/ResultManage.vue')
    },
    {
        path:'/feedBack',
        component:() => import('@/views/medical/feedBackManage.vue')
    },
    {
        path:'/community',
        component:() => import('@/views/medical/communityManage.vue')
    },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to,from,next) => {
    if(to.path == '/login' || to.path == '/register'){
        next()
    }else{
        Session.get("token") != null ? next() : next('/login')
    }
})

// router.afterEach(() => {})

export default router