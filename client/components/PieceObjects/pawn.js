export class pawn {
  constructor(colour) {
    this.moved = false
    this.colour = colour
  }
  getValidMoves(board, selected) {
    const piece = board[selected[0]][selected[2]]
    console.log(piece)
  }
  test() {
    console.log('wokrs test')
  }
}
