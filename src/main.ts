import 'nprogress/nprogress.css'
import './assets/style/index.less'

import 'animate.css'
import 'uno.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'

createApp(App).use(pinia).use(router).mount('#app')
