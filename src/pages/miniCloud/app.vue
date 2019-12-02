<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// 移动端适配代码。字体需要自己再设置。
document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px'

export default {
  name: 'App'
}
</script>

<style>
@import './assets/reset.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
  padding: 0;
}
</style>
