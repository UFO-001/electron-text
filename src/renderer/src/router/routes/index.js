export const routes = [
  {
    path: '/',
    redirect: '/setting',
    name: 'Home',
    component: () => import('@views/home.vue'),
    children: [
      {
        path: '/setting',

        component: () => import('@views/setting/index.vue')
      },

      {
        path: '/user1',
        component: () => import('@views/user/index.vue')
      },
      {
        path: '/Zalo',
        component: () => import('@views/asideFrom/Zalo.vue')
      },
      {
        path: '/Skype',
        component: () => import('@views/asideFrom/Skype.vue')
      },
      {
        path: '/Whatsapp',
        component: () => import('@views/asideFrom/Whatsapp.vue')
      },
      {
        path: '/Telegram',
        component: () => import('@views/asideFrom/Telegram.vue')
      },
      {
        path: '/Meta',
        component: () => import('@views/asideFrom/Meta.vue')
      },
      {
        path: '/Messenger',
        component: () => import('@views/asideFrom/Messenger.vue')
      },
      {
        path: '/Line',
        component: () => import('@views/asideFrom/Line.vue')
      },

      {
        path: '/user',
        component: () => import('@views/user/user.vue')
      },
      {
        path: '/quickReplies',
        component: () => import('@views/quickReplies/index.vue')
      }
    ]
  },

  {
    path: '/login',
    component: () => import('@views/login.vue')
  }
]
