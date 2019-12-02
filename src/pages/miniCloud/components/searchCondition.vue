<!-- 搜索条件组件，多次复用。 -->
<template>
  <div>

    <div class="search_wrap">
      <input class="phone" type="text" v-model="phone" placeholder="手机号" @input="telReg" maxlength="11">
      <p class="search" @click="search">搜索</p>
      <i class="icon" @click="sendData" :class="{'disabled':countDown>0}">
        <span>{{msg}}</span>
      </i>
    </div>
    <div class="selector_wrap">
      <selector :title="title[0]" :width="width[0]" :data="data.yearList" @selected="getYear"/>
      <selector :title="title[1]" :width="width[1]" :data="data.monthList" @selected="getMonth"/>
      <selector :title="title[2]" :width="width[2]" :data="data.typeList" @selected="getType"/>
      <selector :title="title[3]" :width="width[3]" :data="data.channelList" @selected="getChannel"/>
    </div>
  </div>
</template>

<script>
// 引入Toast
import { Toast } from 'mint-ui'
import selector from './selector'
import Bus from '../utils/bus.js'
export default {
  components: {
    selector
  },
  data () {
    return {
      // selectorChangeFlag: true,
      statisticsType: '',
      searchedValue: '',
      hasSearched: false,
      // 要记录到后台里面，以免用户退出重来直接发送。
      countDown: 0,
      // sendCount由后台传来，每次要记录。
      sendCount: 3,
      msg: '发送统计(3)',
      // ready: false,
      phone: '',
      legalPhone: '',
      year: '',
      month: '',
      channel: '',
      type: '',
      title: ['年', '月', '业务类型', '渠道所属'],
      width: ['1.4rem', '1.4rem', '1.8rem', '1.8rem'],
      data: {
        yearList: [2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012],
        monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        channelList: [
          '西安',
          '咸阳',
          '宝鸡',
          '济南',
          '安康',
          '商洛',
          '汉中',
          '榆林',
          '延安',
          '银川'
        ],
        typeList: ['充值', '流量包', '在线选号', '终端', '宽带', '合约机']
      }
    }
  },

  computed: {
    allLegalValue () {
      if (this.legalPhone && this.year && this.month && this.type && this.channel) {
        return true
      } else {
        return false
      }
    }
  },

  watch: {
  },

  created () {

  },
  mounted () {
    Bus.$on('statisticsType', (val) => {
      this.statisticsType = val
      console.log('收到了，统计类型为：' + this.statisticsType)
    })
  },
  beforeDestroy () {
    Bus.$off('statisticsType')
  },

  methods: {
    getYear (e) {
      this.year = e
    },
    getMonth (e) {
      this.month = e
    },
    getType (e) {
      this.type = e
    },
    getChannel (e) {
      this.channel = e
    },
    selectorChang () {
      this.selectorChangeFlag = !this.selectorChangeFlag
    },
    telReg () {
      this.hasSearched = false
      this.legalPhone = ''
      var reg = /^((13\d)|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18\d)|166|198|199|(147))\d{8}$/
      if (reg.test(this.phone)) {
        this.legalPhone = this.phone
      }
    },
    search () {
      if (this.allLegalValue) {
        console.log('发送搜索数据')
        // 发送异步请求，获取数据，并发送数据到conditionList来渲染列表。
        var url = ''
        // 根据传入的需要统计类型，选择正确的api
        switch (this.statisticsType) {
          case 'reward':
            url = 'getReward'
            break
          case 'score':
            url = 'getScore'
            break
          case 'business':
            url = 'getMyBusiness'
            break
          default:
            url = 'getRecharge'
            break
        }
        // 这里应该是post请求，将phone，year,month,type,channel,和搜索类型发送到接口
        var params = {
          phone: this.legalPhone,
          year: this.year,
          month: this.month,
          type: this.type,
          channel: this.channel,
          statisticsType: this.statisticsType
        }
        this.axios.post(url, this.qs.stringify(params)).then(res => {
          console.log('hello,i get the data')
          this.hasSearched = true
          this.$emit('searched', res.data.data)
        })
      } else {
        Toast({
          message: '请输入合法手机号！',
          position: 'middle',
          duration: 2000
        })
      }
    },
    sendData () {
      if (this.allLegalValue && this.hasSearched) {
        if (this.sendCount > 0) {
          this.countDown = 5
          Toast({
            message: '数据发送成功！',
            position: 'middle',
            duration: 2000
          })
          this.openCountDown()
        } else {
          Toast({
            message: '今日发送次数用尽！请明天再试',
            position: 'middle',
            duration: 3000
          })
        }
      } else {
        Toast({
          message: '请先搜索获取数据！',
          position: 'middle',
          duration: 3000
        })
      }
    },
    // 打开倒计时。
    openCountDown () {
      this.msg = `${ this.countDown }S`
      var timer = setInterval(() => {
        this.countDown--
        this.msg = `${ this.countDown }S`
        if (this.countDown == 0) {
          clearInterval(timer)
          this.sendCount--
          this.msg = `发送统计(${ this.sendCount })`
        }
      }, 1000)
    }

  }
}

</script>
<style lang='stylus' scoped>
// wdcj_button_hqtjx 2@2x
@import '../stylus/mixin.styl'
.disabled
  pointer-events none
.search_wrap
  font-size 12px
  display flex
  justify-content space-between
  align-items center
  margin-bottom 0.3rem
  .phone
    text-indent 0.2rem
    width 3.68rem
    height 0.7rem
    background #F5F5F5
    border-radius 10px
    border none
    outline none
  .search
    font-weight 500
    font-size 14px
    color rgba(0, 0, 0, 0.8)
  .icon
    font-size 13px
    color #fff
    width 1.8rem
    height 0.7rem
    line-height 0.7rem
    border-radius 10px
    bg-image('wdcj_button_hqtjx2', '../')
.selector_wrap
  display flex
  justify-content space-between
</style>
