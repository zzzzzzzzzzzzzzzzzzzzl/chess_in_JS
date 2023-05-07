let arr=[
    [[0,0],'wrook'],
      ...new Array(8).fill(0).map((_, idx) => { 
      return  [[idx,1],'wpawn']
    })
    ,
      ...new Array(8).fill(0).map((_, idx) => { 
      return  [[idx,6],'bpawn']
    })
    ,
    [[1,0],'wknight'],
    [[2,0],'wbishop'],
    [[3,0],'wking'],
    [[4,0],'wqueen'],
    [[5,0],'wbishop'],
    [[6,0],'wknight'],
    [[7,0],'wrook'],
    [[0,7],'brook'],
    [[1,7],'bknight'],
    [[2,7],'bbishop'],
    [[3,7],'bqueen'],
    [[4,7],'bking'],
    [[5,7],'bbishop'],
    [[6,7],'bknight'],
    [[7,7],'brook'],
  ]


export class game{
    constructor(){
        let square
        this.board=[]
          new Array(8).fill().map((_, i) => { 
           new Array(8).fill().map((_, j) => { 

            square=`${i}.${j}`
          this.board.push(`${i}.${j}`)
        })
        })
        console.log(this.board)
    }

}