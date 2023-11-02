export const routes = [
  {
    path: '/',
    component: () => import('@views/home.vue'),
    children: [
      {
        path: '/setting',
        component: () => import('@views/setting/index.vue')
      },
      {
        path: '/text',
        component: () => import('@views/text/index.vue')
      },
      {
        path: '/user1',
        component: () => import('@views/user/index.vue')
      },
      {
        path: '/Zalo',
        component: () => import('@views/user/index.vue')
      },
      {
        path: '/user2',
        component: () => import('@views/user/user2.vue')
      }
    ]
  },
  {
    path: '/about',
    component: () => import('@views/about.vue')
  },
  {
    path: '/login',
    component: () => import('@views/login.vue')
  }
]
