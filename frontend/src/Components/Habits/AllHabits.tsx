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
    
  return (
    <div>
        Habits
        <hr/>
        {habits.map(habit=>{
            return (
                <IndividualHabit habit={habit}/>
            );
        })}
        <hr/>
        <CreateHabit onCreate={handleCreate}/>
    </div>
  )
}

export default AllHabits