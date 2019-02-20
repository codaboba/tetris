import Game from '../src/Game.js'
import tetrominoes from '../src/tetrominoes.js'
const {expect} = chai

describe('Game class', () => {
  let game
  beforeEach(() => {
    game = new Game()
  })

  describe('Properties', () => {
    it('should have a board', () => {
      expect(game.board).to.be.an('array')
    })
    it('should begin with an empty set of pieces', () => {
      expect(game.pieces).to.be.an('array')
    })
  })

  describe('Methods', () => {

    describe('init()', () => {
      it('initialize values for `this.board`, `this.current`, and `this.next`', () => {
        const mockBoard = Array(20).fill(Array(10).fill(0))
        game.init()
        expect(game.board).to.deep.equal(mockBoard)
        expect(game.current).to.have.property('type')
        expect(game.next).to.have.property('type')
      })
    })

    describe('generateBoard()', () => {
      it('should generate a new 20 x 10 board', () => {
        const mockBoard = Array(20).fill(Array(10).fill(0))
        const board = game.generateBoard()
        expect(board).to.deep.equal(mockBoard)
      })
    })

    describe('generatePieces()', () => {
      it('should generate a set of 20 pieces', () => {
        game.generatePieces()
        expect(game.pieces.length).to.equal(28)
      })
    })

    describe('selectRandomPiece()', () => {
      it('should return a random piece from the `this.pieces`', () => {
        const piece = game.selectRandomPiece()
        expect(piece).to.have.a.property('type')
        expect(piece).to.have.a.property('blocks')
      })

      it('should remove the selected piece from `this.pieces` each time it is called', () => {
        game.selectRandomPiece()
        expect(game.pieces.length).to.equal(27)
        game.selectRandomPiece()
        expect(game.pieces.length).to.equal(26)
      })
    })

    describe('loopThruPiece', () => {
      const piece = tetrominoes[0]

      it('should call the callback fn 4 times', () => {
        const spy = sinon.spy()
        game.loopThruPiece(piece, 0, 0, 0, spy)
        expect(spy.getCalls().length).to.equal(4)
      })
      it('should not call the callback fn on empty spaces', () => {
        const spy = sinon.spy()
        const emptyPiece = {...piece, blocks: [0x0000]}
        game.loopThruPiece(emptyPiece, 0, 0, 0, spy)
        expect(spy.called).to.be.false
      })
    })

    describe('getCell()', () => {
      it('returns the value of the cell', () => {
        const board = game.generateBoard()
        board[0][0] = 1
        game.setBoard(board)
        expect(game.getCell(0,0)).to.equal(1)
      })
      it('returns -1 if the inputs are outside the bounds of the board', () => {
        const board = game.generateBoard()
        expect(game.getCell(board.length, 0)).to.equal(-1)
        expect(game.getCell(0, board[0].length)).to.equal(-1)
      })
    })

    describe('canMove()', () => {
      it('returns a boolean', () => {
        game.setBoard(game.generateBoard())
        game.setCurrent(game.selectRandomPiece())
        const canMoveDown = game.canMove(0, 1)
        expect(canMoveDown).to.be.true
      })

      it('returns false if the piece cannot move in any 3 direction', () => {
        game.setBoard(game.generateBoard())
        game.setCurrent(game.selectRandomPiece())
        game.currentY = 16
        const canMoveDown = game.canMove(0, 1)
        const canMoveLeft = game.canMove(-1, 0)
        expect(canMoveDown).to.be.false
        expect(canMoveLeft).to.be.false
        game.currentX = 8
        const canMoveRight = game.canMove(1, 0)
        expect(canMoveRight).to.be.false
      })
    })
  })
})
