<!-- 按条件查找并显示结果组件。
传参为：
1.查找的类型，有积分，酬金，办理业务，充值，4类。
2.//数据应该根据搜索条件，和查找类型，发送异步请求从服务器端获取。这里做模拟，当异步请求时，从父组件给值。。
-->
<template>
  <div class="app_search">
    <search-condition @searched="getDataList"/>
    <div class="product_wrap" v-for="(item,i) of data" :key="i">
      <div class="product_item">
        <div class="top">
          <span class="product">{{item.product}}</span>
          <span class="reward">{{item.symbol}}{{item.reward}}</span>
        </div>
        <div class="bottom">
          <span class="channel">{{item.channel}}
            <span class="phone">{{item.phone}}</span>
          </span>
          <span class="date">{{item.date | datatimeFilter}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Bus from "../../static/js/bus.js";
import searchCondition from '../components/searchCondition'
export default {
  // props: ["data"],
  components: {
    searchCondition
  },
  data () {
    return {
      data: [],
      // 存放搜索条件。
      condition: {}
      // 数据应该根据搜索条件，和查找类型，发送异步请求从服务器端获取。这里做模拟先从父组件传递。
      // data: [
      //   { product: '4G套餐', reward: 3000, channel: '西安', phone: '18536689541', date: '2018-03-09 18:36:24' },
      //   { product: '4G套餐', reward: 3000, channel: '西安', phone: '18536689541', date: '2018-03-09 18:36:24' },
      //   { product: '4G套餐', reward: 3000, channel: '西安', phone: '18536689541', date: '2018-03-09 18:36:24' },
      //   { product: '4G套餐', reward: 3000, channel: '西安', phone: '18536689541', date: '2018-03-09 18:36:24' },
      //   { product: '4G套餐', reward: 3000, channel: '西安', phone: '18536689541', date: '2018-03-09 18:36:24' },
      //   { product: '4G套餐', reward: 3000, channel: '西安', phone: '18536689541', date: '2018-03-09 18:36:24' },
      //   { product: '4G套餐', reward: 3000, channel: '西安', phone: '18536689541', date: '2018-03-09 18:36:24' },
      //   { product: '4G套餐', reward: 3000, channel: '西安', phone: '18536689541', date: '2018-03-09 18:36:24' },
      // ]
    }
  },

  computed: {
  },
  watch: {
  },
  created () {

  },
  mounted () {
  },
  methods: {
    // 获取搜索列表
    getDataList (val) {
      this.data = val
      // console.log(this.condition)
    }
  }
}

</script>
<style lang='stylus' scoped>
.app_search
  font-family PingFangSC-Regular
  padding-left 0.31rem
  padding-right 0.31rem
  padding-top 0.5rem
  .product_wrap
    width 100%
    .product_item
      border-bottom 0.01rem solid #DCDCDC
      height 1.37rem
      display flex
      flex-direction column
      justify-content center
      .top
        margin-bottom 0.1rem
        display flex
        justify-content space-between
        .product
          color rgba(0, 0, 0, 0.9)
          font-size 14px
        .reward
          color #478CFE
          font-size 16px
      .bottom
        font-size 11px
        color rgba(0, 0, 0, 0.9)
        display flex
        justify-content space-between
</style>
