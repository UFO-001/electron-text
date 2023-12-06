<template>
  <el-table
    :data="tableData"
    style="width: 100%; height: 90vh"
    header-cell-class-name="headerClass"
  >
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
import { reactive, ref, onMounted, inject, computed } from 'vue'
const platformStore = usePlatformStore()
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  modelValue: Number
})

console.log('props', props)
const emit = defineEmits(['update:modelValue'])

const list = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
    console.log('22222')
  }
})

// <!-- 引入useRouter函数 -->
const router = useRouter()
// <!-- 引入useRoute函数 -->
const route = useRoute()

// <!-- 引入Info函数 -->
const info = inject('Info')

console.log(platformStore.platFromlists, 'aaaa')
//页面启动
onMounted(() => {
  list.value = tableData.length

  platformStore.platFromlists.forEach((item) => {
    if (item.name == info) {
      if (item.children.length !== 0) {
        tableData.forEach((item1) => {
          item.children.indexOf(item1.username) !== -1
            ? (item1.initiate = true)
            : (item1.initiate = false)
        })
      }
    }
  })
})

// const headerClass=()
//启动，关闭事件
const handleEdit = (index, row) => {
  const routePath = route.path.slice(1)

  // console.log(routePath, row.name, 'llllll')
  //启动按钮变化
  if (!tableData[index].initiate) {
    //启动按钮
    platformStore.editPlatformList(routePath, row.username)
    tableData[index].initiate = !tableData[index].initiate

    platformStore.platFromlists.forEach((item) => {
      console.log(item.children, item.name, 'item.children')

      if (item.children.length !== 0) {
        item.children.forEach((items, index) => {
          router.addRoute('Home', {
            path: '/' + item.name + '/' + items,
            name: item.name + '-' + items,
            component: loadingComponent(item.name, index)
          })
        })
      }
    })
    // router.addRoute('Home', {
    //   path: '/' + row.username,
    //   name: row.username,
    //   component: () => import('@views/user/user.vue')
    // })
    router.push('/' + info + '/' + row.username)
    // console.log(router.hasRoute(row.username), 'router.hasRoute')
  } else {
    //显示按钮
    router.push('/' + info + '/' + row.username)
  }

  console.log(index, row, routePath)
}

//重构路由
const modules = import.meta.glob('@renderer/views/platUser/**/*.vue')
// console.log(modules['/src/views/platUser/Line/user1.vue'], 'vue文件路径')
const loadingComponent = (name, index) => {
  const routeName = name + '/' + index
  let routes = null
  Object.keys(modules).forEach((element) => {
    const componentName = element.replace('/src/views/platUser/', '').replace('.vue', '')
    if (componentName === routeName) {
      console.log('888')
      console.log(modules[element], '999')
      routes = modules[element]
    }

    // console.log(componentName, 'componentName')
    // console.log(routeName, 'routeName')
    // if (element.indexOf(name) !== -1) {

    // }
  })
  return routes
}

//删除事件
const handleDelete = (index, row) => {
  if (!tableData[index].initiate) {
    //删除按钮
    tableData.splice(index, 1)
    list.value = tableData.length
  } else {
    // 关闭按钮
    router.removeRoute(row.username)
    // console.log(router.hasRoute(row.username), 'router.hasRoute(row.username)')
    platformStore.delePlatformList(route.path.slice(1), row.username)
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
    username: 'fff',
    modifyTime: '11-07 11.08',
    remark: '22',
    initiate: false
  },
  {
    serialNumber: '1',
    time: '11-07 11.08',
    conversation: 'No. 189, Grove St, Los Angeles',
    username: 'fff',
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
      color: rgb(19, 188, 255);
      cursor: pointer;
    }
  }
  .el-icon {
    visibility: hidden;
    margin-right: 0;
  }
}

:deep(.headerClass) {
  background-color: rgb(236, 236, 236) !important;
  color: rgb(42, 42, 43);
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
