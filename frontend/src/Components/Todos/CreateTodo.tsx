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
    <div className='flex flex-col gap-5 pb-10 px-3'>
        <h1 className='text-2xl'>CreateTodo</h1>
        <div className='grid grid-flow-row grid-cols-2 gap-5'>
            <p>Title: </p>
            <input type='text' className='border border-gruvbox-light rounded-sm px-3 font-mono focus:outline-none focus:ring-2 focus:ring-gruvbox-purple focus:border-transparent' value={title} onChange={(e)=>{setTitle(e.target.value)}} />
            <p>Priority: </p>
            <input type='number' className='border border-gruvbox-light rounded-sm px-3 font-mono focus:outline-none focus:ring-2 focus:ring-gruvbox-purple focus:border-transparent' value={priority} onChange={(e)=>{setPriority(parseInt(e.target.value))}} />
            <p>Tags: </p>
            <input type='text' className='border border-gruvbox-light rounded-sm px-3 font-mono focus:outline-none focus:ring-2 focus:ring-gruvbox-purple focus:border-transparent' value={tags} onChange={(e)=>{setTags(e.target.value)}} />
            <p>Due Date: </p>
            <input type='date' className='border border-gruvbox-light rounded-sm px-3 font-mono focus:outline-none focus:ring-2 focus:ring-gruvbox-purple focus:border-transparent' value={dueDate} onChange={(e)=>{setDueDate(e.target.value)}}/>
            <p>Notes: </p>
            <input type='text' className='border border-gruvbox-light rounded-sm px-3 font-mono focus:outline-none focus:ring-2 focus:ring-gruvbox-purple focus:border-transparent' value={notes} onChange={(e)=>{setNotes(e.target.value)}} />
        </div>
        <button className='text-xl rounded-sm bg-gruvbox-yellow text-gruvbox-mid-d cursor-pointer px-2 py-1' onClick={handleCreation}>Create!</button>
    </div>
  )
}

export default CreateTodo