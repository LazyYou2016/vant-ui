import Vue from 'vue'
import App from './App.vue'

import router from './router'
// import store from './store'
// import Cookies from 'js-cookie'

// 引入各插件
import './plugins/index'
// 指令
// import './directive/index'

// 引入style.less
import '@/assets/css/style.less'

// vue中全局批量注册组件
import components from '@/components/index'
Vue.use(components)
Vue.config.productionTip = false

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
