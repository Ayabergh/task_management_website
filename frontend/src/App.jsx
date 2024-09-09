import React from 'react'
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import { UserProvider } from '../src/components/mainpage/UserContext';
import Login from './components/mainpage/Login';
import Register from './components/mainpage/Register';
import Mainpage from './components/mainpage/Mainpage';
import Dashboard from './components/dashboard/Dashboard';
import Taskpopup from './components/tasks/Taskpopup';
const App = () => {
  return (
    <>
    <UserProvider>
    
    <BrowserRouter>
    {/***************************home page ********************************/}
     <Routes>
      <Route path='/' element={<Mainpage/>}/>
      <Route path='/signup' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/createtask' element={<Taskpopup/>}/>
     </Routes>
    </BrowserRouter>
    </UserProvider>
    </>
  )
}

export default App