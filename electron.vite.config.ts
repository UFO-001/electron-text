import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin, bytecodePlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

//自动导入elementPlus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@router': resolve('src/renderer/src/router'),
        '@views': resolve('src/renderer/src/views'),
        '@assets': resolve('src/renderer/src/assets'),
        '@components': resolve('src/renderer/src/components'),
        '@store': resolve('src/renderer/src/store')
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
})
