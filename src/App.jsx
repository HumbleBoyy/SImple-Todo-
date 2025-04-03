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
  return (
    <>
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