<!-- 统计中心-酬金 -->
<template>
  <div>
    <conditionList/>
  </div>
</template>

<script>
import Bus from '../../utils/bus.js'
import conditionList from '../../components/conditionList'
export default {
  components: {
    conditionList
  },
  data () {
    return {
      statisticsType: 'reward'
    }
  },

  computed: {},

  watch: {},

  created () {

  },
  mounted () {
    Bus.$emit('statisticsType', this.statisticsType)
  },
  beforeDestroy () {
    // 如果是跳页面传值，需要放在这里发送emit
    // 确保接收的组件以及加载。

  },

  methods: {
  }
}

</script>
<style lang='stylus' scoped>
</style>
