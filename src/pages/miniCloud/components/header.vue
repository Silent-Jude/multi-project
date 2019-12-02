<!--  -->
<template>
  <div>
    <!-- <mt-header :title="title">
      <mt-button slot="right">分享</mt-button>
    </mt-header> -->

    <div class="header">
      <div class="left" @click="goBack">
        <slot name="left"/>
      </div>
      <div class="tittle">
        {{title}}
      </div>
      <div class="right">
        <slot name="right">
          分享
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title'],
  components: {},
  data () {
    return {
    }
  },

  computed: {},

  watch: {},

  created () { },

  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}

</script>
<style lang='stylus' scoped>
.header
  height 1.28rem
  line-height 1.28rem
  background-color #fff
  color #000
  font-size 17px
  border-bottom 0.01rem solid #C8C8C8
  display flex
  justify-content space-between
  align-items center
  .left
    flex 0 0 20%
  .tittle
    flex 0 0 60%
  .right
    flex 0 0 20%
</style>
