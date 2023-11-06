<template>
  <div
    class="header"
    @mousedown="mouseDown"
    @mousemove="mouseMove"
    @mouseup="mouseUp"
    @mouseleave="mouseleave"
  >
    <div class="minus" @click="minusEvent">
      <el-icon style="width: 5vh; height: 4vh"><Minus /></el-icon>
    </div>
    <div class="fullScreen" @click="fullScreenEvent">
      <el-icon style="width: 5vh; height: 4vh"><FullScreen /></el-icon>
    </div>
    <div class="closeBold" @click="closeBoldEvent">
      <el-icon style="width: 5vh; height: 4vh; color: #666"><CloseBold /></el-icon>
    </div>
  </div>
</template>

<script setup>
import { Minus, FullScreen, CloseBold } from '@element-plus/icons-vue'
import { ref } from 'vue'

const isDown = ref(false) // 鼠标状态
const baseX = ref(0),
  baseY = ref(0) //监听坐标

const mouseDown = (e) => {
  isDown.value = true
  baseX.value = e.clientX
  baseY.value = e.clientY
  console.log(baseX, baseY, 'aaaaaa')
}

const mouseMove = (e) => {
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

const mouseUp = () => {
  isDown.value = false
}

const mouseleave = () => {
  isDown.value = false
}

const minusEvent = () => {
  window.electron.ipcRenderer.invoke('renderer-to-main', {
    name: 'min-window',
    event: 'event',
    data: 'null'
  })
}

const fullScreenEvent = () => {
  window.electron.ipcRenderer.invoke('renderer-to-main', {
    name: 'max-window',
    event: 'event',
    data: 'null'
  })
}
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
      // border: 1px solid #a8a4a4;
      // transform: scale(1.01);
      // box-shadow: 0 0 10px rgba(223, 220, 220, 0.5);
    }
  }
}
</style>
