<!--  -->
<template>
  <div>
    <my-header :title="title">
      <i class="back" slot="left"/>
    </my-header>
  </div>
</template>

<script>
// import header from './components/header.vue'
import header from './header.vue'
export default {
  props: ['title'],
  components: {
    myHeader: header
  },
  data () {
    return {
    }
  },

  computed: {},

  watch: {},

  created () { },

  methods: {}
}

</script>
<style lang='stylus' scoped>
@import '../stylus/mixin.styl'
.back
  display inline-block
  width 100%
  height 1.28rem
  line-height 1.28rem
  bg-image('cpxq_icon_fh', '../')
  background-size 20% !important
  background-position center !important
  vertical-align middle
</style>
