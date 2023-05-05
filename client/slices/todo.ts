// WARNING: this file is only a guide! not to be used as part of the challenge!
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import UpdateTodoComponent from '../components/UpdateTodoComponent'


const initialState: string[] = []

// {task:input,done:false}
const sampleData=[

]

// where our business logic goes
export const todoSlice = createSlice({
  name: 'todos',
  initialState:sampleData,

  reducers: {
    appendToDo: (state, action) => {
      
      return [...state, action.payload]
    },
    deleteToDo: (state, action) => {
      const newState=state.filter((i,idx)=>idx!==action.payload)
      return newState
    },
    updateToDo: (state, action) => {
      console.log('update')
      const newState=state.map((i,idx)=>{if(idx==action.payload){
        return 'update'
      }
      return i
    })
      return [...newState]
    },
    updateTodoComponent:(state,action)=>{
      
      const newState=state.map((i,idx)=>{
        if(idx==action.payload[1]){
         
          return {task:`${action.payload[0]}`,done:false}
        }
        return i
      })
      console.log(action.payload)
      return newState
    },
    updateDone: (state, action) => {
     console.log('help')
      const newState=state.map((i,idx)=>{if(idx==action.payload){
        console.log(action.payload)
        
        return {...i,done:!i.done}
      }
      return i
    })
      return newState
    }
  },
})

// a selector to be used as: const example = useSelector(exampleSelector)
export const todosSelector = (state: RootState) => state.example

// actions to be dispatched using dispatch(exampleAddToArray({ example: 'hi' }))
export const { appendToDo,deleteToDo,updateToDo,updateDone,updateTodoComponent } = todoSlice.actions

// the reducer to be used in store.js
export default todoSlice.reducer
