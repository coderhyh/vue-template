import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import pinia from './store'

import 'nprogress/nprogress.css'
import './assets/style/index.less'
import 'animate.css'
import 'virtual:uno.css'

createApp(App).use(pinia).use(router).mount('#app')
