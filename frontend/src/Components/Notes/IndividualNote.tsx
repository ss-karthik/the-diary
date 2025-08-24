import {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BACKEND_URL } from '../../Utils/constants';
import { postRequest } from '../../Utils/requests';

const IndividualNote = () => {
  const {noteId} = useParams();
  
  const navigate = useNavigate();
  //const [note, setNote] = useState<noteItem>();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [content, setContent] = useState("");
  //const [lastSaved, setLastSaved] = useState(new Date().toString);
  const [isLoaded, setIsLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  

  useEffect(()=>{  
    const getNote = async()=>{
      if(noteId){
        const notedata = await postRequest(`${BACKEND_URL}/notes/getById`, 
          {noteid: parseInt(noteId)}
        );
        console.log(notedata);
        let note = notedata.notedata;
        setTitle(note.title);
        setTags(note.tags.join(" "));
        setTimestamp(note.timestamp);
        setContent(note.content);
        setIsLoaded(true);
      }
    }
    getNote();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    const timeoutId = setTimeout(() => {
        
        handleUpdation();
        
    }, 2000); 
    return () => clearTimeout(timeoutId);
  }, [title, tags, content, isLoaded]);
  
  const handleUpdation = async ()=>{
    setSaving(true);
    if(noteId){
      const tagarr = tags.split(' ');
      const data = {
          title: title,
          tags: tagarr,
          content: content,
          noteid: parseInt(noteId),
      }
      const response = await postRequest(`${BACKEND_URL}/notes/update`, data);
      console.log(response);
      setSaving(false);
    }
  }
  
  const handleDeletion = async ()=>{
    if(noteId){
      const data = {
        noteid: parseInt(noteId),
      }
      const response = await postRequest(`${BACKEND_URL}/notes/delete`, data);
      console.log(response);
    }
    navigate('/notes');
    
  }
  
  
  return (
    <div className='flex flex-col items-center gap-5'>
      {saving && <h4>Saving...</h4>}
      <div className='flex flex-wrap gap-10 w-full justify-around'>
        <div className='flex flex-col max-w-80 gap-5'>
          <div className='flex flex-col gap-2'>
            <h1>Title: </h1>
            <input className='lg:w-100 border border-gruvbox-mid-l rounded-sm p-3 resize-y font-mono text-2xl leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' type='text' value={title} onChange={(e)=>{setTitle(e.target.value)}}></input>
          </div>
          <div className='flex justify-between'>
            <h1>Created On: </h1>
            <h1>{timestamp.substring(0,10)}</h1>
          </div>
          <div className='flex flex-col gap-2'>
            <h1>Tags: </h1>
            <input className='lg:w-100 border border-gruvbox-mid-l rounded-sm p-3 resize-y font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' type='text' value={tags} onChange={(e)=>{setTags(e.target.value)}}></input>
          </div>
          <button className='text-xl lg:w-100 rounded-sm bg-gruvbox-red text-gruvbox-mid-d cursor-pointer px-2 py-1' onClick={handleDeletion}>Delete</button>
        </div>
        <div>
          <div className='flex flex-col gap-2'>
            <h1>Notes: </h1>
            <textarea className='md:w-100 w-84 h-120 border border-gruvbox-mid-l rounded-sm p-3 resize-y font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' value={content} onChange={(e)=>{setContent(e.target.value)}}></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndividualNote