<template>
  <div class="Zalo">
    <!-- 顶部内容 -->
    <header>
      <div class="h-left">
        <span>会话列表</span>
        <span>会话:0/3</span>
        <a href="">
          <el-icon><Share /></el-icon> 分享链接
        </a>
        <span class="create">
          <el-icon><CirclePlus /></el-icon> 新增 {{ plat }}
        </span>
      </div>
      <div class="h-right">
        <div class="content">
          <span class="dot"></span> 已连接安全加密链路 <el-icon><Lock /></el-icon>
        </div>
      </div>
    </header>

    <!--主体内容 -->
    <main>
      <Table></Table>
    </main>
  </div>
</template>

<script setup>
import { Share, CirclePlus, Lock } from '@element-plus/icons-vue'

import Table from './table/index.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const plat = ref('')
onMounted(() => {
  plat.value = route.path.split('/')[1]
  // console.log(route.path, 'paaaaaaaa')
})
</script>

<style scoped lang="scss">
.Zalo {
  padding: 1vh;
  height: 98vh;
  width: auto;
  background-color: rgb(240, 242, 245);
  overflow: hidden;
  margin: 0;
  header {
    height: 5vh;
    width: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .h-left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span {
        &:nth-child(1) {
          margin-right: 8px;
          cursor: pointer;
        }
        &:nth-child(2) {
          display: inline-block;
          width: 60px;
          height: 3vh;
          font-size: 0.8rem;
          border-radius: 2vh;
          overflow: hidden;
          margin-right: 12px;
          text-align: center;
          line-height: 3vh;
          padding: auto;
          background-color: rgb(62, 230, 90);
        }
      }
      a {
        text-decoration: none;
        color: #409eff;
        margin-right: 20px;
      }
      .create {
        color: #409eff;
        font-size: 14px;
        cursor: pointer;
      }
    }
    .h-right {
      .content {
        display: flex;
        align-items: center;
        color: #666;
      }
      .dot {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: rgb(18, 218, 35);
        margin-right: 10px;
      }
      .el-icon {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
