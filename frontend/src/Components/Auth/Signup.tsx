import {useState} from 'react'
import { postRequest } from '../../Utils/requests';
import { BACKEND_URL } from '../../Utils/constants';

const Signup = () => {

  const[uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const handleSignUp = async ()=>{
    const data = await postRequest(`${BACKEND_URL}/signup`,{uname:uname, email:email, pwd:pwd});
    if(data.user){
      location.assign('/dashboard');
    }
  }

  return (
    <div>
     
        <input type='text' value={uname} onChange={(e)=>{setUname(e.target.value)}} />
        <input type='text' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        <input type='password' value={pwd} onChange={(e)=>{setPwd(e.target.value)}} />
        <button onClick={handleSignUp}>Sign Up!</button>
      
    </div>
  )
}

export default Signup