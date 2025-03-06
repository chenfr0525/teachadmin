import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/LoginPage.vue')
    },
    {
      path: '/preview',
      component: () => import('@/views/Preview.vue')
    },
    {
      path: '/',
      component: () => import('@/views/usepage/LayoutContainer.vue'),
      redirect:'/user/home',
      children:[
        {
          path:'/user/home',
          component:()=>import('@/views/usepage/HomePage.vue')
        }
      ]
    },
    {
      path: '/admin',
      component: () => import('@/views/manage/LayoutContainer.vue'),
      redirect: '/admin/home',
      children: [
        {
          path: '/admin/home',
          component: () => import('@/views/manage/HomePage.vue')
        },
        {
          path: '/system/student',
          component: () => import('@/views/manage/system/StudentManage.vue')
        },
        {
          path: '/system/role',
          component: () => import('@/views/manage/system/RoleManage.vue')
        },
        {
          path: '/system/notice',
          component: () => import('@/views/manage/notice/index.vue')
        },
        {
          path: '/system/log',
          component: () => import('@/views/manage/log/index.vue')
        },
        {
          path: '/myinfo/profile',
          component: () => import('@/views/manage/myinfo/UserProfile.vue')
        },
        {
          path: '/myinfo/password',
          component: () => import('@/views/manage/myinfo/UserPassword.vue')
        }
      ]
    }
  ],
})

export default router
