import 'babel-polyfill'
import Vue from 'vue'

import router from './routes'
import App from './app'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App }
})
