import React, { useState,useContext,useEffect } from 'react'
import Sidebar from '../sidebar/Sidebar'
import Createtask from '../tasks/Taskpopup'
import { LuPlus } from "react-icons/lu";
import { Link } from 'react-router-dom';
import Taskpopup from '../tasks/Taskpopup';
import { UserContext }  from '../mainpage/UserContext';
import axios from 'axios';

const Dashboard = () => {
  const { userId } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const [showcreate,setShowcreate]=useState(false)
  const handleOnClose=()=>setShowcreate(false)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/tasks/${userId}`);
        console.log('Fetch Tasks Response:', response.data); // Add logging
        setTasks(response.data);
      } catch (err) {
        console.log('Error fetching tasks:', err); // Add error logging
        setError('Failed to fetch tasks');
      }
    };

    fetchTasks();
  }, [userId]);


  return (
    <>
    <div className='flex font-bold'>
        <Sidebar/>
         <div className='ml-20 mt-20 text-5xl'>
          HOME
          
          <div>
      <h1>Your Tasks</h1>
      {error && <p className='text-red-500'>{error}</p>}
      <ul>
        {tasks.length > 0 ? (
          tasks.map(task => (
            <li key={task.id}>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
            </li>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </ul>
    </div>
          <div className='relative '>
            <button className='absolute -bottom-[470px] -right-[700px] text-5xl' onClick={()=>setShowcreate(true)}>
            <LuPlus className='bg-orange-100 rounded-full border-black border-2' />
            </button>
          </div>
         </div>

       
      </div>
       <Taskpopup onClose={handleOnClose} visible={showcreate} />
    </>
  )
}

export default Dashboard 