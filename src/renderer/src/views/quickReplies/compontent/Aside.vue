<template>
  <div class="aside">
    <div class="a-top">
      <el-button text @click="dialogFormVisible = true">
        <div style="display: flex; align-item: center; color: rgb(8, 231, 231)">
          <el-icon><CirclePlus /></el-icon>
          添加分组
        </div>
      </el-button>

      <el-switch v-model="value" active-text="快捷窗口" />
    </div>
    <el-divider style="margin: 0; padding: 0"></el-divider>

    <el-dialog v-model="dialogFormVisible" title="添加分组" align-center width="40%">
      <el-form :model="form">
        <el-input v-model="form.name" autocomplete="off" placeholder="请输入自定义的分组名" />
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { CirclePlus } from '@element-plus/icons-vue'

const dialogFormVisible = ref(false)

const value = ref(false)

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})
</script>

<style scoped lang="scss">
.aside {
  margin-right: 5px;
  .a-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  }
}
</style>
