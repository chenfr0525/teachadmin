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
      path: '/user',
      component: () => import('@/views/studentpage/LayoutContainer.vue'),
      redirect:'/user/home',
      children:[
        {
          path:'/user/home',
          component:()=>import('@/views/studentpage/HomePage.vue')
        }
      ]
    },
    {
      path: '/',
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
          component: () => import('@/views/manage/profile/MyInfo.vue')
        },
        {
          path: '/myinfo/updateuser',
          component: () => import('@/views/manage/profile/UpdateInfo.vue')
        }
      ]
    }
  ],
})

export default router
