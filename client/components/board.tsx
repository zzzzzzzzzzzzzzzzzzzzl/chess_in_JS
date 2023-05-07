import { useAppDispatch, useAppSelector } from '../hooks'
import React, { useState } from 'react';
import { appendToDo } from '../slices/todo';
import Piece from './piece';
import { game } from './PieceObjects/game'

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
const chess=new game()
function Board() {
  function handleClick(event) {
    chess.onClick(event.target.id)
    const idValue = event.target.id;
    console.log(idValue);
  }
  return (
    <React.Fragment>
      {new Array(8).fill().map((_, i) => { 
        return (
          <div className='column' key={i}>
            {new Array(8).fill().map((_, j) => {
              const sharp=arr.filter((k)=>{
                if(JSON.stringify(k[0]) === JSON.stringify([j,i])){
                  return true
                }
              })
              let pieceId=`${i}.${j}`
              let piece
              if(sharp[0]){
                piece=sharp[0][1]
              }
              let squareColour='dark'
              if((i+j)%2==0){
                squareColour='light'
              }
              return (
                <div id={pieceId} className={`${squareColour} square`} onClick={handleClick} key={`${i}.${j}`}>
                  <div style={{ pointerEvents: 'none' }}>
                    {piece &&
                      <div id ={piece} >
                        <img src={`./sprite/${piece}.png`} alt="" />
                      </div>
                      }
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </React.Fragment>
  )
}


export default Board;
