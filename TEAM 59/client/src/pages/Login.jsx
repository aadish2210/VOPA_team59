import React, { useState , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
  setLoading(true);
  try {
    const { data } = await axios.post(
      "http://localhost:4000/login",
      {
        ...inputValue,
      },
      { withCredentials: true }
    );
    console.log(data);
    const { success, message } = data;
    if (success) {
      handleSuccess(message);
      console.log("Navigating Now");
     
      navigate("/language");
    } else {
      handleError(message);
    }
  } catch (error) {
    console.log(error);
    handleError("An error occurred. Please try again.");
  }
  setLoading(false);
  setInputValue({
    ...inputValue,
    email: "",
    password: "",
  });
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-400">
      <div className="relative w-full max-w-md bg-blue-500 p-6 rounded-lg shadow-lg">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-lg"></div>
      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Login Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
              disabled={loading}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
              disabled={loading}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? "Logging in..." : "Submit"}
          </button>
        
          <div className="mt-4 text-center">
            <span>
              Don't have an account? <Link to="/signup" className="text-white hover:text-indigo-500">Signup</Link>
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
