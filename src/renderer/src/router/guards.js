//前置导航守卫
import { usePlatformStore } from '../store/index'
import { useRouter } from 'vue-router'

export const beforeEach = (to) => {
  if (to.path === '/login') {
    return
  }
  if (!sessionStorage.getItem('token')) {
    return '/login'
  }

  try {
    const platformStore = usePlatformStore()
    const router = useRouter()
    platformStore.platFromlists.forEach((item) => {
      // console.log(item.children, item.name, 'item.children')

      if (item.children.length !== 0) {
        item.children.forEach((items, index) => {
          router.addRoute('Home', {
            path: '/' + item.name + '/' + items,
            name: item.name + '-' + items,
            component: loadingComponent(item.name, index)
          })
        })
      }
    })
  } catch (e) {
    // return '/login'
    // console.log(e, 'e')
  }

  // console.log(platformStore.platFromlists, 'oooooo')
}

//重构路由
const modules = import.meta.glob('@renderer/views/platUser/**/*.vue')
// console.log(modules['/src/views/platUser/Line/user1.vue'], 'vue文件路径')
const loadingComponent = (name, index) => {
  const routeName = name + '/' + index
  let routes = null
  Object.keys(modules).forEach((element) => {
    const componentName = element.replace('/src/views/platUser/', '').replace('.vue', '')
    if (componentName === routeName) {
      // console.log('888')
      // console.log(modules[element], '999')
      routes = modules[element]
    }

    // console.log(componentName, 'componentName')
    // console.log(routeName, 'routeName')
    // if (element.indexOf(name) !== -1) {

    // }
  })
  return routes
}

//后置导航守卫

export const afterEach = () => {}
