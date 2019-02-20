import tetrominoes from './tetrominoes.js'

export default class Game {
  constructor() {
    this.board = [];
    this.currentPiece = null;
    this.nextPiece = null;
    this.score = 0;
    this.lines = 0;
    this.pieces = []
  }

  init() {
    this.board = this.generateBoard()
    this.currentPiece = this.selectRandomPiece()
    this.nextPiece = this.selectRandomPiece()

    // runs setInterval on this.tick
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
    // moves currentPiece down
    // calls canMove to determine if piece will move down or if nextPiece is called next
    // will also check if any lines have been formed
  }

  canMove(dx, dy) {
    // returns T/F
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
}

// this.board is a 10x20 2-D array
