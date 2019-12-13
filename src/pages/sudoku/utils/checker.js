
import { boxToolkit, makeMatrix } from './toolkit'
/**
 * 检查九宫格行正确性
 * @param {*} arr
 */
export function checkSudokuRow (arr = [[]]) {
  return arr.every(row => row.sort((a, b) => a - b).join('') == '123456789')
}

/**
 * 检查九宫格列正确性
 * @param {*} arr
 */
export function checkSudokuColumn (arr = [[]]) {
  // return transformMatrix(arr).every(row => row.sort((a, b) => a - b).join('') == '123456789')
  return arr.every((row, i, arr) => arr
    .map(row => row[i])
    .sort((a, b) => a - b)
    .join('') == '123456789'
  )
}

/**
 * 检查九宫格每一个宫的正确性
 * @param {*} arr 待验证的九宫格数组。
 */
export const checkSudokuBySudoku = (arr = [[]]) => {
  let tempArr = []
  for (let n = 0; n < 9; n++) {
    tempArr[n] = []
    for (let i = 0; i < 9; i++) {
      tempArr[n].push(arr[3 * (n % 3) + i % 3][3 * Math.floor(n / 3) + Math.floor(i / 3)])
    }
    let res = tempArr[n].sort((a, b) => a - b).join('') == '123456789'
    if (!res) {
      console.log(`第${ n }格出现错误！`)
      return false
    }
  }
  return true
}

// 按标记找出错误的数组。
export const checkArray = (arr) => {
  let length = arr.length
  let marks = Array.from({ length }, v => true)
  for (let i = 0; i < length - 1; i++) {
    if (!marks[i]) {
      continue
    }
    // 0的时候false ，1-9则true
    if (!arr[i]) {
      marks[i] = false
      continue
    }
    // 重复的时候。
    for (let j = i + 1; j < length; j++) {
      if (arr[i] == arr[j]) {
        marks[j] = false
        marks[i] = false
      }
    }
  }
  return marks
}

/**
 *   检查指定位置可以填写数字n
 */
export const checkFillable = (matrix, n, rowIndex, colIndex) => {
  const row = matrix[rowIndex]
  const col = matrix.map(row => row[colIndex])
  const { boxIndex } = boxToolkit.convertToBoxIndex(rowIndex, colIndex)
  const box = boxToolkit.getBoxCells(matrix, boxIndex)
  return !row.includes(n) && !col.includes(n) && !box.includes(n)
}

// 输入：matrix，用户完成的数独数据，9*9
// 处理：对matrix的行，列宫进行检查，并填写marks
// 输入：检查是否成功，和marks
export class Checker {
  constructor (matrix) {
    this.matrix = matrix
    this.matrixMark = makeMatrix(true)
  }
  check () {
    this.checkRow()
    this.checkCol()
    this.checkSudoku()
    this.success = this.matrixMark.every(row => row.every(mark => mark))
    return this.success
  }
  checkRow () {
    this.matrix.forEach((row, r) => {
      let marks = checkArray(row)
      marks.forEach((mark, c) => {
        if (!mark) {
          this.matrixMark[r][c] = false
        }
      })
    })
  }
  checkCol () {
    this.matrix.forEach((row, c, arr) => {
      let marks = checkArray(arr.map(row => row[c]))
      marks.forEach((mark, r) => {
        if (!mark) {
          this.matrixMark[r][c] = false
        }
      })
    })
  }
  checkSudoku () {
    for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
      let marks = checkArray(boxToolkit.getBoxCells(this.matrix, boxIndex))
      marks.forEach((mark, cellIndex) => {
        if (!mark) {
          let { rowIndex, colIndex } = boxToolkit.convertFromBoxIndex(boxIndex, cellIndex)
          this.matrixMark[rowIndex][colIndex] = false
        }
      })
    }
  }
}
