#!/bin/bash
# 打开 pages 文件夹，并创建文件
# 项目根目录下运行：bash generatePage.sh page4 ，注意windows系统使用git bash即可运行。
cd src/pages
for file in $(ls)
do
  if [ $file == $1 ];then
      echo $1' 文件已存在, 请使用其他名字'
      exit
  fi
done
mkdir $1
cd $1
# 生成 文件名.html
echo "" > $1.html
echo '<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1,user-scalable=no">
    <title>index</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
' > $1.html

# 生成 App.vue
echo "" > App.vue
echo "<template>
  <div id='app'>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
}
</style>
" > App.vue

# 生成 文件名.js
echo "" > $1.js
echo "import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})" > $1.js


# 生成 router.js
mkdir router
cd router
echo "" > index.js
echo "import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../home')
    }
  ]
})
" > index.js

# 生成home.vue
cd ..
mkdir home
cd home
read name
echo "" > index.vue
echo "<!-- 主页 -->
<template>
  <div>
    <h1>我是$name主页index.html</h1>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
    }
  },

  computed: {},

  watch: {},

  created () {},

  methods: {}
}
</script>
<style rel='stylesheet/less' lang='less' scoped>
</style>
" > index.vue
