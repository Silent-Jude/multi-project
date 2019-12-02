<!-- 合作协议页面 -->
<template>
  <div>
    <backHeader title="合作协议"/>
    <div class="protocol">
      项目合作协议书 项目合作协议由： 甲： 乙： （以下简称甲方）和 （以下简称乙方） ，籍贯 ，籍贯 ，身份证号： ，身份证号： 甲乙双方本着公平、平等、互利的原则订立合作协议如下： 第一条 甲乙双方自愿合作经营 项目。 %、乙方 %的比例分配。 第二条 合作利益分红按照取得的销售佣金净利润的甲方 第三条 每次项目销售利润分红，一年结算，如项目销售一年内完成，可根据项目结案后，与开发商结
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
    }
  },

  computed: {},

  watch: {},

  created () { },

  methods: {}
}

</script>
<style lang='stylus' scoped>
.protocol
  padding 0.39rem
  font-size 14px
  word-wrap break-word
  color rgba(0, 0, 0, 0.9)
  text-align left
</style>
