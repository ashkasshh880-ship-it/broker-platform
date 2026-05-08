import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiDollarSign, FiTrendingUp, FiUser, FiSettings, FiShare2, FiBell } from 'react-icons/fi';

const Sidebar = () => {
  const navItems = [
    { icon: FiHome, label: 'Dashboard', path: '/dashboard' },
    { icon: FiDollarSign, label: 'Wallet', path: '/wallet' },
    { icon: FiTrendingUp, label: 'Trading', path: '/trading' },
    { icon: FiHome, label: 'Portfolio', path: '/portfolio' },
    { icon: FiShare2, label: 'Referral', path: '/referral' },
    { icon: FiUser, label: 'Profile', path: '/profile' },
    { icon: FiSettings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="hidden md:block w-64 bg-slate-800 border-r border-slate-700 min-h-screen fixed left-0 top-16">
      <nav className="mt-8 space-y-2 px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                isActive ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-slate-700'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
