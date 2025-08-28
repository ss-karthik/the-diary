import {useState, useEffect} from 'react';
import { postRequest } from '../../Utils/requests';
import { BACKEND_URL } from '../../Utils/constants';
import type noteItem from '../../Types/NoteItem';
import CreateNote from './CreateNote';
import { Link } from 'react-router-dom';

const AllNotes = () => {    
    const [notes, setNotes] = useState<noteItem[]>([]);
    const [filter, setFilter] = useState("");

    useEffect(()=>{
        const fetchAllNotes = async ()=>{
        const notedata = await postRequest(`${BACKEND_URL}/notes/getAll`, {});
        setNotes(notedata.notedata);
        }
        fetchAllNotes();
    }, []);

    const handleCreate = (note: noteItem)=>{
        setNotes(prevNotes=>[...prevNotes, note]);
    }

    return (
        <div className='flex flex-col items-center gap-5'>
            <h1 className='text-4xl'>Notes</h1>
            <CreateNote onCreate={handleCreate}/>
            <hr className='h-1 w-screen border-gruvbox-light'/>
            <input placeholder='Filter by Tags' value={filter} onChange={(e)=>{setFilter(e.target.value)}} className='lg:w-100 border border-gruvbox-mid-l rounded-sm p-1 resize-y font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' type='text'></input>
            <div className='flex flex-wrap max-w-80 gap-10'>
            {notes
                .filter(note=>{
                    if (!filter) return true;
                    let filtertags = filter.split(' ');
                    return filtertags.some(tag => note.tags.includes(tag));
                })
                .map(note=>{
                    return(
                        <Link to={`/notes/${note.id}`}>
                            <button className='text-xl rounded-sm bg-gruvbox-green text-gruvbox-mid-d cursor-pointer px-2 py-1' key={note.id}>{note.title}</button>
                        </Link>
                    );
                })}
            </div>
            <hr/>
        </div>
    )
}

export default AllNotes