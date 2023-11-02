import { createRouter, createWebHashHistory } from 'vue-router'

//引入路由表
import { routes } from '@router/routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
