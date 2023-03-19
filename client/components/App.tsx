
import RenderBoard from "./RenderBoard"

import { useState } from 'react'

const boardSize={
  x:8,
  y:8,
}
const props={
  boardSize:boardSize,
  board:Array(boardSize.x).fill(Array(boardSize.y).fill([]))
}



function App() {
  const [tate, setState] = useState(0)

  return (
    <div>
      <RenderBoard props={props}/>
    </div>
    
  )
}




export default App