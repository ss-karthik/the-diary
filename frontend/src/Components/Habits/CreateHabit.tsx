import {useState} from 'react'
import type habitItem from '../../Types/HabitItem'
import { BACKEND_URL } from '../../Utils/constants';
import { postRequest } from '../../Utils/requests';

const CreateHabit = ({onCreate}: {onCreate: (habit: habitItem)=>void}) => {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [frequency, setFrequency] = useState("daily");
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
    <div>
        <input type='text' value={title} onChange={(e)=>{setTitle(e.target.value)}} />
        <input type='text' value={tags} onChange={(e)=>{setTags(e.target.value)}} />
        <button onClick={handleCreation}>Create!</button>
    </div>
  )
}

export default CreateHabit