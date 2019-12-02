<!-- 商品中心 -->
<template>
  <div>
    <my-header title="商品中心"/>
    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="(item,i) of bannerImg" :key="i">
        <img :src="item.bannerUrl" alt="">
      </mt-swipe-item>
    </mt-swipe>
    <div class="classify">
      <div class="recharge classify_item" @click="jumpTo('/recharge')">
        <i class="icon"/>
        <span>充值</span>
      </div>
      <div class="flow classify_item" @click="jumpTo('/flow')">
        <i class="icon"/>
        <span>流量</span>
      </div>
      <div class="combo classify_item" @click="jumpTo('/combo')">
        <i class="icon"/>
        <span>套餐</span>
      </div>
    </div>
    <div class="separate"/>

    <div class="recommend_wrap">
      <div class="recommend_header">
        <span>产品推荐</span>
        <span class="more" @click="jumpTo('/productRecomend')">查看更多
          <i class="icon"/>
        </span>
      </div>
      <recommend-list/>

    </div>
  </div>
</template>

<script>
import header from '../../components/header'
import recommendList from '../../components/recommendList'

export default {
  components: {
    myHeader: header,
    recommendList
  },
  data () {
    return {
      bannerImg: [{
        bannerUrl: 'http://127.0.0.1:5050/miniCloud/image/product/banner1.jpg',
        target: ''
      },
      {
        bannerUrl: 'http://127.0.0.1:5050/miniCloud/image/product/banner2.jpg',
        target: ''
      }, {
        bannerUrl: 'http://127.0.0.1:5050/miniCloud/image/product/banner3.jpg',
        target: ''
      }
      ],
      list: []
    }
  },

  computed: {},

  watch: {},

  created () {
    this.axios.get('productList').then(res => {
      console.log(res.data)
      this.list = res.data
    })
  },

  methods: {
    jumpTo (path) {
      this.$router.push(path)
    }
  }
}

</script>
<style lang='stylus' scoped>
@import '../../stylus/mixin.styl'
.mint-swipe
  height 3.14rem
  .mint-swipe-item
    img
      width 100%
.classify
  height 2.2rem
  font-size 13px
  display flex
  .classify_item
    flex auto
    display flex
    flex-direction column
    align-items center
    justify-content center
    .icon
      margin-bottom 0.2rem
  .recharge
    .icon
      height 0.66rem
      width 0.78rem
      bg-image('spzx_icon_cz')
  .flow
    .icon
      height 0.61rem
      width 0.82rem
      bg-image('spzx_icon_ll')
  .combo
    .icon
      height 0.64rem
      width 0.75rem
      bg-image('spzx_icon_tc')
.separate
  height 0.12rem
  background #F5F5F5
.recommend_wrap
  padding 0.41rem
  .recommend_header
    font-size 14px
    color #000000
    padding-bottom 0.3rem
    border-bottom 0.01rem solid #DCDCDC
    display flex
    justify-content space-between
    .more
      font-size 12px
      color rgba(0, 0, 0, 0.6)
      display flex
      align-items center
      .icon
        width 0.15rem
        height 0.25rem
        margin-left 0.1rem
        bg-image('spzx_icon_jr')
</style>
