<template>
  <div>666</div>
</template>

<script setup>
import { BrowserView } from 'electron'

const view = new BrowserView()
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
</script>

<style scoped lang="scss"></style>
