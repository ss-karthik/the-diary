import {useState} from 'react'
import type habitItem from '../../Types/HabitItem'
import { BACKEND_URL } from '../../Utils/constants';
import { postRequest } from '../../Utils/requests';

const CreateHabit = ({onCreate}: {onCreate: (habit: habitItem)=>void}) => {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [frequency] = useState("daily");
    // other frequency options available later
    //default streak on creation = 0;

    const handleCreation = async ()=>{
        const tagarr = tags.split(' ');
        const data = {
            title: title,
            tags: tagarr,
            frequency: frequency,
            streak: 0,
        }
        const response = await postRequest(`${BACKEND_URL}/habits/create`, data);
        console.log(response);
        onCreate(response.habit);
    }

  return (
    <div className='flex flex-col gap-5'>
        <h1 className='text-2xl'>Create Habit</h1>
        <div className='grid grid-flow-row grid-cols-2 gap-5'>
        <p>Title:</p>
        <input className='border border-gruvbox-light rounded-sm px-3 font-mono focus:outline-none focus:ring-2 focus:ring-gruvbox-purple focus:border-transparent' type='text' value={title} onChange={(e)=>{setTitle(e.target.value)}} />
        <p>Tags:</p>
        <input className='border border-gruvbox-light rounded-sm px-3 font-mono focus:outline-none focus:ring-2 focus:ring-gruvbox-purple focus:border-transparent' type='text' value={tags} onChange={(e)=>{setTags(e.target.value)}} />
        </div>
        <button className='text-xl rounded-sm bg-gruvbox-yellow text-gruvbox-mid-d cursor-pointer px-2 py-1' onClick={handleCreation}>Create!</button>
    </div>
  )
}

export default CreateHabit