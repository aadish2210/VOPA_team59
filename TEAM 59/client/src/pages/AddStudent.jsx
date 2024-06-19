import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    name: '',
    roll: '',
    studentClass : '',
  });
  const [loading, setLoading] = useState(false);
  const { name, roll  , studentClass} = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value
    });
  };

  const handleError = (err) => toast.error(err, {
    position: 'bottom-left'
  });

  const handleSuccess = (msg) => toast.success(msg, {
    position: 'bottom-right'
  });

  const handleSubmit = async (e) => {
    console.log(inputValue)
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        'http://localhost:4000/student/addstudent',
        {
          ...inputValue
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess("Added Student Successfully");
        setTimeout(() => {
          navigate(`/studentlist/${inputValue.studentClass}`);
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
      handleError('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-400">
      <div className="relative w-full max-w-md bg-blue-500 p-6 rounded-lg shadow-lg">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-lg"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-center text-white mb-6">Add Student Here</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Name"
              onChange={handleOnChange}
              disabled={loading}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-4">Roll No.</label>
            <input
              type="text"
              name="roll"
              value={roll}
              placeholder="Roll No."
              onChange={handleOnChange}
              disabled={loading}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4">Class</label>
            <input
              type="text"
              name="studentClass"
              value={studentClass}
              placeholder="Class No."
              onChange={handleOnChange}
              disabled={loading}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 mt-6 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Adding Studnet...' : 'Add Student'}
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;

