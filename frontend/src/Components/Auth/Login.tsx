import {useState} from 'react'
import { postRequest } from '../../Utils/requests';
import { BACKEND_URL } from '../../Utils/constants';


const Login = () => { 
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const handleLogIn = async ()=>{
    const data = await postRequest(`${BACKEND_URL}/login`,{email:email, pwd:pwd});
    console.log(data);
    if(data.user){
      location.assign('/dashboard');
    }
  }

  return (
    <div>
      <input type='text' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        <input type='password' value={pwd} onChange={(e)=>{setPwd(e.target.value)}} />
        <button onClick={handleLogIn}>LogIn!</button>
    </div>
  )
}

export default Login