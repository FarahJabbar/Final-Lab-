import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  House,
  User,
  Dumbbell,
  Beef,
  Loader,
  Menu,
  X,
  Brain,
  LogIn,
  LogOut,
  ChevronDown,
  Calculator,
  Bell,
  Search,
  Plus,
} from 'lucide-react';
import NavLink from './NavLink';
import { AuthContext } from '../App';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const { userData, setUserData } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUserData((prevData) => ({
      ...prevData,
      isLoggedIn: false,
    }));
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setUserData((prevData) => ({
        ...prevData,
        isLoggedIn: true,
      }));
    }
  }, [userData.isLoggedIn, setUserData]);

  return (
    <nav className='bg-gradient-to-r from-green-600 to-green-800 shadow-lg'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center space-x-4'>
            <Link to='/' className='font-bold text-xl text-white'>
              FitTrack
            </Link>
            {/* Search Bar */}
            <div className='hidden md:flex items-center bg-white/10 rounded-lg px-3 py-1'>
              <Search size={18} className='text-white/70' />
              <input
                type='text'
                placeholder='Search...'
                className='bg-transparent border-none outline-none text-white placeholder-white/70 ml-2 w-40'
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className='hidden md:flex items-center space-x-4'>
            {userData.isLoggedIn && (
              <>
                <button className='text-white hover:text-white/80 transition-colors'>
                  <Bell size={20} />
                  {notifications > 0 && (
                    <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>
                      {notifications}
                    </span>
                  )}
                </button>
                <button className='bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg flex items-center space-x-1 transition-colors'>
                  <Plus size={18} />
                  <span>Quick Add</span>
                </button>
              </>
            )}
          </div>

          <div className='md:hidden'>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <div className={`hidden md:flex space-x-4`}>
            {userData.isLoggedIn ? (
              <>
                <NavLink
                  to='/dashboard'
                  icon={<House size={20} />}
                  label='Dashboard'
                />
                <NavLink
                  to='/profile'
                  icon={<User size={20} />}
                  label='Profile'
                />
                <NavLink
                  to='/workouts'
                  icon={<Dumbbell size={20} />}
                  label='Workouts'
                />
                <NavLink to='/meals' icon={<Beef size={20} />} label='Meals' />
                <NavLink
                  to='/progress'
                  icon={<Loader size={20} />}
                  label='Progress'
                />
                <NavLink
                  to='/nutrition-calculator'
                  icon={<Calculator size={20} />}
                  label='Nutrition Calculator'
                />
                <NavLink
                  to='/ai-assistant'
                  icon={<Brain size={20} />}
                  label='AI Assistant'
                />
                <NavLink
                  to='/login'
                  icon={<LogOut size={20} />}
                  label='Logout'
                  onClick={handleLogout}
                />
              </>
            ) : (
              <NavLink to='/login' icon={<LogIn size={20} />} label='Login' />
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className='fixed inset-0 bg-gray-800 bg-opacity-90 z-10'
          onClick={() => setIsMenuOpen(false)}
        >
          <div className='flex flex-col items-center justify-center h-full bg-white'>
            <button
              className='absolute top-4 right-4'
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={24} />
            </button>
            <div className='flex flex-col space-y-4'>
              {userData.isLoggedIn ? (
                <>
                  <NavLink
                    to='/dashboard'
                    icon={<House size={20} />}
                    label='Dashboard'
                    className='text-xl'
                  />
                  <NavLink
                    to='/profile'
                    icon={<User size={20} />}
                    label='Profile'
                    className='text-xl'
                  />
                  <NavLink
                    to='/workouts'
                    icon={<Dumbbell size={20} />}
                    label='Workouts'
                    className='text-xl'
                  />
                  <NavLink
                    to='/meals'
                    icon={<Beef size={20} />}
                    label='Meals'
                    className='text-xl'
                  />
                  <NavLink
                    to='/progress'
                    icon={<Loader size={20} />}
                    label='Progress'
                    className='text-xl'
                  />
                  <NavLink
                    to='/nutrition-calculator'
                    icon={<Calculator size={20} />}
                    label='Nutrition Calculator'
                    className='text-xl'
                  />
                  <NavLink
                    to='/ai-assistant'
                    icon={<Brain size={20} />}
                    label='AI Assistant'
                    className='text-xl'
                  />
                  <NavLink
                    to='/login'
                    icon={<LogOut size={20} />}
                    label='Logout'
                    onClick={handleLogout}
                    className='text-xl'
                  />
                </>
              ) : (
                <NavLink to='/login' icon={<LogIn size={20} />} label='Login' />
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
