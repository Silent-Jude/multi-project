<!-- 主页 -->
<template>
  <div class="app_home">

    <mt-popup v-model="logWrapIsShow" position="center">
      <div class="login" v-if="!isLogin">
        <p>登录</p>
        <div class="logInfo">
          <div class="phone">
            <label>手机号
              <input type="text" placeholder="请输入手机号" v-model="phone" @blur="checkPhone" maxlength="11">
              <span class="icon" :class="{'right':isPhone,'err':!isPhone}" v-show="showIcon"/>
              <span class="warn">{{warnMessage}}</span>
            </label>
          </div>
          <div class="msg">
            <label>验证码
              <input type="text" placeholder="请输入验证码" v-model="msg" @focus="clearErr" maxlength="5">
            </label>
            <span :class="{'disabledMsg':disabledMsg,'useableMsg':!disabledMsg}" @click="getMsg">{{msgText}}</span>
          </div>
        </div>
        <p class="warnMsg">{{warnMsg}}</p>
        <img class="submit" src="../assets/imgs/H5_button_img_16@2x.png" @click="login">
      </div>
      <div class="ensure" v-else>
        <p>确定退出登录？</p>
        <div class="btns">
          <button class="cancel" @click="cancel">取消</button>
          <button class="exit" @click="logout">确定退出</button>
        </div>
      </div>
    </mt-popup>

    <router-view class="display"/>

    <div class="nav_wrap">
      <div class="nav">
        <div class="product nav_item" @click="jumpToPath('/product')">
          <i class="icon" :class="{'icon_active':path=='/product'}"/>
          <span :class="{'active':path=='/product'}">商品中心</span>
        </div>
        <div class="statistics nav_item" @click="jumpToPath('/statistics')">
          <i class="icon" :class="{'icon_active':containPath('statistics')}"/>
          <span :class="{'active':containPath('statistics')}">统计中心</span>
        </div>
        <div class="personal nav_item" @click="jumpToPath('/personal')">
          <i class="icon" :class="{'icon_active':path=='/personal'}"/>
          <span :class="{'active':path=='/personal'}">个人中心</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { mapState } from 'vuex'
export default {
  components: {},
  data () {
    return {
      // path: ''
      // currentIndex: 0,
      logWrapIsShow: false,
      showIcon: false,
      phone: '',
      isPhone: false,
      // 手机号错误提示
      warnMessage: '',
      disabledMsg: false,
      msg: '',
      // 按钮上方错误提示
      warnMsg: '',
      msgText: '获取验证码'
    }
  },

  computed: {
    ...mapState({
      logWrapState: 'logWrapState',
      isLogin: 'isLogin'
    }),
    path () {
      return this.$route.path
    }
  },

  watch: {
    logWrapIsShow (newValue, oldValue) {
      this.$store.commit('setLogWrapState', newValue)
    },
    logWrapState (newValue, oldValue) {
      this.logWrapIsShow = newValue
    }
  },

  created () {
    console.log(this.$router.route)
    console.log(this.$router.options)
  },
  mounted () {
    this.logWrapIsShow = this.$store.getters.getLogWrapState
    // localstorage中有uid，则属于登陆状态。
    if (localStorage.getItem('uid') != undefined) {
      this.$store.commit('setLogin', true)
      this.$store.commit('setRole', localStorage.getItem('role'))
      this.$store.commit('setUid', localStorage.getItem('uid'))
    }
  },

  methods: {
    checkPhone () {
      // 显示icon
      this.showIcon = true
      // 这里只简单判断手机号是否合法。
      var reg = /^1[35789]\d{9}$/
      if (reg.test(this.phone)) {
        // ok
        this.isPhone = true
        this.warnMessage = ''
      } else {
        this.isPhone = false
        this.warnMessage = '请输入11位手机号！'
      }
    },
    containPath (path) {
      if (this.$route.path.indexOf(path) != -1) {
        return true
      }
    },
    jumpToPath (url) {
      // console.log(this.path)
      this.$router.push(url)
    },
    clearErr () {
      this.warnMsg = ''
    },
    getMsg () {
      // 获取验证码函数，控制60秒发送时间。
      if (this.isPhone) {
        // ok,send!
        this.disabledMsg = true
        // var getMsg = document.getElementById("getMsg");
        var seconds = 60
        this.msgText = `${ seconds }s后重新发送`
        var timer = setInterval(() => {
          seconds--
          this.msgText = `${ seconds }s后重新发送`
          if (seconds == -1) {
            this.disabledMsg = false
            this.msgText = '获取验证码'
            clearInterval(timer)
          }
        }, 1000)
        // 这里写发送验证码请求
        var url = 'getmsg'
        var params = { phone: this.phone }
        this.axios.post(url, this.qs.stringify(params)).then(res => {
          console.log(res.data)
          console.log(res)
          console.log('验证码发送成功！')
          if (res.data.code == -2) {
            Toast({
              message: res.data.msg,
              duration: 3000
            })
          }
        })
      }
    },
    cancel () {
      this.logWrapIsShow = false
    },
    logout () {
      this.logWrapIsShow = false
      localStorage.removeItem('uid')
      localStorage.removeItem('role')
      this.$store.commit('setUid', '')
      this.$store.commit('setRole', 0)
      this.$store.commit('setLogin', false)
      this.phone = ''
      this.msg = ''
      this.showIcon = false
      this.$store.commit('setLogin', false)
      // location.reload();
    },
    login () {
      this.warnMsg = ''
      var reg = /^\d{5}$/
      if ((this.isPhone && reg.test(this.msg)) || this.msg == 888) {
        var url = 'login'
        var params = {
          phone: this.phone,
          msg: this.msg
        }
        this.axios
          .post(url, params)
          .then(res => {
            if (res.data.code == -1) {
              console.log('登陆失败！调用注册接口，注册并登陆账户！')
              var url = 'reg'
              this.axios.post(url, `phone=${ this.phone }$msg=${ this.msg }`).then(res => {
                if (res.data.code == 1) {
                  // 注册成功，跳登陆
                  console.log('注册成功')
                  this.login()
                } else {
                  // 注册失败，看看原因
                  console.log('错误错误，看看为什么注册失败')
                }
              })
            } else {
              this.logWrapIsShow = false
              this.$store.commit('setLogin', true)
              localStorage.setItem('uid', res.data[0].uid)
              this.$store.commit(
                'setLogin',
                true
              )
              this.$store.commit(
                'setUid',
                localStorage.getItem('uid')
              )
              this.$store.commit('setRole', res.data[0].role)
              localStorage.setItem('role', res.data[0].role)
              // this.cancelLog = true;
              this.isPhone = false
              this.showIcon = false
              this.phone = ''
              this.msg = ''
              console.log(`登陆角色码为${ res.data[0].role }`)
            }
          })
      } else {
        this.checkPhone()
        this.warnMsg = '验证码错误'
      }
    }
  }
}

</script>
<style lang='stylus' scoped>
@import '../stylus/mixin.styl'
.mint-popup
  transition none
.disabledMsg
  border 1px solid #E6E6E6
  pointer-events none
  color #E6E6E6
.useableMsg
  border 1px solid #ED792F
  color #ED792F
.app_home
  font-family PingFangSC-Regular
.active
  color #478CFE
.display
  margin-bottom 0.95rem
.login
  width 7rem
  height 4.5rem
  background #fff
  border-radius 10px
  position fixed
  z-index 3
  top 50%
  left 50%
  transform translate(-50%, -50%)
  p
    margin-top 0.3rem
    margin-bottom 0.4rem
    font-size 18px
    font-weight 600
    color #6A6A6A
  .logInfo
    font-size 15px
    font-weight 600
    color #6A6A6A
    width 5.6rem
    margin 0 auto
    text-align left
    input
      color #ed792f
      border none
      outline none
      width 1.76rem
      height 0.4rem
      opacity 0.8
    .icon
      display inline-block
      width 17px
      height 17px
      vertical-align sub
    .right
      background url('../assets/imgs/icon.png') 0 -453px
    .err
      background url('../assets/imgs/icon.png') 0 -296px
    .warn
      color red
      font-size 12px
      font-weight normal
    .msg, .phone
      padding-bottom 0.12rem
      padding-top 0.12rem
      border-bottom 0.01rem solid #CDCDCD
      #getMsg
        padding 0.04rem
        border-radius 5px
        font-size 15px
  .warnMsg
    margin 0.1rem
    font-size 12px
    color red
    height 16px
  .submit
    width 200px
    height 37px
    cursor pointer
.ensure
  width 300px
  height 198px
  background #fff
  border-radius 10px
  position fixed
  z-index 3
  top 50%
  left 50%
  transform translate(-50%, -50%)
  display flex
  flex-direction column
  p
    margin-top 0.8rem
    font-size 24px
    color #6A6A6A
    margin-bottom 40px
  .btns
    display flex
    justify-content space-around
    button
      width 100px
      height 37px
      border 3px solid #4B2E95
      border-radius 100px
      outline none
      border 2px solid
      cursor pointer
    .cancel
      background #fff
      font-size 15px
      color #4B2E95
    .exit
      background #4B2E95
      font-size 15px
      color #fff
.nav_wrap
  position fixed
  top 100%
  transform translateY(-100%)
  border-top 0.01rem solid rgba(5, 4, 4, 0.2)
  .nav
    height 0.95rem
    width 7.5rem
    display flex
    justify-content space-around
    font-size 10px
    color rgba(0, 0, 0, 0.4)
    background #fff
    .nav_item
      display flex
      flex-direction column
      justify-content center
      align-items center
      flex auto
    .product
      .icon
        height 0.44rem
        width 0.44rem
        // background url('../assets/imgs/dhl_icon_spzx_wxz@2x.png') no-repeat 0 0 / contain
        bg-image('dhl_icon_spzx_wxz', '../')
      .icon_active
        bg-image('dhl_icon_spzx_xz', '../')
    .statistics
      .icon
        height 0.4rem
        width 0.32rem
        bg-image('dhl_icon_tjzx_wxz', '../')
      .icon_active
        bg-image('dhl_icon_tjzx_xz', '../')
    .personal
      .icon
        height 0.4rem
        width 0.4rem
        bg-image('dhl_icon_grzx_wxz', '../')
      .icon_active
        bg-image('dhl_icon_grzx_xz', '../')
</style>
