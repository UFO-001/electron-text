<!-- eslint-disable vue/no-unused-vars -->
<template>
  <el-table :data="tableData" style="width: 100%; height: 90vh">
    <el-table-column label="序号" width="70">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.serialNumber }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="创建于" min-width="130">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.time }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="会话记录" min-width="130">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.conversation }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="用户名" min-width="130">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="最后修改" min-width="130">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.modifyTime }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="备注信息" min-width="130">
      <template #default="scope">
        <div style="display: flex; align-items: center" class="showIcon">
          <span v-if="showTit" style="width: 120px; margin-right: 10px">{{
            scope.row.remark
          }}</span>
          <el-input
            v-else
            v-model="scope.row.remark"
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
        <el-button
          type="primary"
          round
          size="small"
          :class="{ active: scope.row.initiate }"
          @click="handleEdit(scope.$index, scope.row)"
          >{{ scope.row.initiate ? '显示' : '启动' }}</el-button
        >
        <el-button
          round
          size="small"
          type="danger"
          :class="{ delete: scope.row.initiate }"
          @click="handleDelete(scope.$index, scope.row)"
          >{{ scope.row.initiate ? '关闭' : '删除' }}</el-button
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
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()

//启动，关闭事件
const handleEdit = (index, row) => {
  const routePath = route.path.slice(1)

  // console.log(routePath, row.name, 'llllll')
  //启动按钮变化
  if (!tableData[index].initiate) {
    //启动按钮
    platformStore.editPlatformList(routePath, row.name)
    tableData[index].initiate = !tableData[index].initiate
  } else {
    //显示按钮
  }

  console.log(index, row, routePath)
}
const handleDelete = (index, row) => {
  if (!tableData[index].initiate) {
    //删除按钮
    tableData.splice(index, 1)
  } else {
    // 关闭按钮
    platformStore.delePlatformList(route.path.slice(1), row.name)
    tableData[index].initiate = !tableData[index].initiate
  }
}

//备注事件
const showTit = ref(true)
const edit = (rowValue) => {
  if (!showTit.value) {
    console.log(rowValue, 'rowValue')
  }
  showTit.value = !showTit.value
}

const tableData = reactive([
  {
    serialNumber: '1',
    time: '11-07 11.08',
    conversation: 'No. 189, Grove St, Los Angeles',
    username: 'ddd',
    modifyTime: '11-07 11.08',
    remark: '22',
    initiate: false
  },
  {
    serialNumber: '1',
    time: '11-07 11.08',
    conversation: 'No. 189, Grove St, Los Angeles',
    username: 'ddd',
    modifyTime: '11-07 11.08',
    remark: '22',
    initiate: false
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

.active {
  background-color: rgba(18, 231, 36, 0.966);
  color: white;
  border: 0;
}
.delete {
  background-color: rgba(224, 224, 3, 0.856);
  color: white;
  border: 0;
}
</style>
