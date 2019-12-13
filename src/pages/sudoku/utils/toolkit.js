// 工具箱
/**
 * 生成一行数组
 * @param {*} v 每行的初始值
 * @param {*} c 列长度。
 * boxIndex,
 */
const makeRow = (v = 0, c = 9) => Array.from({
  length: c
}, () => v)

/**
 * 生成一个二维矩阵
 * @param {*} v 矩阵单元格初始值
 * @param {*} c 矩阵列数
 * @param {*} r 矩阵行数
 * n2
 */
export const makeMatrix = (v = 0, c = 9, r = 9) => Array.from({
  length: r
}, () => makeRow(v, c))

/**
 * 将任意二维数组行列转换。依赖makeMatrix,不改变原数组。
 * @param {*} arr 需要转置的二维数组。
 * 2*n2
 */
export const transformMatrix = (arr = [[]]) => {
  let row = arr.length
  let col = arr[0].length
  let tempArr = makeMatrix(0, row, col)
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      tempArr[j][i] = arr[i][j]
    }
  }
  return tempArr
}

/**
 * 正方形矩阵转换，改变原数组。但是效率高一些。
 * @param {*} arr 需要转置的平方矩阵
 * 这种方式遍历效率高一些，但是改变了原数组。空间复杂度低很多。
 */
export function transformSquareMatrix (arr = [[]]) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr[i].length; j++) {
      [arr[i][j], arr[j][i]] = [arr[j][i], arr[i][j]]
    }
  }
  return arr
}

/**
 * Fisher-Yates 洗牌算法
 * @param {*} arr 需要洗牌的数组
 */
export function shuffle (arr = []) {
  const endIndex = arr.length - 2
  for (let i = 0; i <= endIndex; i++) {
    const randomIndex = Math.floor(Math.random() * (arr.length - i));
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
  }
  return arr
}

// 坐标系工具类
export const boxToolkit = {
  convertToBoxIndex (rowIndex, colIndex) {
    return {
      boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
      cellIndex: rowIndex % 3 * 3 + colIndex % 3
    }
  },
  convertFromBoxIndex (boxIndex, cellIndex) {
    return {
      rowIndex: 3 * Math.floor(boxIndex / 3) + Math.floor(cellIndex / 3),
      colIndex: 3 * (boxIndex % 3) + cellIndex % 3
    }
  },
  getBoxCells (matrix, boxIndex) {
    return matrix.map((row, i, matrix) => {
      const { rowIndex, colIndex } = boxToolkit.convertFromBoxIndex(boxIndex, i)
      return matrix[rowIndex][colIndex]
    })
  }
}
