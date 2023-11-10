<template>
  <div class="aside">
    <el-menu
      default-active="/setting"
      class="el-menu-vertical-demo"
      menu-trigger="click"
      :collapse="isCollapse"
      @select="handleSelect"
    >
      <el-button plain :icon="collapseIcon" @click="meunBtn" />
      <!-- <el-divider /> -->
      <el-sub-menu v-for="item in children" :key="item.name" :index="`/${item.name}`">
        <template #title>
          <div @click="jump(item.name)">
            <el-icon style="margin-right: 30px"
              ><img :src="item.imgUrl" alt="" style="width: 30px; height: 30px"
            /></el-icon>

            {{ item.name }}
          </div>
        </template>

        <el-menu-item v-for="childrenItem in item.children" :key="childrenItem" index="/user"
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
      <!-- <el-menu-item v-for="item in functionMenu" :key="item.name" @click.self="jump(item.index)">
        <img :src="item.imgUrl" alt="" style="width: 30px; height: 30px; margin-right: 30px" />
        <template #title>{{ item.name }}</template>
      </el-menu-item> -->
      <!-- <el-menu-item index="/setting" @click.self="jump('setting')">
        <el-icon style="margin-right: 30px"
          ><img :src="setImg" alt="" style="width: 30px; height: 30px"
        /></el-icon>
        <template #title>更多设置</template>
      </el-menu-item> -->
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

    <!-- 用户信息 -->

    <Transition
      appear
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutLeft"
    >
      <div v-show="!isCollapse" class="card">
        <div class="content">
          <el-icon><User /></el-icon>
          <div class="font">
            <span>邀请码</span>
            <span>FDFDFEWFDSFE</span>
          </div>
          <el-icon class="switch" @click="switchButton"><SwitchButton /></el-icon>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, watch, reactive, onMounted } from 'vue'
import { ArrowLeftBold, ArrowRightBold, User, SwitchButton } from '@element-plus/icons-vue'

//图片地址
// const setImg = ref(new URL('@assets/image/bg-setup.png', import.meta.url).href)
// const shortcutMenuImg = ref(new URL('@assets/image/shortcutMenu.png', import.meta.url).href)

const functionMenu = reactive([
  {
    name: '快捷回复',
    index: 'quickReplies',
    imgUrl: new URL('@assets/PlatformsImage/shortcutMenu.png', import.meta.url).href
  },
  {
    name: '更多设置',
    index: 'setting',
    imgUrl: new URL('@assets/PlatformsImage/bg-setup.png', import.meta.url).href
  }
])

//引入菜单列表状态管理库
import { usePlatformStore } from '@store'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const platformStore = usePlatformStore()

const isCollapse = ref(true)

//退出
const switchButton = () => {
  router.push('/login')
  // console.log('out')
}

//点击菜单栏回调
const handleSelect = (index) => {
  router.push(index)
  // console.log(index, indexPath, routeResult, 'select')
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
    // console.log(children.value, 'children.value')
    // console.log(newValue, 'newValue')
    // console.log(noChildren.value, 'noChildern.value ')
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

.aside {
  position: relative;
  .card {
    position: absolute;
    width: 150px;
    height: 50px;
    bottom: 50px;
    left: 25px;
    padding: 0;
    background-color: rgba(141, 228, 101, 0.849);
    border-radius: 10px;
    cursor: pointer;
    .content {
      margin: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: nowrap;
      .el-icon {
        width: 20px;
        height: 20px;
        color: #0f0f0f;
      }
      .switch {
        &:hover {
          color: #ff0202;
          animation: name;
        }
      }
      .font {
        display: flex;
        width: 80px;
        flex-wrap: wrap;
        span {
          font-size: 12px;

          &:nth-child(2) {
            font-size: 8px;
          }
        }
      }
    }
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
