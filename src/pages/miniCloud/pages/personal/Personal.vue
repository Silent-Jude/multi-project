<!-- 个人中心页面 -->
<template>
  <div>
    <my-header title="个人中心"/>
    <div class="login_wrap">
      <div class="longin_content">
        <div class="avatar" v-if="isLogin==false"/>
        <img :src="avatarUrl" alt="" v-if="isLogin==true" class="avatar" @click="uploadavatar">
        <input class="uploadInput" type="file" name="avatar" ref="fileInput" @change="uploadFile">
        <div class="not_login" v-if="isLogin==false">
          <div class="wechat_login">授权微信登陆</div>
          <div class="login_reg" @click="logByPhone">手机号登陆/注册</div>
        </div>
        <div class="had_login" v-else>
          <div class="wechat_login">王大力最帅</div>
          <div class="login_reg">渠道编号：123456</div>
        </div>
      </div>
      <div class="logout_wrap">
        <div class="logout" v-if="isLogin" @click="logOut"/>
      </div>
    </div>

    <div class="item_wrap">
      <div class="title">我的业绩</div>
      <div class="item_list item_list_performance">
        <div class="reward_wrap performance_item">
          <div class="reward">
            {{useInfo.reward}}
            <span class="mini">元</span>
          </div>
          <div class="info">我的酬金</div>
        </div>
        <div class="business_wrap performance_item">
          <div class="business">
            {{useInfo.business}}
            <span class="mini">个</span>
          </div>
          <div class="info">我的办理</div>
        </div>
        <div class="recharge_wrap performance_item">
          <div class="recharge">
            {{useInfo.recharge}}
            <span class="mini">元</span>
          </div>
          <div class="info">我的充值</div>
        </div>
        <div class="score_wrap performance_item">
          <div class="score">
            {{useInfo.score}}
            <span class="mini">积分</span>
          </div>
          <div class="info">我的积分</div>
        </div>
      </div>
    </div>
    <div class="separator"/>

    <div class="item_wrap">
      <div class="title">我的服务</div>
      <div class="item_list">
        <div class="reward_wrap service_item" @click="jumpTo('applyChannel')">
          <div class="channel icon"/>
          <div class="info">渠道申请</div>
        </div>
        <div class="business_wrap service_item" @click="jumpTo('applyPartner')">
          <div class="partner icon"/>
          <div class="info">合伙人申请</div>
        </div>
        <div class="recharge_wrap service_item" @click="jumpTo('myChannel')">
          <div class="my_channel icon"/>
          <div class="info">我的渠道</div>
        </div>
        <div class="score_wrap service_item" @click="jumpTo('notificationsCenter')">
          <div class="notifications icon"/>
          <div class="info">通知中心</div>
        </div>
        <div class="score_wrap service_item" @click="jumpTo('mySigned')">
          <div class="signed icon"/>
          <div class="info">我的签约</div>
        </div>
        <div class="score_wrap service_item" @click="jumpTo('protocol')">
          <div class="protocol icon"/>
          <div class="info">合作协议</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import header from '../../components/header'
import { mapState } from 'vuex'
export default {
  components: {
    myHeader: header
  },
  data () {
    return {
      // isLogin: false,
      useInfo: {
        reward: 0,
        business: 0,
        recharge: 0,
        score: 0
      },
      avatarUrl: ''
    }
  },

  computed: {
    ...mapState({
      isLogin: 'isLogin',
      role: 'role'
    })
  },
  watch: {
    isLogin (newValue, oldValue) {
      if (newValue === true) {
        this.axios.get('getUserPerformance').then(res => {
          console.log(res.data)
          this.useInfo.reward = parseInt(res.data.reward)
          this.useInfo.recharge = parseInt(res.data.recharge)
          this.useInfo.score = res.data.score
          this.useInfo.business = res.data.businessCount
        })
      } else {
        this.useInfo.reward = 0
        this.useInfo.recharge = 0
        this.useInfo.score = 0
        this.useInfo.business = 0
      }
    }
  },
  created () {
    this.avatarInit()
  },
  methods: {
    avatarInit () {
      this.axios.get('getAvatar').then(res => {
        this.avatarUrl = res.data + `?t=${ Math.random() }`
      })
    },
    uploadavatar () {
      this.$refs.fileInput.click()
    },
    uploadFile (event) {
      var formData = new FormData()
      formData.append('file', event.target.files[0])
      // console.log(formData)
      // var params = {
      //   imgData: formData
      // }
      if (event.target.files[0] !== undefined) {
        this.axios.post('uploadAvatar', formData,
          { headers: {
            'Content-Type': 'multipart/form-data'
          }}).then(res => {
          console.log(res.data)
          this.avatarUrl = res.data + `?t=${ Math.random() }`
        })
      }
      // console.log(event.target.files[0])
    },

    login () {
    },
    jumpTo (url) {
      this.$router.push('/' + url)
    },
    logOut () {
      console.log(32)
      this.$store.commit('setLogWrapState', true)
    },
    logByPhone () {
      this.$store.commit('setLogWrapState', true)
    }
  },
  beforeRouteLeave (to, from, next) {
    console.log(to.path)
    if (this.isLogin == false) {
      switch (to.path) {
        case '/applyChannel':
          this.$store.commit('setLogWrapState', true)
          break
        case '/applyPartner':
          this.$store.commit('setLogWrapState', true)
          break
        case '/myChannel':
          this.$store.commit('setLogWrapState', true)
          break
        case '/notificationsCenter':
          this.$store.commit('setLogWrapState', true)
          break
        case '/mySigned':
          this.$store.commit('setLogWrapState', true)
          break
        case '/protocol':
          this.$store.commit('setLogWrapState', true)
          break
        default:
          next()
          break
      }
    } else {
      next()
    }
  }
}

</script>
<style lang='stylus' scoped>
@import '../../stylus/mixin.styl'
.login_wrap
  font-family PingFangSC-Semibold
  width 100%
  height 2.85rem
  bg-image('grzx_tbbj')
  display flex
  align-items center
  justify-content space-around
  .longin_content
    margin-left 0.51rem
    display flex
    justify-content flex-start
    .avatar
      margin-right 0.48rem
      width 1.3rem
      height 1.3rem
      cursor pointer
    .uploadInput
      width 0rem
      height 0rem
      display none
    .not_login
      display flex
      flex-direction column
      justify-content space-around
      .wechat_login
        width 2.2rem
        height 0.56rem
        line-height 0.56rem
        background #FFFFFF
        border-radius 30px
        font-size 13px
        font-weight 500
        color #478CFE
      .login_reg
        font-size 12px
        color #FFFFFF
    .had_login
      display flex
      flex-direction column
      justify-content space-around
      .wechat_login
        width 2.2rem
        height 0.56rem
        line-height 0.56rem
        border-radius 30px
        font-weight 0
        font-size 18px
        color #FFFFFF
      .login_reg
        font-size 12px
        color #FFFFFF
  .logout_wrap
    width 0.48rem
    height 0.48rem
    margin-top 0.4rem
    align-self flex-start
  .logout
    width 0.48rem
    height 0.48rem
    bg-image('grzx_icon_tc2')
.item_wrap
  font-family PingFangSC-Regular
  padding-left 0.41rem
  padding-right 0.41rem
  .title
    font-size 14px
    color rgba(0, 0, 0, 0.9)
    box-sizing border-box
    height 0.94rem
    line-height 0.94rem
    border-bottom 0.01rem solid #DCDCDC
    font-weight 500
  .item_list_performance
    height 1.6rem
  .item_list
    font-size 15px
    color #478CFE
    font-weight 600
    display flex
    flex-wrap wrap
    justify-content space-between
    align-items center
    .performance_item
      width 25%
      height 1rem
      .mini
        font-size 10px
        font-weight 400
      .info
        font-size 11px
        color rgba(0, 0, 0, 0.6)
        font-weight 400
        margin-top 0.1rem
    .service_item
      width 33.3333%
      height 1.2rem
      display flex
      flex-direction column
      justify-content space-around
      align-items center
      padding-top 0.7rem
      .channel
        bg-image('grzx_icon_qdsq')
      .partner
        bg-image('grzx_icon_hhrsq')
      .my_channel
        bg-image('grzx_icon_wdqd')
      .notifications
        bg-image('grzx_icon_tzzx')
      .signed
        bg-image('grzx_icon_wdqx')
      .protocol
        bg-image('grzx_icon_hzxy')
      .icon
        width 0.6rem
        height 0.6rem
      .info
        font-size 11px
        color rgba(0, 0, 0, 0.6)
        font-weight 400
.separator
  height 0.12rem
  background #F5F5F5
</style>
