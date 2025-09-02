import {useState, useEffect} from 'react'
import { postRequest } from '../../Utils/requests'
import { BACKEND_URL } from '../../Utils/constants'
import { useParams } from 'react-router-dom'
import HabitCalendar from './HabitCalendar'
import { Calendar1, ChevronRight, List } from 'lucide-react'
const HabitTrack = () => {
    const {habitId} = useParams();
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [logs, setLogs] = useState([]);
    const [streak, setStreak] = useState();
    const [runningStreak, setRunningStreak] = useState(0);
    const [calView, setCalView] = useState(true);

    const loadHabit = async()=>{
        if(habitId){
            const data = {
                habitid: parseInt(habitId)
            }
            const response = await postRequest(`${BACKEND_URL}/habits/getById`, data);
            setTitle(response.habitdata.title);
            setTags(response.habitdata.tags.join(' '));
            setLogs(response.habitdata.logs);
            setStreak(response.habitdata.streak);
            setRunningStreak(calcRunningStreak(response.habitdata.logs));
        }
    }

    const calcRunningStreak = (logs:string[])=>{
        let c = 1, i=1;
        while(i<logs.length && parseInt(logs[i].substring(8,10)) - parseInt(logs[i-1].substring(8,10)) <= 1){
        c++;
        i++;
        }
        return c;
    }
    
    useEffect(()=>{
        loadHabit();
    }, [habitId]);

  return (
    <div className='flex flex-col items-center justify-center gap-5'>
        <div className='flex flex-wrap gap-10 w-full justify-around'>
        <div className='flex flex-col items-center gap-5'>
            <h1 className='text-2xl'>{title}</h1>
            <div className='flex gap-2'>
            {tags.split(" ").filter((tag) => tag.trim()).map((tag, index) => (
                <span
                    key={index}
                    className="bg-gruvbox-light text-gruvbox-mid-d px-2 py-1 text-md rounded-md"
                >
                    {tag}
                </span>
            ))}
            </div>
            <div className='flex gap-5 items-center justify-center flex-wrap'>
                <div className='bg-gruvbox-yellow text-gruvbox-dark p-2 rounded-xl text-2xl'>Best Streak: {streak}</div>
                <div className='bg-gruvbox-aqua text-gruvbox-dark p-2 rounded-xl  text-2xl'>Running Streak: {runningStreak}</div>
            </div>
            <div className='flex gap-5 items-center justify-center flex-wrap'>
            </div>
        </div>
        <div className='flex flex-col items-center gap-5'>
            <div className='flex justify-center items-center gap-5'>
                <h1 className='text-2xl'>Logs of Completion</h1>
                <button className='cursor-pointer bg-gruvbox-light text-gruvbox-dark rounded-md p-1' onClick={()=>{setCalView(!calView)}}>
                    {calView ? <List/> : <Calendar1/>}
                </button>
            </div>
        {calView ? (
            <>
                <HabitCalendar logs={logs}/>
            </>
        ) : (
            <div className='max-w-md mx-auto p-6 bg-gruvbox-mid-l rounded-xl shadow-lg px-2'>
            {logs && logs.map(log=>{
                return(
                    <div key={log}>
                        <div className='flex gap-2'> 
                           <ChevronRight/> {log} 
                        </div>
                    </div>
                )
            })}
            </div>
        )}
        </div>
        </div>
    </div>
  )
}

export default HabitTrack