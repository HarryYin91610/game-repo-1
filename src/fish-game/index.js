import Vue from 'vue'
import App from './app'
// 公共样式
import './index.styl'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App }
})
