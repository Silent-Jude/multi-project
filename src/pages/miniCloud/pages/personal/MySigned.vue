<!-- 我的签约页面 -->
<template>
  <div>
    <div class="header">
      <div class="left" @click="backToPersonal">
        <i class="back"/>
      </div>
      <div class="tittle">
        我的签约
      </div>
      <div class="right">
        <slot name="right">
          分享
        </slot>
      </div>
    </div>
    <div class="protocol">
      项目合作协议书 项目合作协议由： 甲： 乙： （以下简称甲方）和 （以下简称乙方） ，籍贯 ，籍贯 ，身份证号： ，身份证号： 甲乙双方本着公平、平等、互利的原则订立合作协议如下： 第一条 甲乙双方自愿合作经营 项目。 %、乙方 %的比例分配。 第二条 合作利益分红按照取得的销售佣金净利润的甲方 第三条 每次项目销售利润分红，一年结算，如项目销售一年内完成，可根据项目结案后，与开发商结
    </div>
    <div class="signed" v-if="hadSigned">
      <img :src="signedUrl" alt="" class="my_signed">
      <!-- <p>signedDate</p> -->
    </div>
    <div class="sign_btn" @click="jumpToSign">
      签名
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
      signedDate: '',
      hadSigned: false,
      signedUrl: ''
    }
  },

  computed: {},

  watch: {},

  created () {
    this.axios.get('getSigned').then(res => {
      console.log(res.data)
      console.log('请求已经重新发送')
      if (res.data) {
        this.hadSigned = true
        this.signedUrl = res.data + `?t=${ Math.random() }`
      }
    })
  },
  mounted () {

  },
  methods: {
    jumpToSign () {
      this.$router.push('/signed')
    },
    backToPersonal () {
      this.$router.push('/personal')
    }
  }
}

</script>
<style lang='stylus' scoped>
@import '../../stylus/mixin.styl'
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
    .back
      display inline-block
      width 100%
      height 1.28rem
      line-height 1.28rem
      bg-image('cpxq_icon_fh')
      background-size 20% !important
      background-position center !important
      vertical-align middle
  .tittle
    flex 0 0 60%
  .right
    flex 0 0 20%
.protocol
  padding 0.39rem
  font-size 14px
  word-wrap break-word
  color rgba(0, 0, 0, 0.9)
  text-align left
.signed
  text-align right
  .my_signed
    width 1.78rem
.sign_btn
  height 1rem
  line-height 1rem
  font-size 16px
  color #fff
  background #478CFE
</style>
