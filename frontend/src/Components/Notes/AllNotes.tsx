import {useState, useEffect} from 'react';
import { postRequest } from '../../Utils/requests';
import { BACKEND_URL } from '../../Utils/constants';
import type noteItem from '../../Types/NoteItem';
import CreateNote from './CreateNote';
import { Link } from 'react-router-dom';

const AllNotes = () => {    
    const [notes, setNotes] = useState<noteItem[]>([]);

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
        <div>
            Notes
            <hr/>
            {notes.map(note=>{
                return(
                    <Link to={`/notes/${note.id}`}>
                        <button key={note.id}>{note.title}</button>
                    </Link>
                );
            })}
            <hr/>
            <CreateNote onCreate={handleCreate}/>
        </div>
    )
}

export default AllNotes