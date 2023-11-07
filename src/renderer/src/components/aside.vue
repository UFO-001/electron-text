<template>
  <el-menu
    default-active="/setting"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-button plain :icon="collapseIcon" @click="meunBtn" />
    <!-- <el-divider /> -->
    <el-sub-menu
      v-for="item in children"
      :key="item.name"
      :index="`/${item.name}`"
      @click.self="offeee(item.name)"
    >
      <template #title>
        <el-icon style="margin-right: 30px"
          ><img :src="item.imgUrl" alt="" style="width: 30px; height: 30px"
        /></el-icon>

        {{ item.name }}
      </template>

      <el-menu-item
        v-for="childrenItem in item.children"
        :key="childrenItem"
        :index="childrenItem"
        @click.self="jump('user')"
        >item one</el-menu-item
      >
    </el-sub-menu>

    <el-menu-item
      v-for="item in noChildren"
      :key="item"
      :index="`/${item.name}`"
      @click.self="jump(item.name)"
    >
      <el-icon style="margin-right: 30px"
        ><img :src="item.imgUrl" alt="" style="width: 30px; height: 30px"
      /></el-icon>
      <template #title>{{ item.name }}</template>
    </el-menu-item>

    <el-divider />
    <el-menu-item index="/quickReplies" @click.self="jump('quickReplies')">
      <el-icon style="margin-right: 30px"
        ><img src="../assets/image/快捷菜单.png" alt="" style="width: 30px; height: 30px"
      /></el-icon>
      <template #title>快捷回复</template>
    </el-menu-item>
    <el-menu-item index="/setting" @click.self="jump('setting')">
      <el-icon style="margin-right: 30px"
        ><img src="../assets/image/bg-setup.png" alt="" style="width: 30px; height: 30px"
      /></el-icon>
      <template #title>更多设置</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { ref, watch, reactive, onMounted } from 'vue'
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'

//引入菜单列表状态管理库
import { usePlatformStore } from '@store'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const platformStore = usePlatformStore()

const isCollapse = ref(true)
//打开
const handleOpen = (key, keyPath) => {
  if (key !== '/setting' && key !== '/quickReplies') {
    router.push(key)
  }

  // console.log(key, keyPath, 'open')
}
//关闭
const handleClose = (key, keyPath) => {
  if (key !== '/setting' && key !== '/quickReplies') {
    router.push(key)
  }

  // console.log(key, keyPath, 'closer')
}

//侧边栏收缩与展开
const collapseIcon = ref(ArrowRightBold)
const meunBtn = () => {
  isCollapse.value = !isCollapse.value
  isCollapse.value ? (collapseIcon.value = ArrowRightBold) : (collapseIcon.value = ArrowLeftBold)
}

//获取侧边栏item
const { platFromlists } = storeToRefs(platformStore)

const noChildren = ref(null)
const children = ref(null)
watch(
  () => platFromlists.value,
  (newValue) => {
    noChildren.value = newValue.filter((item) => {
      return item.children?.length === 0
    })
    children.value = newValue.filter((item) => {
      return item.children?.length !== 0
    })
    console.log(children.value, 'children.value')
    console.log(newValue, 'newValue')
    console.log(noChildren.value, 'noChildern.value ')
  },
  {
    immediate: true,
    deep: true
  }
)

//跳转
const jump = (item) => {
  // console.log(item, 'dddddd')
  router.push('/' + item)
}
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100vh;
  overflow: hidden;
  background-color: #f1f1f1;
  .el-button {
    width: 100%;
    border-radius: 0;
    height: 5vh;
    border: none;
    background-color: #f1f1f1;
    &:hover {
      box-shadow: 0 0 10px rgba(71, 69, 69, 0.5);
    }
  }
  .el-divider {
    margin: 0;
    padding: 0;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
