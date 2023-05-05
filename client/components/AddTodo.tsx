import { useAppDispatch, useAppSelector } from '../hooks'
import React, { useState } from 'react';
import { appendToDo } from '../slices/todo';


function AddTodo() {
  const activePage=useAppSelector((state)=>state.todos)
  const dispatch=useAppDispatch()

  
  const [input,setInput]=useState('')

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {//add to list
    event.preventDefault(); 
    if(input!==''){
      const data=  {task:input,done:false}
      dispatch(appendToDo(data))
      setInput('');
    }
  };
  return (
    
    <form action=""
    onSubmit={handleSubmit}
    >

      <input
        type=''
        className="new-todo"
        placeholder="finish todo james"
        autoFocus={true}
        value={input}
        onChange={handleChange}

      />
    </form>


  )
}

export default AddTodo
