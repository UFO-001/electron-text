<template>
  <div class="header" @mousedown="mouseDown" @mouseup="mouseUp" @mouseleave="mouseleave">
    <el-tooltip content="帮助文档" placement="bottom" hide-after="0">
      <div class="minus" @click="help">
        <el-icon style="width: 5vh; height: 4vh; color: #666">
          <QuestionFilled />
        </el-icon>
      </div>
    </el-tooltip>

    <el-tooltip content="置顶" placement="bottom" hide-after="0">
      <div class="minus" @click="top">
        <el-icon style="width: 5vh; height: 4vh">
          <img style="width: 2.5vh; height: 2.5vh" src="@assets/image/置顶.png" alt="" />
        </el-icon>
      </div>
    </el-tooltip>

    <el-tooltip content="最小化" placement="bottom" hide-after="0">
      <div class="minus" @click="minusEvent">
        <el-icon style="width: 5vh; height: 4vh"><Minus /></el-icon>
      </div>
    </el-tooltip>

    <el-tooltip content="最大化" placement="bottom" hide-after="0">
      <div class="fullScreen" @click="fullScreenEvent">
        <el-icon style="width: 5vh; height: 4vh"><FullScreen /></el-icon>
      </div>
    </el-tooltip>

    <el-tooltip content="关闭" placement="bottom-start" hide-after="0">
      <div class="closeBold" @click="closeBoldEvent">
        <el-icon style="width: 5vh; height: 4vh; color: #666"><CloseBold /></el-icon></div
    ></el-tooltip>
  </div>
</template>

<script setup>
import { Minus, FullScreen, CloseBold, QuestionFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'

const isDown = ref(false) // 鼠标状态
const baseX = ref(0),
  baseY = ref(0) //监听坐标

const isTop = ref(false)

//帮助文档
const help = () => {
  window.open('https://haixiang.app/#/help')
}

//置顶
const top = (e) => {
  window.electron.ipcRenderer.invoke('renderer-to-main', {
    name: 'top-window',
    event: 'event',
    data: 'null'
  })
  isTop.value = !isTop.value

  isTop.value ? (e.currentTarget.className = 'toTop') : (e.currentTarget.className = '')
}

//窗口移动
const mouseDown = (e) => {
  isDown.value = true
  baseX.value = e.clientX
  baseY.value = e.clientY
  console.log(baseX, baseY, 'aaaaaa')
  document.onmousemove = function (e) {
    if (isDown.value) {
      const x = e.clientX - baseX.value
      const y = e.clientY - baseY.value

      window.electron.ipcRenderer.invoke('move-application', {
        posX: x,
        posY: y
      })
      console.log(x, y, 'dddddd')
    }
  }
}

const mouseUp = () => {
  isDown.value = false
}

const mouseleave = () => {
  isDown.value = false
}

//窗口最小化
const minusEvent = () => {
  window.electron.ipcRenderer.invoke('renderer-to-main', {
    name: 'min-window',
    event: 'event',
    data: 'null'
  })
}

//窗口最大化
const fullScreenEvent = () => {
  window.electron.ipcRenderer.invoke('renderer-to-main', {
    name: 'max-window',
    event: 'event',
    data: 'null'
  })
}

//窗口关闭
const closeBoldEvent = () => {
  window.electron.ipcRenderer.invoke('renderer-to-main', {
    name: 'close-window',
    event: 'event',
    data: 'null'
  })
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 4vh;

  .minus,
  .fullScreen,
  .closeBold {
    &:hover {
      cursor: pointer;
      background-color: #c2bebe;
    }
  }
}
.toTop {
  transform: rotate(45deg);
}
</style>
