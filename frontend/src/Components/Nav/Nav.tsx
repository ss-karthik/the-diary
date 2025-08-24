import { useContext } from 'react';
import { Link } from "react-router-dom"
import { AuthContext } from '../Auth/AuthProvider';
import { postRequest } from '../../Utils/requests';
import { BACKEND_URL } from '../../Utils/constants';
import { NotebookTabs } from 'lucide-react';

const Nav = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const handleLogout = async ()=>{
      await postRequest(`${BACKEND_URL}/logout`,{});
      location.assign('/login');
  }
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gruvbox-light shadow-lg">
      <div className="container mx-auto lg:px-6 px-2 py-4 flex justify-between items-center">
        {isLoggedIn ? (
          <>
          <Link to="/dashboard" className="text-2xl font-bold text-gray-800 hover:text-gruvbox-red transition-colors duration-300">
             <h1 className='block md:hidden'><NotebookTabs/></h1>
            <h1 className='hidden md:block'>The Diary</h1>
          </Link>
        
          <div className="flex space-x-6">
              
            <Link 
              to="/todos" 
              className="text-gray-600 hover:text-gruvbox-red hover:scale-105 transition-all duration-300 font-medium"
            >
              Todos
            </Link>
            <Link 
              to="/notes" 
              className="text-gray-600 hover:text-gruvbox-red hover:scale-105 transition-all duration-300 font-medium"
            >
              Notes
            </Link>
            <Link 
              to="/habits" 
              className="text-gray-600 hover:text-gruvbox-red hover:scale-105 transition-all duration-300 font-medium"
            >
              Habits
            </Link>
            <p onClick={handleLogout} className='cursor-pointer text-gray-600 hover:text-gruvbox-red hover:scale-105 transition-all duration-300 font-medium'>
              Logout
            </p>
            </div>
          </>
          ) : (
            <>
          <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-gruvbox-red transition-colors duration-300">
            <h1 className='block md:hidden'><NotebookTabs/></h1>
            <h1 className='hidden md:block'>The Diary</h1>
          </Link>
        
          <div className="flex space-x-6">
              
            <Link 
              to="/login" 
              className="text-gray-600 hover:text-gruvbox-red hover:scale-105 transition-all duration-300 font-medium"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="text-gray-600 hover:text-gruvbox-red hover:scale-105 transition-all duration-300 font-medium"
            >
              Sign Up
            </Link>
            
            </div>
            </>
          )}
      </div>
    </nav>
  )
}

export default Nav