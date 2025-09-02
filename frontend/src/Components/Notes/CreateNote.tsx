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
        <div className='flex flex-col gap-5'>
            <h1 className='text-2xl'>Create Note</h1>
            <div className='grid grid-flow-row grid-cols-2 gap-5'>
                <p>Title:</p>
                <input className='border border-gruvbox-light rounded-sm px-3 font-mono focus:outline-none focus:ring-2 focus:ring-gruvbox-purple focus:border-transparent' type='text' value={title} onChange={(e)=>{setTitle(e.target.value)}} />
                <p>Tags:</p>
                <input className='border border-gruvbox-light rounded-sm px-3 font-mono focus:outline-none focus:ring-2 focus:ring-gruvbox-purple focus:border-transparent' type='text' value={tags} onChange={(e)=>{setTags(e.target.value)}} />
                <p>Content:</p>
                <input className='border border-gruvbox-light rounded-sm px-3 font-mono focus:outline-none focus:ring-2 focus:ring-gruvbox-purple focus:border-transparent' type='text' value={content} onChange={(e)=>{setContent(e.target.value)}} />
            </div>
            <button className='text-xl rounded-sm bg-gruvbox-yellow text-gruvbox-mid-d cursor-pointer px-2 py-1' onClick={handleCreation}>Create!</button>
        </div>
    )
}

export default CreateNote