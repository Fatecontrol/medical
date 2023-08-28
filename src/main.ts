// 引入公共样式
import './styles/main.scss'

// 引入vant样式
import 'vant/lib/index.css'

import 'virtual:svg-icons-register'
import { createApp } from 'vue'
// 导入pinia
import pinia from './stores'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(pinia)
app.use(router)

// 引入权限文件
import '@/permisson'

app.mount('#app')
