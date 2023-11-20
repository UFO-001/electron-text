//前置导航守卫

export const beforeEach = (to) => {
  if (to.path === '/login') {
    return
  }
  if (!sessionStorage.getItem('token')) {
    return '/login'
  }
}

//后置导航守卫

export const afterEach = () => {}
