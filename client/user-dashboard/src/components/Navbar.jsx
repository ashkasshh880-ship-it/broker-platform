import React, { useState } from 'react';
import { FiMenu, FiX, FiLogOut, FiBell, FiUser } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-xl font-bold text-indigo-500">
              CryptoBroker
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white relative">
              <FiBell size={20} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center space-x-2 border-l border-slate-600 pl-4">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`} alt="Avatar" className="w-8 h-8 rounded-full" />
              <span className="text-sm text-gray-300">{user?.name || 'User'}</span>
            </div>
            <button onClick={handleLogout} className="text-gray-300 hover:text-red-500 transition">
              <FiLogOut size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <Link to="/profile" className="block px-4 py-2 text-gray-300 hover:bg-slate-700">
              <FiUser className="inline mr-2" />Profile
            </Link>
            <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-gray-300 hover:bg-slate-700">
              <FiLogOut className="inline mr-2" />Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
