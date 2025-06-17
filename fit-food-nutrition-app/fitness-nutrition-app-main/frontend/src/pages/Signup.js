import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import axiosInstance from '../axiosInstance';
import { AuthContext } from '../App';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUserData } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/profile');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/users', {
        name,
        email,
        password,
      });
      setUserData({ name: response.data.name });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data._id);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating account');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-8'>
      <div className='bg-white p-10 rounded-lg shadow-lg w-full max-w-md'>
        <h1 className='text-3xl font-bold mb-6 text-center text-green-600'>
          Sign Up
        </h1>
        {error && <p className='text-red-500 mb-4 text-center'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Name
            </label>
            <div className='flex items-center border border-gray-300 rounded-md shadow-sm'>
              <FaUser className='text-gray-400 ml-2' />
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='mt-1 block w-full px-4 py-2 focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md'
                placeholder='Enter your name'
              />
            </div>
          </div>
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Email
            </label>
            <div className='flex items-center border border-gray-300 rounded-md shadow-sm'>
              <FaEnvelope className='text-gray-400 ml-2' />
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='mt-1 block w-full px-4 py-2 focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md'
                placeholder='Enter your email'
              />
            </div>
          </div>
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Password
            </label>
            <div className='flex items-center border border-gray-300 rounded-md shadow-sm'>
              <FaLock className='text-gray-400 ml-2' />
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='mt-1 block w-full px-4 py-2 focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md'
                placeholder='Enter your password'
              />
            </div>
          </div>
          <button
            type='submit'
            className='w-full bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700 transition duration-200'
          >
            Sign Up
          </button>
        </form>
        <p className='mt-4 text-center text-sm text-gray-600'>
          Already have an account?{' '}
          <a href='/login' className='text-green-600 hover:underline'>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
