<!-- 主页 -->
<template>
  <div class="sudoku_wrap">
    <div class="sudoku">
      <h1 class="title">数独游戏</h1>
      <!-- <div class="test">
        我是测试。{{style.specialWidth}}
      </div> -->
      <!-- 九宫格 -->
      <div class="sudoku_grid grid">
        <div class="row" v-for="(rows, rowNumber) of matrix" :key="rowNumber">
          <div class="cell"
            v-for="(cell, colNumber) of rows"
            :key="colNumber"
            :class="[
            {'exist':checkExist(rowNumber, colNumber)},
            gridBorder(rowNumber, colNumber),
            checkGridStyle(rowNumber, colNumber),
            sureClass(rowNumber, colNumber),
            doubtClass(rowNumber, colNumber)
            ]"
            @click="open($event,rowNumber,colNumber)"
          >
            {{cell}}
          </div>
        </div>
        <!-- 弹出层面板 -->
        <div class="popup-wrap" v-if="popupShow" @click="close">
          <div class="popup grid" ref="popup">
            <div v-for="row in 3" :key="row + 'row'" class="row">
              <span v-for="n in 3" :key="n" @click.stop="fillNumber">
                {{(row-1)*3+n}}
              </span>
            </div>
            <div class="row">
              <span class="doubt" @click.stop="doubt">?</span>
              <span @click.stop="clearStyle"></span>
              <span class="sure" @click.stop="sure">√</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 按钮组 -->
      <div class="dashboard">
        <button @click="check">检查结果</button>
        <button @click="clearErr">清除标记</button>
        <button @click="reset">重来本局</button>
        <button @click="init">新的挑战</button>
      </div>
    </div>

  </div>
</template>

<script>
import { Checker } from '../utils/checker'
import Sudoku from '../utils/sudoku'

import style from '../style.less'
export default {
  components: {
  },
  data () {
    return {
      sureList: [],
      doubtList: [],
      popupShow: false,
      matrix: [],
      matrixMarks: [],
      sourceMatrix: [],
      currentRowIndex: 0,
      currentColIndex: 0
      // currentTarget: nul
    }
  },

  computed: {
    style () {
      return style
    }
  },

  watch: {},

  created () {
    this.init()
  },

  methods: {
    reset () {
      this.matrix = this.sourceMatrix.map(row => row.map(v => v))
      this.clearErr()
    },
    clearErr () {
      this.matrixMarks = []
      this.sureList = []
      this.doubtList = []
    },
    init () {
      const sudoku = new Sudoku()
      sudoku.init(5)
      const matrix = sudoku.matrix
      this.matrix = matrix
      this.sourceMatrix = this.matrix.map(row => row.map(v => v))
      this.sureList = []
      this.doubtList = []
      this.popupShow = false
      this.matrixMarks = []
      this.currentRowIndex = 0
      this.currentColIndex = 0
    },
    sureClass (rowNumber, colNumber) {
      let str = [rowNumber, colNumber].join('')
      if (this.sureList.includes(str)) {
        return 'sure'
      } else return ''
    },
    doubtClass (rowNumber, colNumber) {
      let str = [rowNumber, colNumber].join('')
      if (this.doubtList.includes(str)) {
        return 'doubt'
      } else return ''
    },
    clearStyle () {
      let str = [this.currentRowIndex, this.currentColIndex].join('')
      let doubtIndex = this.doubtList.indexOf(str)
      let sureIndex = this.sureList.indexOf(str)
      if (doubtIndex !== -1) {
        this.doubtList.splice(doubtIndex, 1)
      }
      if (sureIndex !== -1) {
        this.sureList.splice(sureIndex, 1)
      }
      this.matrix[this.currentRowIndex][this.currentColIndex] = ''
      this.close()
    },
    sure () {
      let str = [this.currentRowIndex, this.currentColIndex].join('')
      let doubtIndex = this.doubtList.indexOf(str)
      console.log('sure', str, doubtIndex)
      // 先去除doubt，避免样式影响。
      if (doubtIndex !== -1) {
        this.doubtList.splice(doubtIndex, 1)
      }
      // 如果已经有了，那么就不会再添加。
      if (!this.sureList.includes(str)) {
        this.sureList.push(str)
      }
      this.close()
      console.log('this.sureList', this.sureList)
      console.log('this.doubtList', this.doubtList)
    },
    doubt () {
      let str = [this.currentRowIndex, this.currentColIndex].join('')
      let sureIndex = this.sureList.indexOf(str)
      console.log('doubt', str, sureIndex)
      // 先去除sure，避免样式影响。
      if (sureIndex !== -1) {
        this.sureList.splice(sureIndex, 1)
      }
      // 如果已经有了，那么就不会再添加。
      if (!this.doubtList.includes(str)) {
        this.doubtList.push(str)
      }
      this.close()
      console.log('this.sureList', this.sureList)
      console.log('this.doubtList', this.doubtList)
    },
    fillNumber (e) {
      console.log(e.target.innerText)
      this.matrix[this.currentRowIndex][this.currentColIndex] = e.target.innerText
      this.popupShow = false
    },
    open (e, rowNumber, colNumber) {
      if (this.sourceMatrix[rowNumber][colNumber]) return
      this.currentRowIndex = rowNumber
      this.currentColIndex = colNumber
      this.popupShow = true
      const { offsetLeft, offsetTop } = e.target
      this.$nextTick(() => {
        console.log(this.$refs)
        const popupWidth = this.$refs.popup.offsetWidth
        const cellWidth = Math.floor(popupWidth / 3)
        const cellHeight = Math.floor(this.$refs.popup.offsetHeight / 4)
        if (offsetLeft >= popupWidth * 2 + cellWidth && offsetLeft < popupWidth * 2 + 2 * cellWidth) {
          // console.log('处理倒数第二列')
          this.$refs.popup.style.left = offsetLeft - cellWidth + 'px'
          this.$refs.popup.style.top = offsetTop + 'px'
          return
        }
        if (offsetLeft >= popupWidth * 2 + 2 * cellWidth && offsetLeft < popupWidth * 3) {
          // console.log('处理倒数第一列')
          this.$refs.popup.style.left = offsetLeft - 2 * cellWidth + 'px'
          this.$refs.popup.style.top = offsetTop + 'px'
          return
        }
        if (offsetTop >= cellHeight * 8 && offsetLeft < cellHeight * 9) {
          // console.log('处理倒数第一行')
          this.$refs.popup.style.left = offsetLeft + 'px'
          this.$refs.popup.style.top = offsetTop - cellHeight + 'px'
          return
        }
        this.$refs.popup.style.left = offsetLeft + 'px'
        this.$refs.popup.style.top = offsetTop + 'px'
      })
    },
    close () { this.popupShow = false },
    check () {
      const checker = new Checker(this.matrix)
      let res = checker.check()
      this.matrixMarks = checker.matrixMark
      this.sureList = []
      this.doubtList = []
      if (res) {
        alert('挑战成功！')
      }
    },
    checkExist (rowNumber, colNumber) {
      return this.sourceMatrix[rowNumber][colNumber]
    },
    checkGridStyle (rowNumber, colNumber) {
      if (this.matrixMarks.length !== 0) {
        if (this.matrixMarks[rowNumber][colNumber]) return 'normal'
        else return 'error'
      } else return 'normal'
    },
    gridBorder (rowNumber, colNumber) {
      let className = ' '
      // 增加里面宫格边框。
      if (rowNumber % 3 === 2) className += 'bottom_bold '
      if (colNumber % 3 === 2) className += 'right_bold '

      // 取消多余宫格边框。
      if (colNumber % 3 == 0) className += 'empty_left '
      if (rowNumber % 3 == 0) className += 'empty_top '

      // 最外边边框。
      if (rowNumber === 0) className += 'top_bold '
      if (colNumber === 0) className += 'left_bold '
      if (rowNumber === 8) className += 'bottom_bold '
      if (colNumber === 8) className += 'right_bold '

      return className
    }

  }
}
</script>
<style rel='stylesheet/less' lang='less' scoped>
@shadowBottom: 0 0.06rem 0.06rem rgba(48, 48, 48, 192);
@shadowTop: 0 -0.03rem 0.06rem rgba(48, 48, 48, 192);
.sudoku_wrap {
  position: relative;
  font-size: 14px;
  background-color: #eee;
  font-family: 'Consolas', '微软雅黑';
  user-select: none;
  max-width: 9rem;
  height: 100%;
  .sudoku {
    border: 1px solid #000;
    .title {
      text-align: center;
      padding: 0.2rem 5%;
      background-color: steelblue;
      color: #fff;
      box-shadow: @shadowBottom;
    }
    .sudoku_grid {
      position: relative;
      height: 9rem;
      margin-bottom: 1rem;
      // padding: 5%;
      text-align: center;
      margin-top: 0.3rem;
      .row {
        display: flex;
        justify-content: center;
        .cell {
          box-sizing: border-box;
          background-color: #fff;
          cursor: pointer;
          text-align: center;
          width: 0.8rem;
          height: 0.8rem;
          line-height: 0.8rem;
          border: 1px solid #ccc;
          border-right: none;
          border-bottom: none;
        }
        .top_bold {
          border-top: 2px solid #ccc !important;
        }
        .left_bold {
          border-left: 2px solid #ccc !important;
        }
        .bottom_bold {
          border-bottom: 2px solid #ccc !important;
        }
        .right_bold {
          border-right: 2px solid #ccc !important;
        }
        .empty_top {
          border-top: none;
        }
        .empty_left {
          border-left: none;
        }
        .normal {
          background-color: #fff;
        }
        .error {
          background-color: #ff7e7e;
        }
        .empty {
          background-color: #fff;
        }
        .exist {
          background-color: #eee !important;
        }
        .doubt{
          background-color: rgba(250,191,143)
        }
        .sure{
          background-color: rgba(146,208,80)
        }
      }
      .popup-wrap{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.2);
        .popup{
          position: absolute;
          top: 0;
          left: 0;
          background-color: #fff;
          // border: solid 2px #ccc;
          text-align: center;
          .row{
            display: flex;
            border-bottom: 1px solid #ccc;
            &:last-child{
              border-bottom: none
            }
            span{
              box-sizing: border-box;
              width: 0.8rem;
              height: 0.8rem;
              line-height: 0.8rem;
              border-right: 1px solid #ccc;
              cursor: pointer;
              &:last-child{
                border-right: none
              }
            }
            .doubt{
              background-color: rgba(250,191,143)
            }
            .sure{
              background-color: rgba(146,208,80)
            }
          }
        }
      }
    }
    .dashboard {
      border: 1px solid #000;
      display: flex;
      justify-content: space-around;
      box-shadow: @shadowTop;
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      button {
        border: none;
        background-color: steelblue;
        flex: auto;
        color: #fff;
        height: 1rem;
        border-right: 1px solid #fff;
        &:last-child {
          border-right: none;
        }
      }
    }
  }
}
</style>

