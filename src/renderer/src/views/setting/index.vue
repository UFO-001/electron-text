<template>
  <div class="setting">
    <p>更多设置</p>
    <el-card class="box-card">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane name="first">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><Document /></el-icon>
              <span>翻译设置</span>
            </span>
          </template>
          <translationSettings></translationSettings>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><Monitor /></el-icon>
              <span>网络设置</span>
            </span>
          </template>
          <networkSettings></networkSettings>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><Switch /></el-icon>
              <span>快捷设置</span>
            </span>
          </template>
          快捷设置
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><House /></el-icon>
              <span>支持平台</span>
            </span>
          </template>
          <!-- 支持平台 -->
          <supportPlatforms></supportPlatforms>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><Filter /></el-icon>
              <span>网络检查</span>
            </span>
          </template>
          网络检查
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { Document, Monitor, Switch, House, Filter } from '@element-plus/icons-vue'

// 引用组件
import supportPlatforms from './Support Platforms/index.vue'
import translationSettings from './translationSettings/index.vue'
import networkSettings from './networkSettings/index.vue'
const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style scoped lang="scss">
.setting {
  padding: 1vh;
  height: 98vh;
  width: auto;
  background-color: rgb(240, 242, 245);
  overflow: hidden;
  p {
    padding: 0;
    height: 3vh;
    font-size: 14px;
    line-height: 3vh;
    color: #999;
    margin-bottom: 10px;
  }
  .box-card {
    width: auto;
    height: 100%;
    .demo-tabs > .el-tabs__content {
      padding: 32px;
      color: #6b778c;
      font-size: 32px;
      font-weight: 600;
    }
  }
}
</style>
