import {useState, useEffect} from 'react';
import { postRequest } from '../../Utils/requests';
import { BACKEND_URL } from '../../Utils/constants';
import type habitItem from '../../Types/HabitItem';
import CreateHabit from './CreateHabit';
import IndividualHabit from './IndividualHabit';

const AllHabits = () => {
    const [habits, setHabits] = useState<habitItem[]>([]);
    const [filter, setFilter] = useState("");
    useEffect(()=>{
        const fetchAllHabits = async()=>{
            const habitdata = await postRequest(`${BACKEND_URL}/habits/getAll`, {});
            setHabits(habitdata.habitdata);
        }
        fetchAllHabits();
    }, []);

    const handleCreate = (habit: habitItem)=>{
        setHabits(prevHabits=>[...prevHabits, habit]);
    }

    const handleDelete = (deletedId: number)=>{
        setHabits(prevHabits=>prevHabits.filter(habit=>habit.id!==deletedId));
    }
    
  return (
    <div className='flex flex-col items-center gap-5'>
        <div className='flex flex-wrap gap-10 w-full justify-around'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl'>Habits</h1>
                <input placeholder='Filter by Tags' value={filter} onChange={(e)=>{setFilter(e.target.value)}} className='lg:w-100 border border-gruvbox-mid-l rounded-sm p-1 resize-y font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' type='text'></input>
                {habits
                    .filter(habit=>{
                        if(!filter) return true;
                        let filterarr = filter.split(' ');
                        return filterarr.some(tag=>habit.tags.includes(tag));
                    })
                    .map(habit=>{
                        return (
                            <IndividualHabit habit={habit} onDelete={handleDelete}/>
                        );
                    })}
            </div>
            <CreateHabit onCreate={handleCreate}/>
        </div>
    </div>
  )
}

export default AllHabits