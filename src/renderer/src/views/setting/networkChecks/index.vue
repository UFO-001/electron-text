<template>
  <div>
    <button @click="btn">打开</button>
    <div @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp">
      鼠标从按下到提起移动的距离是：{{ distance.dx }},{{ distance.dy }}
    </div>
  </div>
</template>

<script>
// const btn = () => {
//   window.electron.ipcRenderer.invoke('open-file-dialog', {
//     name: 'open-window',
//     event: 'event',
//     data: 'null'
//   })
// }
export default {
  data() {
    return {
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      isMouseDown: false
    }
  },
  computed: {
    distance() {
      const dx = this.endX - this.startX
      const dy = this.endY - this.startY
      return { dx, dy }
    }
  },
  methods: {
    mouseDown(event) {
      this.startX = event.clientX
      this.startY = event.clientY
      this.isMouseDown = true
    },
    mouseMove(event) {
      if (this.isMouseDown) {
        this.endX = event.clientX
        this.endY = event.clientY
      }
    },
    mouseUp() {
      this.isMouseDown = false
    }
  }
}
</script>

<style scoped lang="scss"></style>
