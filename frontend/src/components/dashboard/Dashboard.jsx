import React, { useState, useContext, useEffect } from 'react';
import Sidebar from '../sidebar/Sidebar';
import Taskpopup from '../tasks/Taskpopup';
import Taskdetailpopup from '../tasks/Taskdetailpopup'; // Import the new component
import { LuPlus } from 'react-icons/lu';
import { UserContext } from '../mainpage/UserContext';
import axios from 'axios';

const Dashboard = () => {
  const { userId } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleOnCloseCreate = () => setShowCreate(false);
  const handleOnCloseDetail = () => setSelectedTask(null);
  const handleUpdateTask = (updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
  };
  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/tasks/${userId}`);
        setTasks(response.data);
      } catch (err) {
        setError('Failed to fetch tasks');
      }
    };

    fetchTasks();
  }, [userId]);

 const addTask = (newTask) => {
  setTasks((prevTasks) => [...prevTasks, newTask]);
};


  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex-1 p-6 bg-white'>
        <header className="flex items-center justify-between mb-6 border-b border-gray-300 pb-4">
          <h1 className="text-3xl font-bold text-gray-800">Task Dashboard</h1>
          <button 
            className='text-lg font-medium bg-orange-100 px-4 py-2 rounded shadow-lg hover:bg-orange-300 transition'
            onClick={() => setShowCreate(true)}
          >
            <LuPlus className='inline-block mr-2' /> Add Task
          </button>
        </header>
        
        <main >
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Tasks</h2>
          {error && <p className='text-red-500 mb-4'>{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {tasks.length > 0 ? (
              tasks.map(task => (
          <div key={task.id} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 cursor-pointer"
             onClick={() => setSelectedTask(task)} >
           <h3 className="text-xl font-semibold mb-2 text-gray-800">{task.title}</h3>
          <p className="text-gray-600 mb-4">{task.description}</p>
         <a href="#" className="text-orange-500 hover:underline">View Details</a>
           </div>
           ))
        ) : (
          <p className="text-gray-600">No tasks available</p>
           )}</div>
        </main>
      </div>
      <Taskpopup onClose={handleOnCloseCreate} visible={showCreate} onTaskCreated={addTask} />
      <Taskdetailpopup task={selectedTask} onClose={handleOnCloseDetail} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />
    </div>
  );
};

export default Dashboard;
