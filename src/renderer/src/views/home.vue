<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <!-- 侧边栏 -->
        <Aside></Aside>
      </el-aside>
      <el-container>
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
</script>

<style scoped lang="scss">
.el-main {
  padding: 0px;
  margin: 0;
  border: 0;
}
</style>
