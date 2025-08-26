import {useState, useEffect} from 'react';
import { postRequest } from '../../Utils/requests';
import { BACKEND_URL } from '../../Utils/constants';
import type habitItem from '../../Types/HabitItem';
import CreateHabit from './CreateHabit';
import IndividualHabit from './IndividualHabit';

const AllHabits = () => {
    const [habits, setHabits] = useState<habitItem[]>([]);
    
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
            <div>
                <h1 className='text-2xl'>Habits</h1>
                {habits.map(habit=>{
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