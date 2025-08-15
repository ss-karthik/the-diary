import {useState, useEffect} from 'react'
import type habitItem from '../../Types/HabitItem'
import type habitLog from '../../Types/HabitLog'

const IndividualHabit = ({habit}: {habit:habitItem}) => {
  const [title, setTitle] = useState(habit.title);
  const [tags, setTags] = useState(habit.tags.join(' '));
  const [completed, setCompleted] = useState(false);
  const [notes, setNotes] = useState(false);

  useEffect(()=>{

  }, [])

  return (
    <div>
      <span>{title}</span>
      <span>{tags}</span>

    </div>
  )
}

export default IndividualHabit