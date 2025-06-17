import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavLink = ({ to, icon, label, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-2 rounded-md ${
        isActive
          ? 'bg-gray-200 text-gray-900'
          : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
      }`}
      onClick={onClick}
    >
      {icon}
      <span className='ml-2'>{label}</span>
    </Link>
  );
};

export default NavLink;
