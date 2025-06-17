import React from 'react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className='bg-white p-6 rounded-lg shadow-md text-center transition-transform transform hover:scale-105'>
      <div className='text-green-600 text-4xl mb-4'>{icon}</div>
      <h2 className='text-xl font-semibold'>{title}</h2>
      <p className='text-gray-600'>{description}</p>
    </div>
  );
};

export default FeatureCard;
