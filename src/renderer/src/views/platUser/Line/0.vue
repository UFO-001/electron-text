<template>
  <div class="main">
    <webview
      ref="foo"
      src="https://access.line.me/oauth2/v2.1/login?returnUri=%2Foauth2%2Fv2.1%2Fauthorize%2Fconsent&loginChannelId=1521958360&loginState=SB9kNqBk3QWdTClnoanfDK#/"
      style="display: inline-flex; width: 100%; height: 700px"
      partition="persist:line0"
    ></webview>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const foo = ref(null)

onMounted(() => {
  // 当组件加载完毕时调用
  nextTick(() => {
    // 等待 nextTick 执行完毕后执行
    foo.value.addEventListener('dom-ready', () => {
      console.log('dom-ready')
      // 当 dom-ready 事件触发时
      foo.value.openDevTools()
      // 打开开发者工具
      foo.value.setZoomFactor(0.9)

      foo.value.executeJavaScript(`
        const inp = document.getElementsByName('tid')

         function inpTn() {
          console.log(inp[0].value, 'inp')
        }
        inp[0].addEventListener('input', inpTn)


      `)
      foo.value.addEventListener('did-navigate-in-page', (e) => {
        //   if (
        //     e.url ==
        //     'https://access.line.me/oauth2/v2.1/login?returnUri=%2Foauth2%2Fv2.1%2Fauthorize%2Fconsent&loginChannelId=1521958360&loginState=SB9kNqBk3QWdTClnoanfDK#/'
        //   ) {
        //     foo.value.addEventListener('dom-ready', () => {
        //       foo.value.executeJavaScript(`
        //   const inp = document.getElementsByName('tid')

        //    function inpTn() {
        //     console.log(inp[0].value, 'inp')
        //   }
        //   inp[0].addEventListener('input', inpTn)

        // `)
        //     })
        //     console.log(e, 'did-navigate-in-page')
        //   } else {
        //     foo.value.executeJavaScript(`
        //     inp[0].removeEventListener('input', inpTn)
        //     console.log( inp[0],'removeinp')
        //     `)
        //   }
        foo.value.executeJavaScript(`
        // const inp = document.getElementsByName('tid')

        if(inp.length>0){
              console.log( inp[0].value, 'eeeeeeee')
        }


      `)
        console.log(e, 'did-navigate-in-page')
      })
      // 执行 JavaScript 代码
      // console.log(url, a, 'aaaaaa')
      // // 打印 URL、缩放因子
      // console.log(foo.value, 'value')
      // 打印 foo.value
    })
  })
})
</script>

<style scoped lang="scss">
.main {
  padding: 10px;
  height: 96%;
  width: 98%;
  overflow: hidden;
  background-color: #e6e2e2;
}
</style>
