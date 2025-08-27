import {useState, useEffect} from 'react'
import type habitItem from '../../Types/HabitItem'
import type habitLog from '../../Types/HabitLog'
import { postRequest } from '../../Utils/requests'
import { BACKEND_URL } from '../../Utils/constants'
import { Link } from 'react-router-dom';
import { Pencil } from 'lucide-react'



const IndividualHabit = ({habit, onDelete}: {habit:habitItem, onDelete:(id:number)=>void}) => {

  const [title, setTitle] = useState(habit.title);
  const [tags, setTags] = useState(habit.tags.join(' '));
  const [completed, setCompleted] = useState(false);
  const [notes, setNotes] = useState("");
  const [createdOn, setCreatedOn] = useState("");
  const [log, setLog] = useState<habitLog>();
  const [saving, setSaving] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editingTags, setEditingTags] = useState(false);


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

  useEffect(()=>{
    if (!isLoaded) return;
    const timeoutId = setTimeout(() => {
        handleUpdation();
    }, 2000); 
    return () => clearTimeout(timeoutId);
  }, [tags])
  

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

  const handleUpdation = async ()=>{
    setSaving(true);
    const tagarr = tags.split(' ');
    const data = {
      habitid: habit.id,
      title: habit.title,
      frequency: habit.frequency,
      tags: tagarr
    }
    const resp = await postRequest(`${BACKEND_URL}/habits/update`, data);
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
    <div className="bg-gruvbox-mid-l rounded-lg p-6 mb-4 shadow-sm">
      {saving && <h4>Saving...</h4>}
      <div className='flex flex-col gap-3'>
      <div className='flex justify-between items-center'>
        <h3 className='text-2xl'>{title}</h3>
        <input className='w-6 h-6' type='checkbox' checked={completed} onChange={(e)=>{setCompleted(e.target.checked)}}/>
      </div>
      {completed && (<span className='text-gruvbox-green'>Completed</span>)} 
      <div className='flex gap-2'>
        {editingTags ? (
            <input className='lg:w-100 border border-gruvbox-mid-l rounded-sm p-3 resize-y font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' type='text' value={tags} onChange={(e)=>{setTags(e.target.value)}}></input>
          ) : (
            <>
              {tags.split(" ").filter((tag) => tag.trim()).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gruvbox-light text-gruvbox-mid-d px-2 py-1 text-xs rounded-md"
                    >
                      {tag}
                    </span>
              ))}
            </>
          )}
          <Pencil className='cursor-pointer' onClick={()=>{setEditingTags(!editingTags)}}/>
      </div>
      
      <div className='flex gap-2 justify-center items-center'>
        <Link to={`/habits/${habit.id}`}><button className='text-xl rounded-sm bg-gruvbox-aqua text-gruvbox-mid-d cursor-pointer px-1 py-1'>Track Habit</button></Link>
        <button className='text-xl rounded-sm bg-gruvbox-aqua text-gruvbox-mid-d cursor-pointer px-1 py-1' onClick={handleHabitDeletion}>Delete Habit</button>
      </div>
      </div>
    </div>
  )
}

export default IndividualHabit