import { chessBoard } from "./chessboard"
import { useState } from 'react'
let b=new chessBoard()
b.setBoard()
// b.setBoard()
function RenderBoard({props}){

    const [state, setState] = useState(1)
    // let b=new chessBoard("ye")


    function handleClick(e){
        setState(state+1)
        const pos=e.split('.').map((i)=>{return Number(i)})
        
        // b.board[pos[0]][pos[1]]="heh"
        b.handleClick(e,pos)
    }


    
    return <div onClick={()=>{}}>
        here
        
        {b.board.map((i,idx)=>{

            return <div  key={`${idx}`}className="column">
                {b.board[idx].map((j,jdx)=>{

                let colour="dark"
                if((idx+jdx)%2==0){
                    colour="light"
                }
                const className=`square ${colour} `
                return <div  key={`${idx}.${jdx}`}style={{ display: "inline" ,
               
            }} 
                id={`${idx}.${jdx}`} className={className} 
                onClick={(e)=>{handleClick(e.target.id)}}>
                    {/* {`${idx}.${jdx}`} */}
                    <img src={j.sprite} alt="" style={{width:"100px", pointerEvents:"none"}}/>
                </div>})}
                </div>})}
    </div>       
}

export default RenderBoard