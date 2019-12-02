<!-- 统计中心-积分 -->
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
      statisticsType: 'score',
      data: [
        { product: '4G套餐', reward: 3000, channel: '西安', phone: '18536689541', date: '2018-03-09 18:36:24', symbol: '+' },
        { product: '4G套餐', reward: 200, channel: '西安', phone: '18536689541', date: '2018-03-09 18:36:24', symbol: '+' },
        { product: '4G套餐', reward: 60, channel: '西安', phone: '18536689541', date: '2018-03-09 18:36:24', symbol: '+' },
        { product: '4G套餐', reward: 1500, channel: '西安', phone: '18536689541', date: '2018-03-09 18:36:24', symbol: '+' },
        { product: '4G套餐', reward: 3000, channel: '西安', phone: '18536689541', date: '2018-03-09 18:36:24', symbol: '+' },
        { product: '4G套餐', reward: 215, channel: '西安', phone: '18536689541', date: '2018-03-09 18:36:24', symbol: '+' },
        { product: '4G套餐', reward: 654, channel: '西安', phone: '18536689541', date: '2018-03-09 18:36:24', symbol: '+' },
        { product: '4G套餐', reward: 964, channel: '西安', phone: '18536689541', date: '2018-03-09 18:36:24', symbol: '+' }
      ]
    }
  },

  computed: {},
  watch: {},
  created () { },
  mounted () {
    Bus.$emit('statisticsType', this.statisticsType)
  },

  methods: {}
}

</script>
<style lang='stylus' scoped>
</style>
