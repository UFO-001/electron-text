<template>
  <div class="main">
    <!-- <webview
      ref="foo"
      src="https://www.bing.com/new?cc=sg&setlang=zh-hans"
      style="display: inline-flex; width: 100%; height: 700px"
    ></webview> -->
    <webview
      ref="foo"
      src="https://access.line.me/oauth2/v2.1/login?returnUri=%2Foauth2%2Fv2.1%2Fauthorize%2Fconsent&loginChannelId=1521958360&loginState=SB9kNqBk3QWdTClnoanfDK#/"
      style="display: inline-flex; width: 100%; height: 700px"
      partition="persist:Meta1"
    ></webview>
  </div>
</template>

<script setup>
// import WebComponent from '../userComponent/index.vue'
import { useRoute } from 'vue-router'

// const route = useRoute()
import { onMounted, ref } from 'vue'

// const route = useRoute()
const foo = ref(null)
onMounted(() => {
  // function a() {
  //   if (!foo.value.isDevToolsOpened()) {
  //     foo.value.openDevTools()
  //     console.log(foo.value.isDevToolsOpened(), '222222')
  //     const bb = foo.value.executeJavaScript("window.localStorage.getItem('bundle-urls')")
  //     console.log(bb, 'sssss')
  //   }
  // }
  // foo.value.addEventListener('did-finish-load', a)
})
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
  background-color: #e0dbdb;
}
</style>
