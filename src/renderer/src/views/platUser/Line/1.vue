<template>
  <div class="main">
    <webview
      ref="foo"
      src="https://access.line.me/oauth2/v2.1/login?returnUri=%2Foauth2%2Fv2.1%2Fauthorize%2Fconsent&loginChannelId=1521958360&loginState=SB9kNqBk3QWdTClnoanfDK#/"
      style="display: inline-flex; width: 100%; height: 700px"
      partition="persist:line1"
    ></webview>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>

<style scoped lang="scss">
// iframe {
//   width: 100%;
//   height: 720px;
// }

.main {
  padding: 10px;
  height: 96%;
  width: 98%;
  overflow: hidden;
  background-color: #b6b2b2;
}
</style>
