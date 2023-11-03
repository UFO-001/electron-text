<template>
  <div>
    <button @click="btn">打开</button>
  </div>
</template>

<script setup>
const btn = () => {
  window.electron.ipcRenderer.invoke('open-file-dialog', {
    name: 'open-window',
    event: 'event',
    data: 'null'
  })
}
</script>

<style scoped lang="scss"></style>
