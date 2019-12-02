<!-- 统计中心-业务 -->
<template>
  <div class="app_business">
    <div class="selector">
      <!-- 控制显示渠道 -->
      <div class="show_data show_channel" @click="selectChannel">
        <p v-if="!isChannelClicked">渠道所属</p>
        <p v-if="isChannelClicked">{{channel[0]}}-{{channel[1]}}</p>
        <i class="icon"/>
      </div>
      <!-- 控制显示类型 -->
      <div class="show_data show_type" @click="selectType">
        <p v-if="!isTypeClicked">业务类型</p>
        <p v-if="isTypeClicked">{{type}}</p>
        <i class="icon"/>
      </div>
    </div>

    <!-- 选择channel渠道popup组件。 -->
    <mt-popup v-model="showBelong" position="bottom" class="my_select">
      <mt-picker :slots="channelSlots" showToolbar @change="onValuesChange" valueKey="value">
        <!-- 这里是Toolbar中的内容，通过插槽slot实现 -->
        <div class="picker-toolbar">
          <span class="mint-datetime-action mint-datetime-cancel" @click="cancelPicker">取消</span>
          <span class="mint-datetime-action mint-datetime-confirm" @click="confirmChannel">确定</span>
        </div>
      </mt-picker>
    </mt-popup>

    <!-- 选择type类型popup组件。 -->
    <mt-popup v-model="showType" position="bottom" class="my_select">
      <mt-picker :slots="typeSlots" showToolbar @change="onTypeChange">
        <!-- 这里是Toolbar中的内容，通过插槽slot实现 -->
        <div class="picker-toolbar">
          <span class="mint-datetime-action mint-datetime-cancel" @click="cancelPicker">取消</span>
          <span class="mint-datetime-action mint-datetime-confirm" @click="confirmType">确定</span>
        </div>
      </mt-picker>
    </mt-popup>

    <!-- 年月日时分选择 -->
    <div class="selector" @click="selectDate">
      <div class="show_year show_data">
        <p v-if="!isDateClicked">年</p>
        <p v-if="isDateClicked">{{year}} 年</p>
        <i class="icon"/>
      </div>
      <div class="show_month show_data">
        <p v-if="!isDateClicked">月</p>
        <p v-if="isDateClicked">{{selectedMonth}} 月</p>
        <i class="icon"/>
      </div>
      <div class="show_date show_data">
        <p v-if="!isDateClicked">日</p>
        <p v-if="isDateClicked">{{date}} 日</p>
        <i class="icon"/>
      </div>
    </div>
    <!-- 时间选择滑动选择组件 -->
    <mt-datetime-picker v-model="dateValue" type="date" ref="datePicker" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" :endDate="new Date()" @confirm="handleConfirm"/>

    <!-- 柱状图组件 -->
    <div id="monthChart" :style="{width: '6.68rem', height: '7.8rem'}"/>
    <div id="dayChart" :style="{width: '6.68rem', height: '7.8rem'}"/>
    <div id="hoursChart" :style="{width: '6.68rem', height: '7.8rem'}"/>

    <div class="send_data" :class="{'disabled':countDown>0}" @click="sendData"/>
    <p class="alert_message">将发送至您的邮箱，今日发送剩余{{sendCount}}次。</p>
    <div class="count_down">
      <p v-if="countDown>0">发送成功！{{countDown}}秒后可重新发送！</p>
    </div>

  </div>
</template>

<script>
// 引入Toast
import { Toast } from 'mint-ui'
// 引入深拷贝。
import { deepClone } from '../../utils/common'
// 引入echarts需要使用到的基础模板。
const echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

const address =
  {
    '西安': ['1008601'],
    '咸阳': ['1008602'],
    '宝鸡': ['1008603'],
    '济南': ['1008604'],
    '安康': ['1008605'],
    '商洛': ['1008606'],
    '汉中': ['1008607'],
    '榆林': ['1008608'],
    '延安': ['1008609'],
    '银川': ['1008610']
  }

export default {
  components: {},
  data () {
    return {
      // 要记录到后台里面，以免用户退出重来直接发送。
      countDown: 0,
      // sendCount由后台传来，每次要记录。
      sendCount: 3,
      channelSlots: [
        {
          flex: 1,
          values: Object.keys(address),
          className: 'slot1',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: ['1008601'],
          className: 'slot3',
          textAlign: 'center'
        }
      ],
      typeSlots: [
        {
          flex: 1,
          values: ['充值', '流量包', '在线选号', '终端', '宽带', '合约机'],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      canSendStatistics: false,
      showBelong: false,
      showType: false,
      date: '',
      selectedMonth: '',
      year: '',
      dateValue: new Date(),
      isDateClicked: false,
      isChannelClicked: false,
      isTypeClicked: false,
      channel: '',
      type: '',
      tempChannel: '',
      tempType: '',
      month: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      monthDate: [
        400, 130, 700, 500, 900, 380, 580, 500, 560, 370, 780, 180
      ],
      day: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
      dayDate: [400, 130, 700, 500, 900, 380, 580, 500, 560, 370, 780, 180, 400, 130, 700, 500, 900, 380, 580, 500, 560, 370, 780, 180, 400, 130, 700, 500, 900, 380, 580],
      hours: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
      hoursDate: [400, 130, 700, 500, 900, 380, 580, 500, 560, 370, 780, 180, 400, 130, 700, 500, 900, 380, 580, 500, 560, 370, 780, 180]
    }
  },

  computed: {
    allSelected () {
      if (this.channel && this.type && this.year && this.selectedMonth && this.date) {
        return true
      }
      //
    }
  },

  watch: {},

  created () {
  },
  mounted () {

  },
  methods: {
    getAsyncData () {
      if (this.allSelected) {
        var url = 'getStatistics'
        this.axios.get(url).then(res => {
          console.log(res)
          // 根据请求回来的数据，绘制柱状图。
          this.drawData('monthChart', '月', this.month, this.monthDate)
          this.drawData('dayChart', '日', this.day, this.dayDate)
          this.drawData('hoursChart', '时', this.hours, this.hoursDate)
          this.canSendStatistics = true
        })
      }
    },
    onTypeChange (picker, values) {
      this.tempType = values[0]
    },
    // 渠道选择中的联动变化
    onValuesChange (picker, values) {
      picker.setSlotValues(1, address[values[0]])
      this.tempChannel = values
    },
    // 显示渠道选择pick组件
    selectChannel () {
      this.showBelong = true
    },
    selectType () {
      this.showType = true
    },
    // 显示日期选择picker组件
    selectDate () {
      this.$refs.datePicker.open()
    },
    // 日期选择中的确认选择事件
    handleConfirm (value) {
      // console.log(value);
      this.year = value.getFullYear()
      this.selectedMonth = value.getMonth() + 1
      this.date = value.getDate()
      this.isDateClicked = true
      // console.log('年月日是：', this.year, this.month, this.date)
      this.getAsyncData()
    },
    // 取消选择函数，公用。
    cancelPicker () {
      this.showBelong = false
      this.showType = false
      // 画蛇添足。
      // this.tempChannel = null
      // this.tempType = null
      // console.log(this.channel)
    },
    // 确认渠道函数
    confirmChannel () {
      this.showBelong = false
      // console.log(this.tempChannel)
      // //这里短路逻辑，如果为null则后面不执行.length避免报错。如果不为null，那么可能是空数组也要判断。
      // if (this.tempChannel != null && this.tempChannel.length != 0) {
      this.channel = deepClone(this.tempChannel)
      this.isChannelClicked = true
      // console.log('渠道是：', this.channel)
      this.getAsyncData()

      // } else {
      //   console.log('等于0')
      //   this.isChannelClicked = true
      //   this.channel = deepClone(['西安', '1008601'])
      //   // this.isChannelClicked=false
      // }
    },
    // 确认类型函数。
    confirmType () {
      this.showType = false
      this.isTypeClicked = true
      this.type = this.tempType
      // console.log('类型是：', this.type)
      this.getAsyncData()
    },
    // 封装好绘制柱状图函数。
    drawData (id, unit, xAxisData, seriesData) {
      var dom = document.getElementById(id)
      var myChart = echarts.init(dom)
      myChart.setOption({
        title: {
          text: '办理量（' + unit + '）'
          // subtext: '纯属虚构'
        },
        grid: {
          x: 40
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['办理量']
        },
        toolbox: {
          show: true,
          feature: {
            magicType: {
              show: true,
              type: ['line', 'bar']
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          data: xAxisData
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: '办理量',
          type: 'bar',
          data: seriesData,
          itemStyle: {
            normal: {
              color: '#2C7EFF'
            }
          },
          markPoint: {
            data: [{
              type: 'max',
              name: '最大值'
            },
            {
              type: 'min',
              name: '最小值'
            }
            ]
          },
          markLine: {
            data: [{
              type: 'average',
              name: '平均值'
            }]
          }
        }]
      }, true)
    },
    // 发送统计数据，并toast提示。启动倒计时。
    sendData () {
      if (this.allSelected) {
        if (this.canSendStatistics) {
          if (this.sendCount > 0) {
            this.countDown = 5
            Toast({
              message: '数据发送成功！',
              position: 'middle',
              duration: 2000
            })
            this.sendCount--
            this.openCountDown()
            this.canSendStatistics = false
          } else {
            Toast({
              message: '今日发送次数用尽！请明天再试',
              position: 'middle',
              duration: 3000
            })
          }
        } else {
          Toast({
            message: '数据没有改变！无需重新发送！',
            position: 'middle',
            duration: 3000
          })
        }
      } else {
        Toast({
          message: '请先获取数据！',
          position: 'middle',
          duration: 3000
        })
      }
    },
    // 打开倒计时。
    openCountDown () {
      var timer = setInterval(() => {
        console.log('开启1次')
        this.countDown--
        if (this.countDown == 0) {
          clearInterval(timer)
        }
      }, 1000)
    }
  }
}

</script>
<style lang='stylus'>
@import '../../stylus/mixin.styl'
.disabled
  pointer-events none
.my_select
  width 100%
  .picker-toolbar
    border-bottom 0.01rem solid #eaeaea
.app_business
  font-size 14px
  color rgba(0, 0, 0, 0.6)
  padding-left 0.41rem
  padding-right 0.41rem
  padding-top 0.5rem
  .selector
    margin-bottom 0.3rem
    display flex
    justify-content space-between
    .show_data
      height 0.7rem
      width 2.1rem
      box-sizing border-box
      background #F5F5F5
      border-radius 0.1rem
      padding-left 0.2rem
      padding-right 0.2rem
      display flex
      justify-content space-between
      align-items center
      .icon
        width 0.18rem
        height 0.093rem
        bg-image('tjzx_icon_sj')
    .show_channel
      width 3.26rem
    .show_type
      width 3.26rem
  .send_data
    margin 0 auto
    width 2.65rem
    height 0.7rem
    bg-image('tjzx_button_tjsj')
  .alert_message
    margin-top 0.4rem
    padding-bottom 0.2rem
    font-size 10px
    color rgba(0, 0, 0, 0.6)
  .count_down
    height 0.32rem
    padding-bottom 0.6rem
    font-size 10px
    color rgba(238, 103, 35, 1)
</style>
