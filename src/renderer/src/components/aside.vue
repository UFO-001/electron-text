<template>
  <el-menu
    router
    default-active="/setting"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-button type="info" plain :icon="collapseIcon" @click="meunBtn" />

    <el-sub-menu
      v-for="item in children"
      :key="item.name"
      :index="`/${item.name}`"
      @click="offeee(item.name)"
    >
      <template #title>
        <el-icon style="margin-right: 30px"
          ><img :src="item.imgUrl" alt="" style="width: 30px; height: 30px"
        /></el-icon>

        {{ item.name }}
      </template>
      <el-menu-item-group v-if="item.children">
        <el-menu-item v-for="childrenItem in item.children" :key="childrenItem" index="/user2"
          >item one</el-menu-item
        >
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item v-for="item in noChildren" :key="item" :index="`/${item.name}`">
      <el-icon style="margin-right: 30px"
        ><img :src="item.imgUrl" alt="" style="width: 30px; height: 30px"
      /></el-icon>
      <template #title>{{ item.name }}</template>
    </el-menu-item>

    <el-menu-item index="/setting">
      <el-icon><setting /></el-icon>
      <template #title>更多设置</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { ref, watch, reactive, computed, onMounted } from 'vue'
import { Setting, ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'

//引入菜单列表状态管理库
import { usePlatformStore } from '@store'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const platformStore = usePlatformStore()

const isCollapse = ref(true)
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
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

const offeee = (item) => {
  console.log(item, 'dddddd')
  router.push('/' + item)
}
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100vh;
  .el-button {
    width: 100%;
    height: 5vh;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
