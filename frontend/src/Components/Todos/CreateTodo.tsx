import {useState} from 'react'
import { postRequest } from '../../Utils/requests';
import { BACKEND_URL } from '../../Utils/constants';
import type todoItem from '../../Types/TodoItem';

const CreateTodo = ({onCreate}: {onCreate: (todo: todoItem)=>void}) => {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [priority, setPriority] = useState(0);
    const [dueDate, setDueDate] = useState("");
    const [notes, setNotes] = useState("");
    
    const handleCreation = async ()=>{
        const tagarr = tags.split(' ');
        const data = {
            title: title,
            tags: tagarr,
            priority: priority,
            due: new Date(dueDate),
            notes: notes,
        }
        const response = await postRequest(`${BACKEND_URL}/todos/create`, data);
        console.log(response);
        onCreate(response.todo);
    }
  return (
    <div>
        CreateTodo
        <div>
            <input type='text' value={title} onChange={(e)=>{setTitle(e.target.value)}} />
            <input type='number' value={priority} onChange={(e)=>{setPriority(parseInt(e.target.value))}} />
            <input type='text' value={tags} onChange={(e)=>{setTags(e.target.value)}} />
            <input type='date' value={dueDate} onChange={(e)=>{setDueDate(e.target.value)}}/>
            <input type='text' value={notes} onChange={(e)=>{setNotes(e.target.value)}} />
            <button onClick={handleCreation}>Create!</button>
        </div>
    </div>
  )
}

export default CreateTodo