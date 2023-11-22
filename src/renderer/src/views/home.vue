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

<script setup lang="ts">
//引入侧边栏
import Aside from '@components/aside.vue'
import Header from '@components/header.vue'

import { useRoute } from 'vue-router'
// import { onActivated } from 'vue'
// const route = useRoute()

// onActivated(() => {
//   console.log(route.path, 'routepath')
// })
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
  height: 4vh;
}
</style>
