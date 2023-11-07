<!-- eslint-disable vue/no-unused-vars -->
<template>
  <el-table :data="tableData" style="width: 100%; height: 90vh">
    <el-table-column label="序号" width="70">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="创建于" min-width="130">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="会话记录" min-width="130">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="用户名" min-width="130">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="最后修改" min-width="130">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="备注信息" min-width="130">
      <template #default="scope">
        <div style="display: flex; align-items: center" class="showIcon">
          <span v-if="showTit" style="width: 120px; margin-right: 10px">{{ scope.row.date }}</span>
          <el-input
            v-else
            v-model="scope.row.date"
            style="margin-right: 10px"
            size="small"
          ></el-input>
          <el-icon @click="edit(scope.row)">
            <component :is="showTit ? EditPen : Check"></component>
          </el-icon>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="操作" min-width="130">
      <template #default="scope">
        <el-button round size="small" @click="handleEdit(scope.$index, scope.row)">启动</el-button>
        <el-button round size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { Timer, EditPen, Check } from '@element-plus/icons-vue'
import { usePlatformStore } from '@store'
import { reactive, ref } from 'vue'
const platformStore = usePlatformStore()
import { useRoute } from 'vue-router'

const route = useRoute()

const handleEdit = (index, row) => {
  const routePath = route.path.slice(1)
  platformStore.editPlatformList(routePath, row.name)
  console.log(routePath, row.name, 'llllll')

  console.log(index, row, routePath)
}
const handleDelete = (index, row) => {
  console.log(index, row)
}

const showTit = ref(true)
const edit = (rowValue) => {
  if (!showTit.value) {
    console.log(rowValue, 'rowValue')
  }
  showTit.value = !showTit.value
}

const tableData = reactive([
  {
    date: '1',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '1',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '1',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
])
</script>

<style scoped lang="scss">
.showIcon {
  &:hover {
    .el-icon {
      visibility: visible;
      color: rgb(127, 231, 135);
      cursor: pointer;
    }
  }
  .el-icon {
    visibility: hidden;
    margin-right: 0;
  }
}
</style>
