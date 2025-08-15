import {useState} from 'react'
import { postRequest } from '../../Utils/requests';
import { BACKEND_URL } from '../../Utils/constants';
import type noteItem from '../../Types/NoteItem';

const CreateNote = ({onCreate}: {onCreate: (todo: noteItem)=>void}) => {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [content, setContent] = useState("");

    const handleCreation = async ()=>{
        const tagarr = tags.split(' ');
        const data = {
            title: title,
            tags: tagarr,
            timestamp: new Date(),
            content: content,
        }
        const response = await postRequest(`${BACKEND_URL}/notes/create`, data);
        console.log(response);
        onCreate(response.note);
    }

    return (
        <div>
            Create Note
            <div>
                <input type='text' value={title} onChange={(e)=>{setTitle(e.target.value)}} />
                <input type='text' value={tags} onChange={(e)=>{setTags(e.target.value)}} />
                <input type='text' value={content} onChange={(e)=>{setContent(e.target.value)}} />
                <button onClick={handleCreation}>Create!</button>
            </div>
        </div>
    )
}

export default CreateNote