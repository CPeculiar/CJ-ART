import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Briefcase, CreditCard, DollarSign, FileText, PieChart, Settings } from 'lucide-react';
import '../styles/Sidebar.css'

const Sidebar = ({ isOpen, toggleSidebar, onMenuItemClick }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Customers', icon: Users, path: '/customers' },
    { name: 'Jobs', icon: Briefcase, path: '/jobs' },
    { name: 'Payments', icon: CreditCard, path: '/payments' },
    { name: 'Expenses', icon: DollarSign, path: '/expenses' },
    { name: 'Reports', icon: PieChart, path: '/reports' },
    { name: 'Bank Accounts', icon: FileText, path: '/bank-accounts' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.sidebar')) {
        setSelectedItem(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleItemClick = (name) => {
    setSelectedItem(name);
    onMenuItemClick(name);
  }


  return (
    <div className={`sidebar ${isOpen ? 'expanded' : 'collapsed'}`}>
    <button className="toggle-button" onClick={toggleSidebar}>
    {isOpen ? '◀' : '►'}
      {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg> */}
    </button>
    <ul>
      {menuItems.map((item, index) => (
        <li>
        <Link
          key={index}
          to={item.path}
          className={selectedItem === item.name ? 'selected' : ''}
          onClick={() => handleItemClick(item.name)}
          // className={`flex items-center py-2.5 px-4 rounded transition duration-200 ${location.pathname === item.path ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'}`}
        >
          <item.icon className=" icon w-5 h-5 mr-2" />
          {isOpen && <span className="name">{item.name}</span>}
        </Link>
        </li>
      ))}
    </ul>
  </div>
);
};

export default Sidebar;