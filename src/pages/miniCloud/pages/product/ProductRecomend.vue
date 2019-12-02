<!-- 产品推荐页面 -->
<template>
  <div class="product_recomend">
    <back-header title="产品推荐"/>
    <div class="content">
      <div class="filter_wrap">
        <div class="sort">
          <p class="sort_info">{{sortInfo}}</p>
          <i class="sort_icon" :class="{'asc':isAscSort,'des':!isAscSort}" @click="changeSort"/>
        </div>
      </div>
      <recommend-list ref="recommendList"/>
    </div>

  </div>
</template>

<script>
import backHeader from '../../components/headerBack'
import recommendList from '../../components/recommendList'

export default {
  components: {
    backHeader,
    recommendList
  },
  data () {
    return {
      sortInfo: '酬金（从低到高）',
      isAscSort: true
    }
  },

  computed: {},

  watch: {},

  created () { },

  methods: {
    changeSort () {
      this.$refs.recommendList.orderToggle()
      this.isAscSort = !this.isAscSort
      if (this.isAscSort) {
        this.sortInfo = '酬金（从底到高）'
      } else {
        this.sortInfo = '酬金（从高到底）'
      }
    }
  }
}

</script>
<style lang='stylus' scoped>
@import '../../stylus/mixin.styl'
.content
  padding 0.4rem
  .filter_wrap
    .sort
      padding-left 0.4rem
      padding-right 0.1rem
      box-sizing border-box
      height 0.7rem
      // width 5.45rem
      background #F5F5F5
      border-radius 10px
      display flex
      justify-content space-between
      align-items center
      .sort_info
        font-size 13px
        color rgba(0, 0, 0, 0.6)
      .sort_icon
        width 0.4rem
        height 0.4rem
      .asc
        bg-image('cptj_icon_gdd')
      .des
        bg-image('cptj_icon_ddg')
</style>
