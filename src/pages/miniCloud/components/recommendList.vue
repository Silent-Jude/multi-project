<!-- 产品列表公用组件。 -->
<template>
  <div>
    <div class="recommend_list">
      <div class="recommend_item" v-for="(item,i) of list" :key="i">
        <img class="item_img" :src="item.img_url">
        <div class="item_content">
          <p class="title">{{item.title}}</p>
          <span class="type">{{item.type}}</span>
          <span class="reward">酬金：￥{{item.reward}}</span>
        </div>
        <i class="share"/>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      list: []
      // toggle: true
    }
  },

  computed: {

  },

  watch: {},

  created () {
    this.axios.get('productList').then(res => {
      console.log(res.data)
      // 接收到的数据，按reward来排列一下。
      var arr = res.data
      for (var i = 0; i < arr.length - 1; i++) {
        for (var j = 0; j < arr.length - i - 1; j++) {
          if (arr[j].reward > arr[j + 1].reward) {
            var swap = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = swap
          }
        }
      }
      this.list = arr
    })
  },

  methods: {
    orderToggle () {
      this.list.reverse()
    }
  }
}

</script>
<style lang='stylus' scoped>
@import '../stylus/mixin.styl'
.recommend_list
  // padding 0.4rem
  .recommend_item
    padding-top 0.3rem
    padding-bottom 0.3rem
    border-bottom 0.01rem solid #DCDCDC
    display flex
    justify-content space-between
    .item_img
      flex none
      width 1.4rem
      height 1.4rem
      margin-right 0.4rem
    .item_content
      flex auto
      height 1.4rem
      text-align left
      display flex
      flex-direction column
      justify-content space-between
      .title
        font-size 14px
        color rgba(0, 0, 0, 0.9)
      .type
        font-size 12px
        color rgba(0, 0, 0, 0.6)
        margin-bottom 0.2rem
      .reward
        font-size 13px
        color #FFA11D
    .share
      flex none
      width 0.56rem
      height 0.56rem
      bg-image('spzx_icon_fx', '../')
      align-self flex-end
</style>
