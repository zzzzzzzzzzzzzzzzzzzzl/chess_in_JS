import { bishop } from './bishop'
import { king } from './king'
import { knight } from './knight'
import { pawn } from './pawn'
import { queen } from './queen'
import { rook } from './rook'

const arr = [
  [[0, 0], 'wrook'],
  ...new Array(8).fill(0).map((_, idx) => {
    return [[idx, 1], 'wpawn']
  }),
  ...new Array(8).fill(0).map((_, idx) => {
    return [[idx, 6], 'bpawn']
  }),
  [[1, 0], 'wknight'],
  [[2, 0], 'wbishop'],
  [[3, 0], 'wking'],
  [[4, 0], 'wqueen'],
  [[5, 0], 'wbishop'],
  [[6, 0], 'wknight'],
  [[7, 0], 'wrook'],
  [[0, 7], 'brook'],
  [[1, 7], 'bknight'],
  [[2, 7], 'bbishop'],
  [[3, 7], 'bqueen'],
  [[4, 7], 'bking'],
  [[5, 7], 'bbishop'],
  [[6, 7], 'bknight'],
  [[7, 7], 'brook'],
]

const classMap = {
  pawn: pawn,
  rook: rook,
  knight: knight,
  bishop: bishop,
  queen: queen,
  king: king,
}
export class game {
  constructor() {
    let square
    let colour
    this.turn = true
    this.board = []
    new Array(8).fill().map((_, i) => {
      this.board.push([])
      new Array(8).fill().map((_, j) => {
        let sharp = arr.filter((k) => {
          if (JSON.stringify(k[0]) === JSON.stringify([j, i])) {
            return true
          }
        })
        if (sharp[0]) {
          sharp = sharp[0][1]
          colour = sharp[0] === 'w'
          const className = sharp.substring(1)
          sharp = new classMap[className](colour)
        } else {
          sharp = null
          colour = null
        }
        this.board[i].push({
          piece: sharp,
        })
      })
    })
  }
  onClick(square) {
    const div = this.getDiv(square)
    this.selectPiece(square, div)
    this.selectSquare(square)

    console.log(this.board)
  }
  selectSquare(square) {
    //why do pieces have to be selected twice after moving// things to trouble shoot.
    //print evbery single variable that we use and check what changes
    if (!this.board[square[0]][square[2]].piece && this.selected) {
      console.log('select square')
      console.log(this.board[this.selected[0]][this.selected[2]].piece)
      this.movePiece(square)
    }
  }
  movePiece(square) {
    this.board[square[0]][square[2]].piece =
      this.board[this.selected[0]][this.selected[2]].piece

    // this.board[this.selected[0]][this.selected[2]].piece = null
    this.removeSelectedClass()
    this.moveDiv(square)
    this.selected = null
  }
  selectPiece(square, div) {
    if (this.board[square[0]][square[2]].piece) {
      if (this.board[square[0]][square[2]].piece.colour === this.turn) {
        this.addSelectedClass(div)
        this.selected = square
      }
    }
  }
  getDiv(a) {
    return document.getElementById(a)
  }
  moveDiv(square) {
    console.log('here')
    let divA = this.getDiv(square)
    let divB = this.getDiv(this.selected)

    divA.appendChild(divB.firstElementChild)
  }
  addSelectedClass(div) {
    //deselect previous squares
    Array.from(document.querySelectorAll('div.selected')).map((i) => {
      i.classList.remove('selected')
    })
    //select new square
    div.classList.add('selected')
  }
  removeSelectedClass() {
    //deselect previous squares
    Array.from(document.querySelectorAll('div.selected')).map((i) => {
      i.classList.remove('selected')
    })
  }
}
