<!-- 统计中心页面 -->
<template>
  <div>
    <my-header title="统计中心"/>
    <div class="btn_group">
      <p class="btn_business" :class="{'active':path=='/statistics/business'}" @click="selectBusiness">业务</p>
      <p class="btn_reward" :class="{'active':path=='/statistics/reward'}" @click="selectReward">酬金</p>
      <p class="btn_score" :class="{'active':path=='/statistics/score'}" @click="selectScore">积分</p>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import header from '../../components/header'
export default {
  components: {
    myHeader: header
  },
  data () {
    return {

    }
  },

  computed: {
    ...mapState({
      isLogin: 'isLogin'
    }),
    path: function () {
      return this.$route.path
    }
  },

  watch: {},

  created () {
    console.log(this.path)
  },

  methods: {
    selectBusiness () {
      console.log(this.path)
      this.$router.push('/statistics/business')
    },
    selectReward () {
      console.log(this.path)
      this.$router.push('/statistics/reward')
    },
    selectScore () {
      console.log(this.path)
      this.$router.push('/statistics/score')
    }
  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next(vm => {
      if (vm.isLogin) {
        next()
      } else {
        next('/personal')
        vm.$store.commit('setLogWrapState', true)
      }
    })
  }
}

</script>
<style lang='stylus' scoped>
.btn_group
  width 6rem
  height 0.6rem
  line-height 0.6rem
  padding-top 0.4rem
  margin 0 auto
  font-size 13px
  color #2C7EFF
  display flex
  justify-content center
  .active
    background #2C7EFF
    color #fff
  .btn_business
    flex auto
    border 0.02rem solid #2C7EFF
    border-right none
    border-top-left-radius 0.3rem
    border-bottom-left-radius 0.3rem
  .btn_reward
    flex auto
    border 0.02rem solid #2C7EFF
    border-right none
  .btn_score
    flex auto
    border 0.02rem solid #2C7EFF
    border-top-right-radius 0.3rem
    border-bottom-right-radius 0.3rem
</style>
