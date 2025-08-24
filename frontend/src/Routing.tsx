import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './Components/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Todos from './Components/Todos/Todos';
import AuthProvider, { AuthContext } from './Components/Auth/AuthProvider';
import { useContext, type PropsWithChildren } from 'react';
import AllNotes from './Components/Notes/AllNotes';
import IndividualNote from './Components/Notes/IndividualNote';
import AllHabits from './Components/Habits/AllHabits';
import HabitTrack from './Components/Habits/HabitTrack';
import Nav from './Components/Nav/Nav';

const Routing = () => {
  return (
    <AuthProvider>
      <Nav/>
      <div className='min-h-screen h-full text-gruvbox-light pt-20 bg-gruvbox-dark'>
      <Routes>
          <Route path='/' element={<GuestRoute><Home/></GuestRoute>}/>
          <Route path='/login' element={<GuestRoute><Login/></GuestRoute>}/>
          <Route path='/signup' element={<GuestRoute><Signup/></GuestRoute>}/>
          <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
          <Route path='/todos' element={<PrivateRoute><Todos/></PrivateRoute>}/>
          <Route path='/notes' element={<PrivateRoute><AllNotes/></PrivateRoute>}/>
          <Route path='/notes/:noteId' element={<PrivateRoute><IndividualNote/></PrivateRoute>}/>
          <Route path='/habits' element={<PrivateRoute><AllHabits/></PrivateRoute>}/>
          <Route path='/habits/:habitId' element={<PrivateRoute><HabitTrack/></PrivateRoute>}/>
      </Routes>
      </div>
    </AuthProvider>
  )
}

const PrivateRoute = ({children}: PropsWithChildren)=>{
  const {isLoggedIn, loading} = useContext(AuthContext);
  if(loading){
    return <div>Loading...</div>
  }

  return isLoggedIn ? children : <Navigate to="/login"/>;
}

const GuestRoute = ({children}: PropsWithChildren)=>{
  const {isLoggedIn, loading} = useContext(AuthContext);
  if(loading){
    return <div>Loading...</div>
  }

  return !isLoggedIn ? children : <Navigate to="/dashboard"/>;
}


export default Routing