<!-- 我的渠道页面。
 -->
<template>
  <div class="app_mychannel">
    <backHeader title="我的渠道"/>
    <div class="title">
      <div>渠道名称：</div>
      <div>渠道编码：</div>
    </div>
    <div class="seprator"/>
    <div class="channel_list" v-for="(item,i) of channelList" :key="i">
      <div class="channel_item">
        <div>{{item.address}}</div>
        <div>{{item.code}}</div>
      </div>
    </div>

  </div>
</template>

<script>
import backHeader from '../../components/headerBack'
export default {
  components: {
    backHeader
  },
  data () {
    return {
      uid: this.$store.getters.getUid,
      channelList: []

    }
  },

  computed: {},

  watch: {},

  created () {
    this.getMyChannel()
  },
  mounted () {

  },

  methods: {
    getMyChannel () {
      var url = `getMyChannel?uid=${ this.uid }`
      this.axios.get(url).then(res => {
        console.log(res.data)
        this.channelList = res.data
      })
    }
  }
}

</script>
<style lang='stylus' scoped>
@import '../../stylus/mixin.styl'
.title
  padding-left 0.6rem
  padding-right 0.6rem
  font-size 14px
  color rgba(0, 0, 0, 0.9)
  height 1rem
  line-height 1rem
  display flex
  justify-content space-between
.seprator
  height 0.12rem
  background #F5F5F5
.channel_list
  padding-left 0.6rem
  padding-right 0.6rem
  font-size 14px
  color rgba(0, 0, 0, 0.9)
  display flex
  flex-direction column
  .channel_item
    height 0.88rem
    line-height 0.88rem
    display flex
    justify-content space-between
    border-bottom 0.01rem solid #DCDCDC
</style>
