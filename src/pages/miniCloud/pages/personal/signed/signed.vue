<!-- 签约画布页面 -->
<template>
  <div class="signed">
    <backHeader title="签约"/>
    <div class="sign_wrap" ref="sign_wrap">
      <canvas ref="signCanvas" @touchstart="touchStart" @touchmove="touchMove"/>
    </div>
    <div class="bottom">
      <div class="clear" @click="clear">清空</div>
      <div class="query" @click="submit">提交</div>
    </div>
  </div>
</template>
<script>
import backHeader from '../../../components/headerBack'
export default {
  components: {
    backHeader
  },
  data () {
    return {
      points: [],
      startX: 0,
      startY: 0,
      moveX: 0,
      moveY: 0,
      endX: 0,
      endY: 0,
      w: null,
      h: null,
      imgData: '',
      isDown: false,
      canvas: null,
      ctx: null,
      signedDataUrl: ''
    }
  },

  computed: {},

  watch: {},

  created () { },
  mounted () {
    this.canvas = this.$refs.signCanvas
    // 这里不能使用css操作canvas，会导致图形拉伸。
    this.canvas.width = this.$refs.sign_wrap.offsetWidth
    this.canvas.height = this.$refs.sign_wrap.offsetHeight
    this.ctx = this.canvas.getContext('2d')
  },

  methods: {
    touchStart (e) {
      e.preventDefault()
      if (e.touches.length === 1) {
        let obj = {
          x: e.targetTouches[0].clientX,
          y: e.targetTouches[0].clientY - 64
        }
        this.startX = obj.x
        this.startY = obj.y
      }
    },
    touchMove (e) {
      e.preventDefault()
      if (e.touches.length === 1) {
        let obj = {
          x: e.targetTouches[0].clientX,
          y: e.targetTouches[0].clientY - 64
        }
        this.moveX = obj.x
        this.moveY = obj.y
        this.ctx.beginPath()
        this.ctx.moveTo(this.startX, this.startY)
        this.ctx.lineTo(this.moveX, this.moveY)
        this.ctx.closePath()
        this.ctx.stroke()
        console.log()
        this.startX = obj.x
        this.startY = obj.y
      }
    },
    clear () {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    submit () {
      this.signedDataUrl = this.canvas.toDataURL()
      console.log('已经保存成功！')
      // console.log(this.signedDataUrl)
      var url = 'upload'
      var params = {
        imgData: this.signedDataUrl.replace(/^data:image\/(png|jpeg);base64,/, '')
      }
      // console.log(params)
      this.axios.post(url, params).then(res => {
        console.log(res.data)
        this.$router.push('/mySigned')
      })
    }

  }

}

</script>
<style lang='stylus' scoped>
.sign_wrap
  width 100%
  height 11rem
  position relative
.bottom
  width 100%
  font-size 16px
  display flex
  justify-content space-between
  position fixed
  top 100%
  transform translateY(-100%)
  .clear
    flex auto
    height 1rem
    line-height 1rem
    color rgba(0, 0, 0, 0.6)
  .query
    flex auto
    height 1rem
    line-height 1rem
    color #fff
    background #478CFE
</style>
