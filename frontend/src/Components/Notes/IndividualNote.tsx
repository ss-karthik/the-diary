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
    <div>
      {noteId}
      {saving && <h4>Saving...</h4>}
      
      <>
        <input type='text' value={title} onChange={(e)=>{setTitle(e.target.value)}}></input>
      <h1>
        <input type='text' value={tags} onChange={(e)=>{setTags(e.target.value)}}></input>
      </h1>
      <h1>{timestamp}</h1>
      <h1>
        <input type='text' value={content} onChange={(e)=>{setContent(e.target.value)}}></input>
      </h1>
      </>
      <button onClick={handleDeletion}>Delete</button>
    </div>
  )
}

export default IndividualNote