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
      redirect: '/user/home',
      children: [
        {
          path: '/user/home',
          component: () => import('@/views/studentpage/HomePage.vue')
        },
        {
          path: '/user/info',
          component: () => import('@/views/studentpage/infomation/index.vue')
        },
        {
          path: '/user/codelearn',
          component: () => import('@/views/studentpage/codeLearn/LayoutContainer.vue'),
          redirect:'/user/codelearn/home',
          children: [
            {
              path: '/user/codelearn/home',
              component: () => import('@/views/studentpage/codeLearn/HomePage.vue'),
            },
            {
              path: '/user/codelearn/algorithms',
              component: () => import('@/views/studentpage/codeLearn/codepage/Algorithms.vue'),
            },
            {
              path: '/user/codelearn/codeerrors',
              component: () => import('@/views/studentpage/codeLearn/codepage/CodeErrors.vue'),
            },
          ]
        },
        {
          path: '/user/codeteach',
          component: () => import('@/views/studentpage/codeTeach/index.vue')
        },
        {
          path: '/user/knowledgeintegrate',
          component: () => import('@/views/studentpage/knowledgeIntegrate/LayoutContainer.vue'),
          redirect: '/user/knowledgeintegrate/home',
          children: [
            {
              path: '/user/knowledgeintegrate/home',
              component: () => import('@/views/studentpage/knowledgeIntegrate/HomePage.vue'),
            },
            {
              path: '/user/knowledgeintegrate/course',
              component: () => import('@/views/studentpage/knowledgeIntegrate/course/CourseList.vue'),
            },
            {
              path: '/user/knowledgeintegrate/course/:id',
              component: () => import('@/views/studentpage/knowledgeIntegrate/course/CourseDetail.vue'),
              props: true
            }
          ]
        },
        {
          path: '/user/personlearn',
          component: () => import('@/views/studentpage/personLearn/index.vue')
        },
        {
          path: '/user/personlearndetail',
          component: () => import('@/views/studentpage/personLearn/components/Detail.vue')
        },
        {
          path: '/user/smartanswer',
          component: () => import('@/views/studentpage/smartAnswer/index.vue')
        },
        {
          path: '/user/userprofile',
          component: () => import('@/views/studentpage/userinfo/UserProfile.vue')
        },
        {
          path: '/user/updateInfo',
          component: () => import('@/views/studentpage/userinfo/UpdateInfo.vue')
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
