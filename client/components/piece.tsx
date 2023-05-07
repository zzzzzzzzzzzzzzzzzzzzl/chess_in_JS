import React, { useState } from 'react';


function Piece(props) {
  return (
    <div>
      {props.piece && 
      <img src={`./sprite/${props.piece}.png`} alt="" />
      }
    </div>
  )
}


export default Piece
