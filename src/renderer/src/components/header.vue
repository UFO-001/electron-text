<template>
  <div class="header" @mousedown="mouseDown" @mouseup="mouseUp" @mouseleave="mouseleave">
    <el-tooltip content="帮助文档" placement="bottom" :hide-after="0">
      <div class="fullScreen" @click="help">
        <el-icon style="width: 5vh; height: 5vh; color: #666">
          <QuestionFilled />
        </el-icon>
      </div>
    </el-tooltip>

    <el-tooltip content="检查更新" placement="bottom" :hide-after="0">
      <div class="update">
        <Transition
          enter-active-class="animate__animated animate__zoomIn"
          leave-active-class="animate__animated animate__zoomOut"
        >
          <el-icon
            v-show="isDownload"
            style="width: 5vh; height: 5vh; color: #666"
            :class="{ revolve: isUpdate }"
            @click="updateBtn"
          >
            <Refresh />
          </el-icon>
        </Transition>
        <Transition
          enter-active-class="animate__animated animate__zoomIn"
          leave-active-class="animate__animated animate__zoomOut"
        >
          <el-progress
            v-show="!isDownload"
            type="circle"
            :percentage="percentage"
            status="success"
            width="20"
            stroke-width="2"
          >
          </el-progress>
        </Transition>
      </div>
    </el-tooltip>

    <el-tooltip content="置顶" placement="bottom" :hide-after="0">
      <div class="fullScreen" @click="top">
        <el-icon style="width: 5vh; height: 5vh">
          <img style="width: 2.5vh; height: 2.5vh" src="@assets/image/置顶.png" alt="" />
        </el-icon>
      </div>
    </el-tooltip>

    <div :class="{ minus: isMinus }" @click="minusEvent" @mousemove="moveEvent">
      <el-icon style="width: 5vh; height: 5vh"><Minus /></el-icon>
    </div>

    <div class="fullScreen" @click="fullScreenEvent">
      <el-icon style="width: 5vh; height: 5vh"><FullScreen /></el-icon>
    </div>

    <div class="closeBold" @click="closeBoldEvent">
      <el-icon style="width: 5vh; height: 5vh; color: #666"><CloseBold /></el-icon>
    </div>
  </div>
</template>

<script setup>
import { Minus, FullScreen, CloseBold, QuestionFilled, Refresh } from '@element-plus/icons-vue'
import { ref } from 'vue'

const isDown = ref(false) // 鼠标状态
const baseX = ref(0),
  baseY = ref(0) //监听坐标

const isTop = ref(false)

//最小化样式问题
const isMinus = ref(true)
const moveEvent = () => {
  isMinus.value = true
}

//检查更新
const isDownload = ref(true) //是否在下载
const isUpdate = ref(false)
const percentage = ref(0)

const updateBtn = () => {
  isUpdate.value = true
  window.electron.ipcRenderer.send('renderer-to-main', {
    name: 'update',
    event: 'event',
    data: 'null'
  })

  window.electron.ipcRenderer.on('update', (e, tags) => {
    isUpdate.value = tags
  })
  window.electron.ipcRenderer.on('isDownload', (e, tags) => {
    isDownload.value = tags
  })
  window.electron.ipcRenderer.on('percentage', (e, tags) => {
    if (tags >= 100) {
      isDownload.value = true
    }
    percentage.value = tags
  })
}

//帮助文档
const help = () => {
  window.open('https://haixiang.app/#/help')
}

//置顶
const top = (e) => {
  window.electron.ipcRenderer.send('renderer-to-main', {
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
  // console.log(baseX, baseY, 'aaaaaa')
  document.onmousemove = function (e) {
    if (isDown.value) {
      const x = e.clientX - baseX.value
      const y = e.clientY - baseY.value

      window.electron.ipcRenderer.invoke('move-application', {
        posX: x,
        posY: y
      })
      // console.log(x, y, 'dddddd')
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
  window.electron.ipcRenderer.send('renderer-to-main', {
    name: 'min-window',
    event: 'event',
    data: 'null'
  })
  isMinus.value = !isMinus.value
}

//窗口最大化
const fullScreenEvent = () => {
  window.electron.ipcRenderer.send('renderer-to-main', {
    name: 'max-window',
    event: 'event',
    data: 'null'
  })
}

//窗口关闭
const closeBoldEvent = () => {
  window.electron.ipcRenderer.send('renderer-to-main', {
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
  height: 5vh;

  .update,
  .minus,
  .fullScreen,
  .closeBold {
    position: relative;
    &:hover {
      cursor: pointer;
      background-color: #c2bebe;
    }
  }

  .revolve {
    animation: revolve 1s linear infinite;
  }
}

@keyframes revolve {
  100% {
    transform: rotate(-360deg);
  }
}
.toTop {
  transform: rotate(45deg);
}
</style>
