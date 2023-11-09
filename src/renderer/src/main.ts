import { createApp } from 'vue'
import App from './App.vue'

import 'animate.css'
//引入路由
import router from '@router'

//引入pinia
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
