import {useState, useEffect} from 'react'
import { postRequest } from '../../Utils/requests'
import { BACKEND_URL } from '../../Utils/constants'
import type habitItem from "../../Types/HabitItem"
import { useParams } from 'react-router-dom'

const HabitTrack = () => {
    const {habitId} = useParams();
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [logs, setLogs] = useState([]);
    const [habit, setHabit] = useState<habitItem>();

    

    const calcStreak = async () => {
        //implemment later
    }

    const loadHabit = async()=>{
        if(habitId){
            const data = {
                habitid: parseInt(habitId)
            }
            const response = await postRequest(`${BACKEND_URL}/habits/getById`, data);
            setHabit(response.habitdata);
            setTitle(response.habitdata.title);
            setTags(response.habitdata.tags.join(' '));
            setLogs(response.habitdata.logs);
        }
    }
    
    useEffect(()=>{
        loadHabit();
    }, [habitId]);

  return (
    <div className='flex flex-col items-center justify-center gap-5'>
        <h1 className='text-2xl'>{title}</h1>
        <div className='flex gap-2'>
        {tags.split(" ").filter((tag) => tag.trim()).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gruvbox-light text-gruvbox-mid-d px-2 py-1 text-xs rounded-md"
                    >
                      {tag}
                    </span>
        ))}
        </div>
        <h1 className='text-2xl'>Logs of Completion</h1>
        {logs && logs.map(log=>{
            return(
                <div key={log}>
                    <span> 
                        {log} 
                    </span>
                </div>
            )
        })

        }
    </div>
  )
}

export default HabitTrack