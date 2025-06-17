import React from 'react';
import { features } from '../Feature';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='min-h-screen bg-gradient-to-b from-white to-green-50 relative'>
      <div className='absolute inset-0 bg-[url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")] bg-cover bg-center opacity-20'></div>
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Hero Section */}
        <header className='pt-16 md:pt-24 text-center'>
          <div className='max-w-3xl mx-auto'>
            <h1 className='text-5xl md:text-6xl font-bold text-gray-900 mb-6'>
              Welcome to <span className='text-green-600'>FitTrack</span>
            </h1>
            <p className='text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed'>
              Your ultimate fitness companion for tracking workouts, meals, and
              progress with precision and ease.
            </p>
            <div className='space-x-4'>
              <button
                onClick={() => navigate('/login')}
                className='inline-flex items-center px-8 py-3 rounded-full text-lg font-semibold bg-green-600 text-white hover:bg-green-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl'
              >
                Get Started
              </button>
              <button className='inline-flex items-center px-8 py-3 rounded-full text-lg font-semibold text-green-600 bg-white border-2 border-green-600 hover:bg-green-50 transform hover:scale-105 transition-all'>
                Learn More
              </button>
            </div>
          </div>
        </header>

        {/* Features Section */}
        <section className='py-16 md:py-24'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Why Choose FitTrack?
            </h2>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              Discover how our features can help you achieve your fitness goals
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {features.map((feature) => (
              <div
                key={feature.title}
                className='bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300'
              >
                <div className='flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-6'>
                  {feature.icon}
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>
                  {feature.title}
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-16 md:py-24'>
          <div className='bg-green-600 rounded-3xl p-8 md:p-16 text-center text-white'>
            <h2 className='text-3xl md:text-4xl font-bold mb-6'>
              Ready to Transform Your Fitness Journey?
            </h2>
            <p className='text-xl md:text-2xl mb-8 opacity-90'>
              Join thousands of users who have already achieved their fitness
              goals with FitTrack
            </p>
            <button className='px-8 py-3 text-lg font-semibold bg-white text-green-600 rounded-full hover:bg-green-50 transform hover:scale-105 transition-all'>
              Start Free Trial
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className='py-12 text-center border-t border-gray-200'>
          <div className='max-w-2xl mx-auto'>
            <p className='text-gray-600 mb-4'>
              Join our community and start your fitness journey today!
            </p>
            <div className='flex justify-center space-x-6'>
              <p className='text-gray-400 hover:text-gray-600'>Terms</p>
              <p className='text-gray-400 hover:text-gray-600'>Privacy</p>
              <p className='text-gray-400 hover:text-gray-600'>Contact</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
