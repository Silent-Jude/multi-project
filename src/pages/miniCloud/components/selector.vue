<!-- 数据搜索组件，需要由父组件传入3个参数，
入参：3个
title是选择前的标题，string，
width是显示器的宽度，字符串，带单位。eg：3.2rem，
data是需要选择的数据列表，数组。

取值请使用ref绑定，取值为selectedData.
或者使用this.$emit触发的自定义事件selected获取。
-->
<template>
  <div class="app_selector" :data-value="selectedData">
    <!-- 选择器，控制模态框出现并显示数据 -->
    <div class="selector">
      <div class="show_data" :style="'width:'+width" @click="selectData">
        <p v-if="!isSelectorClicked">{{title}}</p>
        <p v-if="isSelectorClicked">{{selectedData}}</p>
        <i class="icon"/>
      </div>
    </div>

    <!-- 选择数据的模态框组件。 -->
    <mt-popup v-model="show" position="bottom" class="my_selector">
      <mt-picker :slots="slots" showToolbar @change="onDataChange">
        <!-- 这里是Toolbar中的内容，通过插槽slot实现 -->
        <div class="picker-toolbar">
          <span class="mint-datetime-action mint-datetime-cancel" @click="cancelPicker">取消</span>
          <span class="mint-datetime-action mint-datetime-confirm" @click="handleConfirm">确定</span>
        </div>
      </mt-picker>
    </mt-popup>
  </div>
</template>

<script>
// import Bus from '../utils/bus'
export default {
  props: ['title', 'width', 'data'],
  components: {},
  data () {
    return {
      // value: '',
      selectedData: '',
      tempData: '',
      isSelectorClicked: false,
      show: false,
      slots: [
        {
          flex: 1,
          values: '',
          className: 'slot1',
          textAlign: 'center'
        }
      ]
    }
  },

  computed: {

  },

  watch: {},

  created () {
    this.getData()
  },

  methods: {
    getData () {
      this.slots[0].values = this.data
    },
    // 确认类型函数。
    handleConfirm () {
      this.show = false
      this.isSelectorClicked = true
      this.selectedData = this.tempData
      // Bus.$emit('selected', this.selectedData)
      this.$emit('selected', this.selectedData)
      // this.getAsyncData()
    },
    cancelPicker () {
      this.show = false
    },
    selectData () {
      this.show = true
    },
    onDataChange (picker, values) {
      this.tempData = values[0]
    }
  }
}

</script>
<style lang='stylus' scoped>
@import '../stylus/mixin.styl'
// 模态框中设置宽度和下划线
.my_selector
  width 100%
  .picker-toolbar
    border-bottom 0.01rem solid #eaeaea
// 选择器的样式
.selector
  font-size 14px
  color rgba(0, 0, 0, 0.6)
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
      bg-image('tjzx_icon_sj','../')
.send_data
  margin 0 auto
  width 2.65rem
  height 0.7rem
  bg-image('tjzx_button_tjsj','../')
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
