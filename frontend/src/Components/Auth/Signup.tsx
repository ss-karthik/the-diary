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
    <div className='flex flex-col items-center'>
      <div className='bg-gruvbox-mid-l flex flex-col items-center gap-5 p-5 rounded-lg'>
        <h1 className='text-2xl'>Sign Up</h1>
        <div className='grid grid-flow-row grid-cols-2 gap-5'>
          <p>Username:</p>
          <input className='border border-gruvbox-light rounded-sm' type='text' value={uname} onChange={(e)=>{setUname(e.target.value)}} />
        
          <p>Email:</p>
          <input className='border border-gruvbox-light rounded-sm' type='text' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        
          <p>Password:</p>
          <input className='border border-gruvbox-light rounded-sm' type='password' value={pwd} onChange={(e)=>{setPwd(e.target.value)}} />
        </div>
        <button className='text-xl rounded-lg bg-gruvbox-blue text-gruvbox-mid-d cursor-pointer px-2 py-1' onClick={handleSignUp}>Sign Up!</button>
      </div>
    </div>
  )
}

export default Signup