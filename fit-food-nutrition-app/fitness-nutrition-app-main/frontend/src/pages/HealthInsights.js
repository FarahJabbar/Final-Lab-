import React from 'react';
import { FaHeartbeat, FaBrain, FaAppleAlt, FaBed } from 'react-icons/fa';

const HealthInsights = () => {
  const insights = [
    {
      id: 1,
      title: 'The Importance of Sleep for Fitness',
      category: 'Sleep',
      icon: <FaBed className="text-4xl text-blue-500" />,
      summary: 'Learn how quality sleep affects your workout performance and recovery.',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Nutrition Myths Debunked',
      category: 'Nutrition',
      icon: <FaAppleAlt className="text-4xl text-green-500" />,
      summary: 'Common nutrition misconceptions and the science behind them.',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'Mental Health and Exercise',
      category: 'Mental Health',
      icon: <FaBrain className="text-4xl text-purple-500" />,
      summary: 'How regular exercise can improve your mental wellbeing.',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'Heart Health Basics',
      category: 'Cardiovascular',
      icon: <FaHeartbeat className="text-4xl text-red-500" />,
      summary: 'Essential tips for maintaining a healthy heart through exercise.',
      readTime: '8 min read'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Health Insights</h1>
      
      {/* Featured Article */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg p-8 mb-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Featured: The Science of Recovery</h2>
        <p className="mb-4">Understanding how proper recovery techniques can enhance your fitness journey and prevent injuries.</p>
        <button className="bg-white text-blue-500 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
          Read More
        </button>
      </div>

      {/* Health Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map(insight => (
          <div key={insight.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {insight.icon}
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-500">{insight.category}</span>
                <h3 className="text-xl font-bold mb-2">{insight.title}</h3>
                <p className="text-gray-600 mb-4">{insight.summary}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{insight.readTime}</span>
                  <button className="text-blue-500 hover:text-blue-600 font-semibold">
                    Read Article →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Health Tip */}
      <div className="mt-8 bg-green-50 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Weekly Health Tip</h2>
        <p className="text-gray-700">
          "Stay hydrated throughout your workout. Aim to drink water before, during, and after exercise to maintain optimal performance and recovery."
        </p>
      </div>
    </div>
  );
};

export default HealthInsights; 