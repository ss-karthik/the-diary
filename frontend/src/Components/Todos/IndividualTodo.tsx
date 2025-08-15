import {useState} from 'react'
import { postRequest } from '../../Utils/requests';
import type todoItem from '../../Types/TodoItem';
import { BACKEND_URL } from '../../Utils/constants';

const IndividualTodo = ({todo, onDelete}: {todo: todoItem, onDelete: (id:number)=>void}) => {
    const [title, setTitle] = useState(todo.title);
    const [tags, setTags] = useState(todo.tags.join(' '));
    const [priority, setPriority] = useState(todo.priority);
    const [dueDate, setDueDate] = useState(todo.due);
    const [notes, setNotes] = useState(todo.notes);
    const [completed, setCompleted] = useState(todo.completed);
    const [isEditable, setIsEditable] = useState(false);
    
    const handleDeletion = async ()=>{
      const data = {
        todoid: todo.id,
      }
      const resp = await postRequest(`${BACKEND_URL}/todos/delete`, data);
      console.log(resp);
      onDelete(todo.id);
    }

    const handleEdit = async ()=>{
      const tagarr = tags.split(' ');

      const data = {
        title: title,
        tags: tagarr,
        priority: priority,
        due: new Date(dueDate),
        notes: notes,
        completed: completed,
        todoid: todo.id,
      }
      const resp = await postRequest(`${BACKEND_URL}/todos/update`, data);
      console.log(resp);
      setIsEditable(false);
    }

    const handleCompletion = async(e: React.ChangeEvent<HTMLInputElement>)=>{
      const tagarr = tags.split(' ');
      const newVal = e.target.checked;
      setCompleted(newVal);
      const data = {
        title: title,
        tags: tagarr,
        priority: priority,
        due: new Date(dueDate),
        notes: notes,
        completed: newVal,
        todoid: todo.id,
      }
      const resp = await postRequest(`${BACKEND_URL}/todos/update`, data);
      console.log(resp);
    }

  return (
    <div>
      <hr/>
      {isEditable ? (
        <div>
            <input type='text' value={title} onChange={(e)=>{setTitle(e.target.value)}} />
            <input type='number' value={priority} onChange={(e)=>{setPriority(parseInt(e.target.value))}} />
            <input type='text' value={tags} onChange={(e)=>{setTags(e.target.value)}} />
            <input type='date' value={dueDate} onChange={(e)=>{setDueDate(e.target.value)}}/>
            <input type='text' value={notes} onChange={(e)=>{setNotes(e.target.value)}} />
            <button onClick={handleEdit}>Done</button>
        </div>
      ) : (
        <div>
          <p>Title: {title}</p>
          <p>Tags: {tags} -- Priority: {priority}</p>
          <p>Due: {dueDate}</p>
          {completed &&   
            <p>Completed</p>
          }
          <p>Notes: {notes}</p>
          <button onClick={()=>{setIsEditable(true)}}>Edit</button>
        </div>
      )}
      <input type='checkbox' checked={completed} onChange={handleCompletion}/> 
      <button onClick={handleDeletion}>Delete</button>
      <hr/>
    </div>
  )
}

export default IndividualTodo