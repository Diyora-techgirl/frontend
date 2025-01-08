import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false); 
  const { login } = useAuth(); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => { 
    e.preventDefault();
  
    try {
      const response = await axios.post('https://homeworkdashboardbackend.vercel.app/user/login', {
        email,
        password
      });
      console.log('Login successful:', response.data, response.data.token );
      login(response.data.token, rememberMe); 
      navigate('/home'); 
    } catch (err) {
      console.error('Login error:', err); 
      setError(err.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-semibold text-gray-800">Login</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              id="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              id="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            <label htmlFor="rememberMe" className="text-gray-600">Remember me</label>
          </div>
          <div>
            <button 
              type="submit" 
              className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Login
            </button>
          </div>
        </form>

        {error && <div className="text-red-500 text-center mt-3">{error}</div>} {/* Display error */}
      </div>
    </section>
  );
};

export default Login;
