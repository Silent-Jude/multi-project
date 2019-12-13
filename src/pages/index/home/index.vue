<!-- 主页 -->
<template>
  <div>
    <h1>我是主页index.html</h1>
    <div>
      <a href="onekeySave.html">跳转到onekeySave页面</a>
    </div>
    <div>
      <a href="miniCloud.html">跳转到miniCloud页面</a>
    </div>
     <div>
      <a href="weather.html">跳转到weather页面</a>
    </div>
    <div>
      <a href="sudoku.html">跳转到数独sudoku页面</a>
    </div>
    <!-- <solar/> -->
  </div>
</template>

<script>
import solar from './solar'
export default {
  components: {
    solar
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
@media screen and (max-device-width: 750px){
}
@media screen and (min-device-width: 750px){

}

</style>
