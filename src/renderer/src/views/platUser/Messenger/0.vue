<template>
  <div class="main">
    <webview
      ref="foo"
      src="https://www.github.com/"
      style="display: inline-flex; width: 100%; height: 700px"
      partition="persist:messenger0"
    ></webview>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.main {
  padding: 10px;
  height: 96%;
  width: 98%;
  overflow: hidden;
  background-color: #b6b2b2;
}
</style>
