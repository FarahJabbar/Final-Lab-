import React, { useContext, useState, useEffect } from 'react';
import {
  FaUser,
  FaWeight,
  FaRuler,
  FaTransgender,
  FaHeartbeat,
  FaBullseye,
} from 'react-icons/fa';
import { StatCard } from '../components/StatCard';
import { AuthContext } from '../App';
import axiosInstance from '../axiosInstance';
import { renderAiSuggestion } from '../renderAiSuggestion';

const Profile = () => {
  const { userData, setUserData } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const response = await axiosInstance.get(`/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [setUserData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      await axiosInstance.post(`/api/users/${userId}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-gray-900'>Profile</h1>
          <p className='mt-2 text-gray-600'>Manage your personal information</p>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
          <StatCard
            icon={FaUser}
            title='Name'
            value={userData.name}
            color='bg-blue-500'
          />
          <StatCard
            icon={FaHeartbeat}
            title='Age'
            value={userData.age}
            color='bg-green-500'
          />
          <StatCard
            icon={FaWeight}
            title='Weight'
            value={`${userData.weight} kg`}
            color='bg-orange-500'
          />
          <StatCard
            icon={FaRuler}
            title='Height'
            value={`${userData.height} cm`}
            color='bg-purple-500'
          />
          <StatCard
            icon={FaTransgender}
            title='Gender'
            value={userData.gender}
            color='bg-pink-500'
          />
          <StatCard
            icon={FaBullseye}
            title='Goal'
            value={userData.goal}
            color='bg-yellow-500'
          />
        </div>

        {/* Edit Profile Section */}
        <div className='bg-white p-6 rounded-xl shadow-lg mb-8'>
          <h2 className='text-xl font-semibold text-gray-900 mb-6'>
            Edit Profile
          </h2>
          {isEditing ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveChanges();
              }}
            >
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Form Fields */}
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={userData.name}
                    onChange={handleChange}
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Age
                  </label>
                  <input
                    type='number'
                    name='age'
                    value={userData.age}
                    onChange={handleChange}
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Weight (kg)
                  </label>
                  <input
                    type='number'
                    name='weight'
                    value={userData.weight}
                    onChange={handleChange}
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Height (cm)
                  </label>
                  <input
                    type='number'
                    name='height'
                    value={userData.height}
                    onChange={handleChange}
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Gender
                  </label>
                  <select
                    name='gender'
                    value={userData.gender}
                    onChange={handleChange}
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                    required
                  >
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='other'>Other</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Goal
                  </label>
                  <input
                    type='text'
                    name='goal'
                    value={userData.goal}
                    onChange={handleChange}
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                    required
                  />
                </div>
              </div>
              <div className='flex justify-end mt-6'>
                <button
                  type='submit'
                  className='bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className='flex justify-end mt-6'>
              <button
                type='button'
                onClick={() => setIsEditing(true)}
                className='bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>

        {/* AI Suggestions Section */}
        <div className='bg-white p-6 rounded-xl shadow-lg'>
          <h2 className='text-xl font-semibold text-gray-900 mb-6'>
            AI Suggestions
          </h2>
          {userData.aiSuggestions && userData.aiSuggestions.length > 0 ? (
            userData.aiSuggestions.map((suggestion) => (
              <div
                key={suggestion._id}
                className='mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50'
              >
                <p className='font-semibold'>Question: {suggestion.question}</p>
                <p className='mt-2 text-gray-700'>
                  Answer: {renderAiSuggestion(suggestion.answer)}
                </p>
                <p className='text-sm text-gray-500'>
                  Created At: {new Date(suggestion.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className='text-gray-600'>No AI suggestions available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
