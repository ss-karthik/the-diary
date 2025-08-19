import { postRequest } from '../../Utils/requests'
import { BACKEND_URL } from '../../Utils/constants'

const Dashboard = () => {

  const handleLogout = async ()=>{
    await postRequest(`${BACKEND_URL}/logout`,{});
    location.assign('/login');
  }
  return (
    <div className='flex flex-col items-center gap-5'>
      <h1 className='text-2xl'>Dashboard - Only if your authed</h1>
      <button className='text-xl rounded-lg bg-gruvbox-red text-gruvbox-mid-d cursor-pointer px-2 py-1' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard