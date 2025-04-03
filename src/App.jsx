import React, { useEffect, useReducer } from "react";

const initialTodos = JSON.parse(localStorage.getItem("todos")) || [];

const reducer = (state, action) => {
  switch(action.type){
    case "ADD":
      return  [...state, {id:state.length + 1, title:action.title, complete:false}];

    case "DONE":
      return state.map((item)=> {
        if(item.id === action.id){
          return {...item, complete: !item.complete}
        }else{
          return item
        }
    })
      default:
    return state
  }
}
const App = () => {
 const [todos, dispatch] = useReducer(reducer, initialTodos)

 const handleComplete = (todo)=> {
    dispatch({type:"DONE", id:todo.id})
 }
 const handleSubmit = (e) => {
  e.preventDefault()
  const title = e.target.title.value;
  if(title.trim()){
    dispatch({type:"ADD", title})
  }
  e.target.reset()
 }
  useEffect(()=> {
     localStorage.setItem("todos", JSON.stringify(todos))
  })
  return (
    <div className="flex flex-col items-center justify-center pt-10">
     <form onSubmit={handleSubmit}>
       <input className="border-2 border-blue-600 py-1 px-5 rounded-[2px] text-[16px]" type="text" name="title" placeholder="Add Task"/>
       <button className="border-2 border-green-600 bg-green-600 text-white py-1 px-5 rounded-[2px]" type="submit">Add</button>
     </form>
     {todos.map((item)=> (
      <div key={item.id}>
        <label>
          <input type="checkbox" checked={item.complete} onChange={()=> handleComplete(item)}/>
          {item.title}
        </label>
      </div>
     ))}
    </div>
  )
}

export default App