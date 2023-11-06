<template>
  <div class="quickReplies">
    <div class="header">
      <span>快捷回复</span> <span></span>
      <span>预先设置一些常见问题的回复用语,帮助您提高回复效率.</span>
      <a href=""> 点我下载模板</a>
    </div>

    <div class="main">
      <el-tabs v-model="activeName" class="demo-tabs" stretch="ture" @tab-click="handleClick">
        <el-tab-pane v-for="item in meunItem" :key="item.name" :name="item.name">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon style="margin-right: 5px">
                <img :src="item.imgUrl" alt="" style="width: 20px; height: 20px" />
              </el-icon>
              <span>{{ item.name }}</span>
            </span>
          </template>
          <Public :foo="item.name" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { TabsPaneContext } from 'element-plus'

//引入公共组件
import Public from './compontent/index.vue'

const activeName = ref('Zalo')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const meunItem = reactive([
  {
    name: 'Zalo',
    imgUrl: '/src/assets/PlatformsImage/Zalo.png'
  },
  {
    name: 'Whatsapp',
    imgUrl: '/src/assets/PlatformsImage/Whatsapp.png'
  },
  {
    name: 'Telegram',
    imgUrl: '/src/assets/PlatformsImage/Telegram.png'
  },
  {
    name: 'Skype',
    imgUrl: '/src/assets/PlatformsImage/Skype.png'
  },
  {
    name: 'Meta',
    imgUrl: '/src/assets/PlatformsImage/Meta.png'
  },
  {
    name: 'Messenger',
    imgUrl: '/src/assets/PlatformsImage/Messenger.png'
  },
  {
    name: 'Line',
    imgUrl: '/src/assets/PlatformsImage/Line.png'
  }
])
</script>

<style scoped lang="scss">
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
.quickReplies {
  padding: 1vh;
  height: 98vh;
  width: auto;
  background-color: rgb(240, 242, 245);
  overflow: hidden;

  .header {
    margin: 10px;
    span {
      font-size: 14px;
      color: rgb(112, 111, 111);
      &:nth-child(2) {
        display: inline-block;
        width: 1vh;
        height: 1vh;
        border-radius: 50%;
        background-color: rgb(20, 236, 20);
        overflow: hidden;
        margin: 0 5px 0 5px;
      }
      &:nth-child(3) {
        font-size: 12px;
      }
    }
    a {
      font-size: 14px;
      text-decoration: none;
      margin-left: 10px;
      color: rgb(3, 126, 126);
    }
  }
}
</style>
