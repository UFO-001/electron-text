<template>
  <div>
    <Content></Content>
  </div>
</template>

<script setup>
import Content from '../user/index.vue'
import { useRoute } from 'vue-router'
import { provide } from 'vue'

const route = useRoute()
const pathName = route.path.replace('/', '')
provide('Info', pathName)
</script>

<style scoped lang="scss"></style>
