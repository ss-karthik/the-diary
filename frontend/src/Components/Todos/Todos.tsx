import {useEffect, useState} from 'react'
import CreateTodo from './CreateTodo'
import { postRequest } from '../../Utils/requests';
import { BACKEND_URL } from '../../Utils/constants';
import type todoItem from '../../Types/TodoItem';
import IndividualTodo from './IndividualTodo';

const Todos = () => {
  const [todos, setTodos] = useState<todoItem[]>([])
  const [showCompleted, setShowCompleted] = useState(false);
  const [filter, setFilter] = useState("");
  useEffect(()=>{
    const fetchAllTodos = async ()=>{
      const tododata = await postRequest(`${BACKEND_URL}/todos/getAll`, {});
      setTodos(tododata.tododata);
    }
    fetchAllTodos();
  }, []);

  const handleDelete = (deletedId:number)=>{
    setTodos(prevTodos=>prevTodos.filter(todo=> todo.id !== deletedId));
  } 
  const handleCreate = (todo:todoItem)=>{
    setTodos(prevTodos=>[...prevTodos, todo]);
  }

  return (
    <div className='flex flex-col items-center gap-5'>
      <div className='flex flex-wrap gap-10 w-full justify-around'>
        <div className='flex flex-col gap-3'>
        <h1 className='text-2xl'>Todos</h1>
        <input placeholder='Filter by Tags' value={filter} onChange={(e)=>{setFilter(e.target.value)}} className='lg:w-100 border border-gruvbox-mid-l rounded-sm p-1 resize-y font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' type='text'></input>
        <button onClick={()=>{setShowCompleted(!showCompleted)}} className="bg-gruvbox-blue px-3 py-1 text-gruvbox-mid-d rounded-md cursor-pointer focus:outline-none focus:ring-2  text-sm">{showCompleted ? <>Hide Completed</> : <>Show Completed</>}</button>
          {todos
            .filter(todo=>{
              if (!filter) return true;
              let filtertags = filter.split(' ');
              return filtertags.some(tag => todo.tags.includes(tag));
            })
            .map(todo=>{
            if(todo.completed){
              if(showCompleted){
                return (
                  <IndividualTodo key={todo.id} todo={todo} onDelete={handleDelete}/>
                );
              } else {
                return (<></>);
              }
            }else {
              return (
                <IndividualTodo key={todo.id} todo={todo} onDelete={handleDelete}/>
              );
            }
          })}
        </div>
        <CreateTodo onCreate={handleCreate}/>
    </div>
    </div>
  )
}

export default Todos