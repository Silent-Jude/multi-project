// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app.vue'
import Vuex from 'vuex'
import { miniCloudRouter } from '@/pages/miniCloud/router'

Vue.config.productionTip = false

Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: miniCloudRouter,
  template: '<App/>',
  components: { App }
})
