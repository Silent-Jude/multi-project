// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app'
import router from './router'
import store from './vuex/store'
// 引入mint-ui
import MintUI from 'mint-ui'
import axios from 'axios'
import qs from 'qs'

// 引入echarts,这里是全局引入,无需。
// import echarts from 'echarts';
// Vue.prototype.$echarts = echarts;
// 引入elementui ，弃用。
// import ElementUI from 'element-ui'
// import {
//   Select,
//   Option
// } from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css'

import 'mint-ui/lib/style.css'

// 直接全局使用mint-ui
Vue.use(MintUI)
// elementui的组件。弃用。
// Vue.use(Select)
// Vue.use(Option)

// 配置axios并赋予给vue原型对象。
axios.defaults.baseURL = 'http://127.0.0.1:5050/miniCloud/'
// axios.defaults.baseURL = 'http://onekey.applinzi.com/minicloud/';
axios.defaults.withCredentials = true
Vue.prototype.axios = axios

Vue.prototype.qs = qs

Vue.config.productionTip = false

// 创建日期类型过滤器
// val：原先日期对象
Vue.filter('datatimeFilter', function (val) {
  // 7.1:创建日期对象
  var data = new Date(val)
  // 7.2:获取年月日时分秒
  var y = data.getFullYear()
  var m = data.getMonth() + 1
  var d = data.getDate()
  var h = data.getHours()
  var mi = data.getMinutes()
  var s = data.getSeconds()
  // 7.3:月日格式判断 07 08 09 10
  m < 10 && (m = '0' + m)
  d < 10 && (d = '0' + d)
  // 7.4:拼接字符串返回
  return `${ y }-${ m }-${ d } ${ h }:${ mi }:${ s }`
})

console.log(router.mode)
router.beforeEach((to, from, next) => {
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
