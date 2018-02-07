import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 在提交线上环境时忽略注释
Vue.config.productionTip = false

// 引入公共样式
import '@/assets/css/reset'
import '@/assets/css/header'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})


