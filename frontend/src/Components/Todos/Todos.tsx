import {useEffect, useState} from 'react'
import CreateTodo from './CreateTodo'
import { postRequest } from '../../Utils/requests';
import { BACKEND_URL } from '../../Utils/constants';
import type todoItem from '../../Types/TodoItem';
import IndividualTodo from './IndividualTodo';

const Todos = () => {
  const [todos, setTodos] = useState<todoItem[]>([])

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
        <div>
        <h1 className='text-2xl'>Todos</h1>
          {todos.map(todo=>{
            return (
              <IndividualTodo key={todo.id} todo={todo} onDelete={handleDelete}/>
            );
          })}
        </div>
        <CreateTodo onCreate={handleCreate}/>
    </div>
    </div>
  )
}

export default Todos