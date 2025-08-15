import {useState, useEffect} from 'react'
import { postRequest } from '../../Utils/requests'
import { BACKEND_URL } from '../../Utils/constants'
import type habitItem from "../../Types/HabitItem"
import type habitLog from "../../Types/HabitLog"
import { useParams } from 'react-router-dom'

const HabitTrack = () => {
    const {habitId} = useParams();
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [logs, setLogs] = useState<habitLog[]>([]);
    const [habit, setHabit] = useState<habitItem>();

    const loadLogs = async (id:number)=>{
    
            const data = {
                habitid: id,
            };
            const response = await postRequest(`${BACKEND_URL}/habits/getLogs`, data);
            setLogs(response.logdata);
        
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
            await loadLogs(response.habitdata.id);
        }
    }
    
    useEffect(()=>{
        loadHabit();
    }, [habitId]);

  return (
    <div>
        <h1>Tracking Habit: {title}</h1>
        <p>Tags: {tags}</p>

        {logs && logs.map(log=>{
            return(
                <div key={log.id}>
                    <span>{log.completed ? (<>Completed</>) : (<>Not Completed</>)}</span>
                    <span> 
                        -- {log.dateCreated} 
                        --  {log.notes}
                    </span>
                </div>
            )
        })

        }

    </div>
  )
}

export default HabitTrack