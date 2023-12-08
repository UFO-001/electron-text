<template>
  <div class="demo-progress">
    <el-progress
      :percentage="percentage"
      :stroke-width="15"
      :color="changeColor(percentage)"
      :duration="duration"
      striped
      striped-flow
    />
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'

const percentage = ref(0)
const duration = computed(() => Math.floor(percentage.value / 10))

const changeColor = (percentage) => {
  if (percentage == 100) {
    return 'green'
  }
}

onMounted(() => {
  window.electron.ipcRenderer.on('downloadProgress', (e, arg) => {
    percentage.value = parseInt(arg.percent)
  })
})
</script>

<style scoped lang="scss">
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
  color: green;
}
</style>
