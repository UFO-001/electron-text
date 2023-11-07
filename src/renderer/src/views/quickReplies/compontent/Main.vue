<template>
  <div>
    <el-button text style="margin-left: 10px" @click="drawer = true">
      <div style="display: flex; align-item: center; color: rgb(8, 231, 231)">
        <el-icon><CirclePlus /></el-icon>
        添加快捷回复
      </div>
    </el-button>
  </div>

  <el-drawer v-model="drawer" title="I am the title" direction="rtl" :before-close="handleClose">
    <span>Hi, there!</span>
  </el-drawer>
  <el-drawer v-model="drawer2" :direction="direction">
    <template #header>
      <h4>set title by slot</h4>
    </template>
    <template #default>
      <div>
        <el-radio v-model="radio1" label="Option 1" size="large">Option 1</el-radio>
        <el-radio v-model="radio1" label="Option 2" size="large">Option 2</el-radio>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">cancel</el-button>
        <el-button type="primary" @click="confirmClick">confirm</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { CirclePlus } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss"></style>
