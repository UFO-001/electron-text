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
    <div class="upload">
      <!-- 导入 -->
      <el-upload
        class="upload-demo"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        multiple
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :limit="3"
        :on-exceed="handleExceed"
      >
        <el-button type="primary" size="small">
          <el-icon style="margin-right: 5px"><FolderAdd /></el-icon>我要导入</el-button
        >
        <!-- <template #tip>
          <div class="el-upload__tip">jpg/png files with a size less than 500KB.</div>
        </template> -->
      </el-upload>

      <!-- 导出 -->
      <el-button size="small" style="margin-left: 20px">
        <el-icon style="margin-right: 5px"><FolderRemove /></el-icon>我要导出</el-button
      >
    </div>

    <!-- 添加分组的弹出框 -->
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
import { CirclePlus, FolderAdd, FolderRemove } from '@element-plus/icons-vue'

const dialogFormVisible = ref(false)

const value = ref(false)

const form = reactive({
  name: ''
})

//导入
import { ElMessage, ElMessageBox } from 'element-plus'

import type { UploadProps, UploadUserFile } from 'element-plus'

const fileList = ref<UploadUserFile[]>([
  {
    name: 'element-plus-logo.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg'
  },
  {
    name: 'element-plus-logo2.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg'
  }
])

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(`Cancel the transfer of ${uploadFile.name} ?`).then(
    () => true,
    () => false
  )
}
</script>

<style scoped lang="scss">
.aside {
  margin-right: 5px;
  height: 82vh;
  position: relative;
  .a-top {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 5px;
  }
  .upload {
    display: flex;

    height: 5vh;
    justify-content: center;
    padding: 5px;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
  }
}
</style>
