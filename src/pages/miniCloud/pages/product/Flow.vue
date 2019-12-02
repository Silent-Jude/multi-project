<!-- 话费充值页面 -->
<template>
  <div class="app_recharge">
    <back-header title="流量充值"/>
    <div class="content">
      <div class="select_charge">
        <p class="title">请输入手机号</p>
        <label class="input_wrap">+86<input type="text" class="phone" v-model="phone" placeholder="请在此输入手机号码" maxlength="11" @blur="checkPhone"></label>
        <div class="charge_grid">
          <div class="charge_item" :class="{'active':currentItem===i}" v-for="(item,i) of chargeType" :key="i" @click="currentItem=i;isSelected=true">
            {{item}}
          </div>
        </div>
      </div>
      <div class="separator"/>
      <div class="reward" v-if="role!==0">
        <span>酬金:￥{{reward}}</span>
        <span class="score">积分：{{score}}</span>
      </div>
      <div class="reward price" v-else>
        <span>价格:￥{{price}}</span>
      </div>
      <div class="separator"/>
      <div class="introduce">
        <div class="base" :class="{'active':currentIndex===i}" v-for="(tab,i) of tabs" :key="i" @click="currentIndex=i">
          {{tab}}
        </div>
      </div>
      <component :is="currentTabComponent" class="content_wrap"/>
    </div>
    <div class="footer">
      <div class="handle" @click="handleDeal">立即办理</div>
      <div class="share">
        <i class="icon"/>
        <span class="text">分享</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Toast } from 'mint-ui'
import backHeader from '../../components/headerBack'
import productIntroduce from '../../components/productIntroduce'
import rewardPolicy from '../../components/rewardPolicy'
import marketing from '../../components/marketing'

export default {
  components: {
    backHeader,
    productIntroduce,
    rewardPolicy,
    marketing
  },
  data () {
    return {
      // currentTab: '产品介绍',
      // price: '',
      currentItem: '',
      currentIndex: 0,
      currentTabComponent: 'productIntroduce',
      phone: '',
      chargeType: ['100M', '300M', '500M', '1G', '2G', '3G', '4G', '5G'],
      isPhone: false,
      isSelected: false
    }
  },
  computed: {
    ...mapState({
      role: 'role'
    }),

    tabs () {
      if (this.role == 0) {
        return ['产品介绍']
      } else {
        return ['产品介绍', '酬金政策', '营销政策']
      }
    },
    reward () {
      if (this.currentItem === '') {
        return ''
      } else {
        return this.currentItem * 10 + 10
      }
    },
    score () {
      if (this.currentItem === '') {
        return ''
      } else {
        return this.currentItem * 100 + 50
      }
    },
    price () {
      if (this.currentItem === '') {
        return ''
      } else {
        return this.currentItem * 5 + 5
      }
    }
  },

  watch: {
    currentIndex (newValue, oldValue) {
      console.log('bianle')
      if (newValue == 0) {
        this.currentTabComponent = 'productIntroduce'
      } else if (newValue == 1) {
        this.currentTabComponent = 'rewardPolicy'
      } else {
        this.currentTabComponent = 'marketing'
      }
    }
  },

  created () { },

  methods: {
    checkPhone () {
      if (this.phone.length == 11) {
        this.isPhone = true
      } else {
        this.isPhone = false
      }
    },
    // 话费充值函数。
    handleDeal () {
      if (this.isPhone && this.isSelected) {
        Toast({
          message: '业务办理成功！',
          duration: 2000
        })
        var timer = setTimeout(() => {
          this.$router.push('/')
          clearTimeout(timer)
        }, 2000)
      } else if (this.isPhone === false) {
        Toast({
          message: '请输入正确的手机号！',
          duration: 2000
        })
      } else {
        Toast({
          message: '请选择套餐！',
          duration: 2000
        })
      }
    }
  }
}

</script>
<style lang='stylus' scoped>
@import '../../stylus/mixin.styl'
.content
  text-align left
  margin-bottom 0.95rem
  .select_charge
    padding 0.4rem
    .title
      font-size 14px
      color rgba(0, 0, 0, 0.9)
    .input_wrap
      font-size 16px
      color rgba(0, 0, 0, 0.4)
      font-weight 600
      .phone
        margin-left 0.26rem
        color #478CFE
        font-size 22px
        width 3.52rem
        outline none
        border none
        &::placeholder
          color #478CFE
    .charge_grid
      height 4rem
      display flex
      flex-wrap wrap
      justify-content space-between
      font-size 13px
      text-align center
      align-content space-around
      .charge_item
        width 2rem
        height 0.7rem
        line-height 0.7rem
        background #f5f5f5
        border 0.02rem solid #dcdcdc
        border-radius 10px
        color rgba(0, 0, 0, 0.6)
      .active
        background #EEF5FF
        border 0.02rem solid #84B4FF
        border-radius 10px
        color #468EFF
  .separator
    height 0.12rem
    background #f5f5f5
  .reward
    padding-left 0.4rem
    height 1rem
    line-height 1rem
    font-size 13px
    color rgba(0, 0, 0, 0.6)
    .score
      margin-left 0.5rem
  .introduce
    width 5rem
    height 1rem
    line-height 1rem
    padding 0.4rem
    display flex
    text-align center
    .base
      color rgba(0, 0, 0, 0.6)
      font-size 14px
      font-weight 600
      flex auto
    .active
      color #2C7EFF
      border-bottom 0.02rem solid #2C7EFF
  .content_wrap
    padding 0.3rem
.footer
  background #478CFE
  height 0.95rem
  line-height 0.95rem
  font-size 15px
  text-align center
  width 100%
  position fixed
  top 100%
  transform translateY(-100%)
  display flex
  justify-content space-between
  .handle
    flex 1 1 70%
    color #fff
  .share
    flex 1 1 30%
    background #fff
    color #478CFE
</style>
