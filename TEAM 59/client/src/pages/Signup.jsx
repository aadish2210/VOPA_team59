import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    username: '',
    password: '',
    email : '',
  });
  const [loading, setLoading] = useState(false);
  const { username, password  , email} = inputValue;

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
        'http://localhost:4000/signup',
        {
          ...inputValue
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/language');
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
          <h3 className="text-2xl font-bold text-center text-white mb-6">Sign Up Here</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Email or Phone"
              onChange={handleOnChange}
              disabled={loading}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-4">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={handleOnChange}
              disabled={loading}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={handleOnChange}
              disabled={loading}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 mt-6 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Signing in...' : 'Sign Up'}
            </button>
            <div className="mt-4 text-center">
              <span className="text-white">
                Already a member? <Link to="/login" className="text-indigo-200 hover:text-indigo-100">Log in</Link>
              </span>
            </div>
            
    
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;

