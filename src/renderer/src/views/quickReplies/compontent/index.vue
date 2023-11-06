<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-aside width="250px">
          <Aside />
        </el-aside>
        <el-main>
          <Main />
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script setup>
import Aside from './Aside.vue'
import Main from './Main.vue'

// const props = defineProps({
//   foo: String
// })
</script>

<style scoped lang="scss"></style>
