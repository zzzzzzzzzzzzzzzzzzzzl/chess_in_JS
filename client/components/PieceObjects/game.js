let arr = [
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

export class game {
  constructor() {
    let square
    this.turn = 'w'
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
        } else {
          sharp = null
        }

        this.board[i].push({ square: `${i}.${j}`, piece: sharp })
      })
    })
  }
  onClick(square) {
    const div = document.getElementById(`${square}`)
    const x = square[0]
    const y = square[2]

    //deselect selected square.
    //select clicked on square
    //if piece is clicked on without another piece selected
    if (!this.selected && this.board[x][y].piece) {
      console.log(this.board[x][y].piece)
      console.log(this.board[x][y].piece[0] === this.turn)
      if (this.board[x][y].piece[0] === this.turn) {
        this.selected = square
        this.highlightSelectedSquare(div)
        console.log('here')
      }
    }
    // this is confirm move// so if piece is selected and the move is "valid"
    //we can then move the div to the new parent
    if (this.selected) {
      this.swapDivs(this.getDiv(square), this.getDiv(this.selected))
      // this.selected = null
    }
  }
  swapDivs(a, b) {
    a.appendChild(b.firstElementChild)
  }
  highlightSelectedSquare(div) {
    const elements = Array.from(document.getElementsByClassName('selected'))
    elements.map((i) => {
      i.classList.remove('selected')
    })
    div.classList.add('selected')
  }
  getDiv(square) {
    return document.getElementById(`${square}`)
  }
}
