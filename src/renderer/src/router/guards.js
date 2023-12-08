//前置导航守卫
import { usePlatformStore } from '../store/index'
import { useRouter } from 'vue-router'

export const beforeEach = (to) => {
  if (to.path === '/login' || to.path === '/update') {
    return
  }
  if (!sessionStorage.getItem('token')) {
    return '/login'
  }
}

//后置导航守卫

export const afterEach = () => {}
