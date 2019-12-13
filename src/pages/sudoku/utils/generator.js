import { makeMatrix, shuffle } from './toolkit'
import { checkFillable } from './checker'
class GeneratorSudoku {
  generate () {
    this.count = 1
    while (!this.tryGenerate()) {
      console.log('初始化数独失败，尝试重新生成！——————', this.count++)
      this.tryGenerate()
    }
  }
  tryGenerate () {
    this.matrix = makeMatrix()
    this.orders = makeMatrix()
      .map(row => row.map((v, i) => i))
      .map(row => shuffle(row))
    return this.matrix.every((row, i) => this.fillNumber(i + 1))
  }

  fillNumber (n) {
    return this.fillRow(n, 0)
  }

  fillRow (n, rowIndex) {
    // 大于8说明全部填完了。
    if (rowIndex > 8) {
      return true
    }
    const row = this.matrix[rowIndex]
    const orders = this.orders[rowIndex]
    // 一列列的尝试，看看当前列是否可以填入数字n。
    for (let c = 0; c <= 8; c++) {
      const colIndex = orders[c]
      // 如果当前列有值，说明已经填写。
      if (row[colIndex] !== 0) {
        continue
      }
      // 如果这里不能填写n，就跳过。
      if (!checkFillable(this.matrix, n, rowIndex, colIndex)) {
        continue
      }
      row[colIndex] = n
      // 如果可以填，就递归调用继续填写下一行。
      // 如果填写下一行失败，就继续寻找当前行的下一个位置。
      if (!this.fillRow(n, rowIndex + 1)) {
        row[colIndex] = 0
        continue
      }

      return true
    }
    // 如果都不能，那么就返回false，说明不能填。
    return false
  }
}

export default GeneratorSudoku
