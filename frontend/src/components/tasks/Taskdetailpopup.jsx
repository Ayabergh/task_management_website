import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';

const Taskdetailpopup = ({ task, onClose, onUpdate, onDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [values, setValues] = useState({ title: '', description: '' });

  useEffect(() => {
    if (task) {
      setValues({ title: task.title, description: task.description });
    }
  }, [task]);

  if (!task) return null;
  const handleDelete = () => {
    axios.delete(`http://localhost:3001/deletetask/${task.id}`)
      .then(res => {
        if (res.data.status === 'success') {
          onDelete(task.id); // Update task list in parent component
          onClose();
        }
      })
      .catch(err => console.log(err));
  };
  const handleEdit = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/updatetask/${task.id}`, values)
      .then(res => {
        if (res.data.status === 'success') {
          onUpdate({ ...task, ...values }); // Update task in parent component
          setEditMode(false);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md relative max-w-lg w-full">
        <button 
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <IoClose className="text-2xl" />
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{values.title}</h2>
        {editMode ? (
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="taskTitle">
                Title
              </label>
              <input
                type="text"
                id="taskTitle"
                name="title"
                value={values.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter task title"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="taskDescription">
                Description
              </label>
              <textarea
                id="taskDescription"
                name="description"
                value={values.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter task description"
                rows="4"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-slate-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-orange-300 text-white px-4 py-2 rounded"
              >
                Update Task
              </button>
            </div>
          </form>
        ) : (
          <div>
            <p className="text-gray-700 mb-4">{values.description}</p>
            <button className="mr-5 bg-orange-100 text-gray-800 py-2 px-4 rounded shadow-lg hover:bg-orange-300 transition"
              onClick={handleEdit}
            >
              Edit Task
            </button>
             <button 
              className="bg-red-100 text-red-800 py-2 px-4 rounded shadow-lg hover:bg-red-300 transition mt-4"
              onClick={handleDelete}
            >
              Delete Task
            </button>

            <button className="ml-5  bg-orange-100 text-gray-800 py-2 px-4 rounded shadow-lg hover:bg-orange-300 transition"
                 onClick={onClose}>
                     Close
             </button>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Taskdetailpopup;
