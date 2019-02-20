import tetrominoes from './tetrominoes.js'

export default class Game {
  constructor() {
    this.board = [];
    this.current = null;
    this.next = null;
    this.dir = 0;
    this.score = 0;
    this.lines = 0;
    this.pieces = []
    this.currentX = 0;
    this.currentY = 0;
  }

  init() {
    this.setBoard(this.generateBoard())
    this.setCurrent(this.selectRandomPiece())
    this.setNext(this.selectRandomPiece())

    // runs setInterval on this.tick
    setInterval(this.tick, 1000)
  }

  generateBoard() {
    const board = Array(20)
    for (let i = 0; i < board.length; i++) {
      const newRow = Array(10).fill(0)
      board[i] = newRow
    }
    return board
  }

  selectRandomPiece() {
    if (this.pieces.length === 0) this.generatePieces()

    const type = this.pieces.splice(random(this.pieces.length - 1), 1)[0]
    return tetrominoes.find(e => e.type === type)

    function random(end) {
      return Math.floor(Math.random() * end)
    }
  }

  generatePieces() {
    this.pieces = [...Array(4).fill('I'), ...Array(4).fill('O'), ...Array(4).fill('L'), ...Array(4).fill('J'), ...Array(4).fill('S'), ...Array(4).fill('Z'), ...Array(4).fill('T')];
  }

  tick() {
    const canMoveDown = this.canMove(0, 1)
    if (canMoveDown) updateXY()
    // calls canMove to determine if piece will move down or if next is called next
    // will also check if any lines have been formed
  }

  canMove(dX, dY) {
    console.log('currentX', this.currentX)
    console.log('currentY', this.currentY)
    const isOccupied = (x, y) => {
      const cellOccupied = !!this.getCell(x + dX, y + dY)
      if(cellOccupied) result = false
    }

    let result = true
    this.loopThruPiece(this.current, this.currentX, this.currentY, this.dir, isOccupied)
    return result
  }

  calculateScore() {}

  rotate() {}

  linesCompleted() {
    // check if lines are completed
    // check if a tetris was formed (extra points)
  }

  clearCompleted() {
    // clears completed lines
    // moves rows above completed lines down
  }

  loopThruPiece(type, x, y, dir, fn) {
    let row = 0, col = 0, blocks = type.blocks[dir]
    for (let bit = 0x8000; bit > 0; bit = bit >> 1) {
      if (blocks & bit) {
        fn(x + col, y + row);
      }
      if (++col === 4) {
        col = 0;
        ++row;
      }
    }
  }

  setScore() {}

  setCurrent(piece) { this.current = piece }

  setNext(piece) { this.next = piece }

  setBoard(board) { this.board = board }

  getCell(x, y) {
    if (y >= this.board.length) return -1
    if (x >= this.board[y].length) return -1
    return this.board[y][x]
  }
}

// this.board is a 10x20 2-D array
