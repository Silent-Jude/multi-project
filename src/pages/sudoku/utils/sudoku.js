import GeneratorSudoku from './generator'
export default class Sudoku {
  // constructor () {

  // }
  init (level = 5) {
    this.generatSudoku()
    return this.puzzleSudoku(this.level)
  }
  generatSudoku () {
    const sudoku = new GeneratorSudoku()
    sudoku.generate()
    this.matrix = sudoku.matrix
    console.log(this.matrix)
  }
  puzzleSudoku (level = 5) {
    this.matrix = this.matrix.map(row => row.map(cell => {
      return Math.random() * 9 < level ? '' : cell
    }))
  }
}
