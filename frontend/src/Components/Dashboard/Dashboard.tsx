import { postRequest } from '../../Utils/requests'
import { BACKEND_URL } from '../../Utils/constants'
import { AuthContext } from '../Auth/AuthProvider'
import { useContext } from 'react'

const Dashboard = () => {
  const handleLogout = async ()=>{
    await postRequest(`${BACKEND_URL}/logout`,{});
    location.assign('/login');
  }

  const {email, uname} = useContext(AuthContext);

  return (
    <div className='flex flex-col items-center gap-5'>
        <h1 className='text-2xl'>Welcome {uname}</h1>
        <h1 className='text-md'>Email: {email}</h1>
      <button className='text-xl rounded-lg bg-gruvbox-red text-gruvbox-mid-d cursor-pointer px-2 py-1' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard