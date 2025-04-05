import React, { useEffect, useReducer } from "react";

const initialTodos = JSON.parse(localStorage.getItem("todos")) || [];

const reducer = (state, action) => {
  switch(action.type){
    case "ADD":
      return  [...state, {id:state.length + 1, title:action.title, complete:false}];

      case "EDIT":
        return state.map((item)=> {
          if(item.id === action.payload){
            return {...item, title:action.title}
          }

          return item
        })
    case "DELETE":
      return state.filter(item => item.id !== action.payload);

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

  const handleDelete = (id) => {
     dispatch({type:"DELETE", payload:id})
  }

  const handleEdit = (id) => {
    const title  = prompt("Edit the task title")
    if(title.trim()){
       dispatch({type:"EDIT",  payload: id, title})
    }
  }
  return (
    <div className="flex flex-col items-center justify-center pt-10">
     <form onSubmit={handleSubmit} className="w-[500px] flex justify-center mx-auto">
       <input required className="border-2 w-full outline-none border-blue-600 py-1 px-5 rounded-[2px] text-[16px]" type="text" name="title" placeholder="Add Task"/>
       <button className="border-2 border-green-600 bg-green-600 text-white py-1 px-5 rounded-[2px]" type="submit">Add</button>
     </form>
     <div className="flex flex-col gap-2 mt-5">
     {todos.map((item, index)=> (
      <div key={item.id} className={`${item.complete === true ? "bg-green-600" : " bg-slate-600 "} py-2 w-[500px] px-3 flex justify-between items-center`}>
        <label className="flex gap-2 text-xl">
          <input   type="checkbox"  checked={item.complete}  className={item.complete && "disabled"} onChange={()=> handleComplete(item)}/>
         {index + 1} <strong className="line-clamp-1 w-[200px]">{item.title}</strong>
        </label>
        <div className="flex gap-2">
          <button  onClick={()=> handleEdit(item.id)} disabled={item.complete}  className={`bg-blue-600 py-2 px-3`}>Edit</button>
          <button  onClick={()=> handleDelete(item.id)} className="bg-red-600 py-2 px-3">Delete</button>
        </div>
      </div>
     ))}
     </div>
    </div>
  )
}

export default App