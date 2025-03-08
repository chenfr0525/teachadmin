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
      component: () => import('@/views/studentpage/LayoutContainer.vue'),
      redirect:'/user/home',
      children:[
        {
          path:'/user/home',
          component:()=>import('@/views/studentpage/HomePage.vue')
        },
        {
          path:'/user/info',
          component:()=>import('@/views/studentpage/infomation/index.vue')
        },
        {
          path:'/user/codelearn',
          component:()=>import('@/views/studentpage/codeLearn/index.vue')
        },
        {
          path:'/user/codeteach',
          component:()=>import('@/views/studentpage/codeTeach/index.vue')
        },
        {
          path:'/user/knowledgeintegrate',
          component:()=>import('@/views/studentpage/knowledgeIntegrate/index.vue')
        },
        {
          path:'/user/personlearn',
          component:()=>import('@/views/studentpage/personLearn/index.vue')
        },
        {
          path:'/user/smartanswer',
          component:()=>import('@/views/studentpage/smartAnswer/index.vue')
        },
        {
          path:'/user/userprofile',
          component:()=>import('@/views/studentpage/userinfo/UserProfile.vue')
        },
        {
          path:'/user/updateInfo',
          component:()=>import('@/views/studentpage/userinfo/UpdateInfo.vue')
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
