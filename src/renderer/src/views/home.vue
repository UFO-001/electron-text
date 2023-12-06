<template>
  <div class="common-layout">
    <el-container>
      <el-header> <Header></Header> </el-header>
      <el-container>
        <el-aside width="auto">
          <!-- 侧边栏 -->
          <Aside></Aside>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
//引入侧边栏
import Aside from '@components/aside.vue'
import Header from '@components/header.vue'

import { usePlatformStore } from '../store/index'
import { useRouter } from 'vue-router'

import { onMounted } from 'vue'

onMounted(() => {
  //引入store
  const platformStore = usePlatformStore()
  //引入router
  const router = useRouter()
  //对store数据处理
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
})

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
  })
  return routes
}
</script>

<style scoped lang="scss">
.el-main {
  padding: 0px;
  margin: 0;
  border: 0;
}
.common-layout {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.el-container .el-header {
  padding: 0px;
  margin: 0;
  border: 0;
  height: 5vh;
}
</style>
