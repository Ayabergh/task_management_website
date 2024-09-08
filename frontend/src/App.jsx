import React from 'react'
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import { UserProvider } from '../src/components/mainpage/UserContext';
import Login from './components/mainpage/Login';
import Register from './components/mainpage/Register';
import Mainpage from './components/mainpage/Mainpage';
import Dashboard from './components/dashboard/Dashboard';
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
     </Routes>
    </BrowserRouter>
    </UserProvider>
    </>
  )
}

export default App