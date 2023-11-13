import { createRouter, createWebHashHistory } from 'vue-router'

//引入路由表
import { routes } from '@router/routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

//引入导航守卫
import { beforeEach, afterEach } from '@router/guards.js'

router.beforeEach(beforeEach)
router.afterEach(afterEach)

export default router
