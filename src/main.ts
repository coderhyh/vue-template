import './assets/style/index.less'
import 'nprogress/nprogress.css'
// eslint-disable-next-line import/no-unresolved
import 'uno.css'
import 'animate.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './store'

createApp(App).use(pinia).use(router).mount('#app')
