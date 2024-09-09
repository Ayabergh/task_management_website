import React, { useState, useContext  } from 'react';
import { UserContext } from '../mainpage/UserContext';
import axios from 'axios';

const Taskpopup = ({ visible, onClose }) => {
  const { userId } = useContext(UserContext);
  const [values, setValues] = useState({
    title: '',
    description: '',
  });

  const {settasktitle}=useContext(UserContext);
  const {settaskdescription}=useContext(UserContext);
  if (!visible) return null;

  const handleOnClose = () => {
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      ...values,
      userId: userId, // add the userId here
    };
    //endpoint connection 
    axios.post('http://localhost:3001/createtask', taskData)
      .then(res => {
        if (res.data.status === 'success') {
          settasktitle(res.data.title);
          settaskdescription(res.data.description);
          navigate('/dashboard');
        }
      })
      .catch(err => console.log(err));



    // Handle task creation logic here
    console.log('Task Created:', values);
    setValues({
      title: '',
      description: '',
    });
    onClose();
  };

  return (
    <div
      onClick={handleOnClose}
      className='fixed inset-0 bg-zinc-400 bg-opacity-30 backdrop-blur-sm flex justify-center items-center'
    >
      <div
        className='relative bg-white w-3/5 h-auto p-5 rounded-3xl'
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
      >
        <button
          onClick={handleOnClose}
          className='absolute top-4 right-4 text-xl font-bold'
        >
          X
        </button>
        <h2 className='text-2xl font-semibold mb-4'>Create Task</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2' htmlFor='taskTitle'>
              Title
            </label>
            <input
              type='text'
              id='taskTitle'
              name='title'
              value={values.title}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg p-2'
              placeholder='Enter task title'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2' htmlFor='taskDescription'>
              Description
            </label>
            <textarea
              id='taskDescription'
              name='description'
              value={values.description}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg p-2'
              placeholder='Enter task description'
              rows='4'
              required
            />
          </div>
          <div className='flex justify-end space-x-2'>
            <button
              type='button'
              onClick={handleOnClose}
              className='bg-slate-400 text-white px-4 py-2 rounded'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='bg-orange-300 text-white px-4 py-2 rounded'
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Taskpopup;