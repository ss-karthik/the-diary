import {useState, useEffect} from 'react'
import type habitItem from '../../Types/HabitItem'
import type habitLog from '../../Types/HabitLog'
import { postRequest } from '../../Utils/requests'
import { BACKEND_URL } from '../../Utils/constants'
import { Link } from 'react-router-dom';



const IndividualHabit = ({habit, onDelete}: {habit:habitItem, onDelete:(id:number)=>void}) => {

  const [title, setTitle] = useState(habit.title);
  const [tags, setTags] = useState(habit.tags.join(' '));
  const [completed, setCompleted] = useState(false);
  const [notes, setNotes] = useState("");
  const [createdOn, setCreatedOn] = useState("");
  const [log, setLog] = useState<habitLog>();
  const [saving, setSaving] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(()=>{
    loadLog();
  }, []);

  const loadLog = async ()=>{
    setIsLoaded(false);
    const data = {
      habitid: habit.id,
    }
    const log = await postRequest(`${BACKEND_URL}/habits/getTodaysLog`, data);
    let logdata = log.logdata;
    setLog(logdata);
    setCompleted(logdata.completed);
    setNotes(logdata.notes);
    setCreatedOn(logdata.dateCreated);
    setIsLoaded(true);
  }

  useEffect(() => {
    if (!isLoaded) return;
    const timeoutId = setTimeout(() => {
        handleLogUpdation();
    }, 2000); 
    return () => clearTimeout(timeoutId);
  }, [notes, completed]);

  const handleLogUpdation = async ()=>{
    setSaving(true);
    const data = {
      habitid: habit.id,
      notes: notes,
      completed: completed,
    }
    const resp = await postRequest(`${BACKEND_URL}/habits/log`, data);
    console.log(resp);
    setSaving(false);
  }

  const handleHabitDeletion = async()=>{
    const data = {
      habitid: habit.id,
    }
    const resp = await postRequest(`${BACKEND_URL}/habits/delete`, data);
    onDelete(habit.id);
  }

  return (
    <div>
      {saving && <h4>Saving...</h4>}
      <h3>{title}</h3>
      <span>{tags} -- 
        {completed ? (<span>Completed</span>) : (<span>Not Completed</span>)} 
        -- {notes} -- {createdOn}
      </span>
      <input type='text' value={notes} onChange={(e)=>{setNotes(e.target.value)}} />
      <input type='checkbox' checked={completed} onChange={(e)=>{setCompleted(e.target.checked)}}/>
      <Link to={`/habits/${habit.id}`}><button>Track Habit</button></Link>
      <span>  </span>
      <button onClick={handleHabitDeletion}>Delete Habit</button>
    </div>
  )
}

export default IndividualHabit