import { postRequest } from '../../Utils/requests'
import { BACKEND_URL } from '../../Utils/constants'

const Dashboard = () => {

  const handleLogout = async ()=>{
    await postRequest(`${BACKEND_URL}/logout`,{});
    location.assign('/login');
  }
  return (
    <div>
      Dashboard - Only if your authed
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard