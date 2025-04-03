import { useReducer } from "react";

const initialTodos = [
  {
    id: 1,
    title: "Todo 1",
    complete: false,
  },
  {
    id: 2,
    title: "Todo 2",
    complete: false,
  },
];

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
  return (
    <>
     <form onSubmit={handleSubmit}>
       <input type="text" name="title" placeholder="Add Task"/>
       <button type="submit">Add</button>
     </form>
     {todos.map((item)=> (
      <div key={item.id}>
        <label>
          <input type="checkbox" checked={item.complete} onChange={()=> handleComplete(item)}/>
          {item.title}
        </label>
      </div>
    ))}
    </>
  )
}

export default App