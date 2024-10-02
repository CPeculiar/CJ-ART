import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Briefcase, CreditCard, DollarSign, FileText, PieChart, Settings } from 'lucide-react';
import '../styles/Sidebar.css'

const Sidebar = ({ isOpen, toggleSidebar, onMenuItemClick }) => {
  const location = useLocation();
  // const [selectedItem, setSelectedItem] = useState(null);

  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Customers', icon: Users, path: '/customers' },
    { name: 'Jobs', icon: Briefcase, path: '/jobs' },
    { name: 'Payments', icon: CreditCard, path: '/payments' },
    { name: 'Expenses', icon: DollarSign, path: '/expenses' },
    { name: 'Bank Accounts', icon: FileText, path: '/bank-accounts' },
    { name: 'Reports', icon: PieChart, path: '/reports' },
    // { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (!event.target.closest('.sidebar')) {
  //       setSelectedItem(null);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  // const handleItemClick = (name) => {
  //   setSelectedItem(name);
  //   onMenuItemClick(name);
  // }


  return (
    <div className={`fixed top-0 left-0 h-full bg-yellow-900 text-white transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-16'} z-50`}>
      <button 
        className="absolute -right-3 top-9 bg-yellow-500 text-white p-1 rounded-full hover:bg-yellow-600 focus:outline-none"
        onClick={toggleSidebar}
      >
        {isOpen ? '◀' : '►'}
    
    </button>

    <div className="flex flex-col h-full">
    <div className="p-4">
          {isOpen ? (
            <img
              src="/CJ-ART-Logo1.png" // Replace with your full logo image path
              alt="CJ ART Full Logo"
              className="w-32 h-auto"
            />
          ) : (
            <img
              src="/CJ-ART-Logo2.png" // Replace with your small logo/abbreviation image path
              alt="CJ ART Collapsed Logo"
              className="mx-auto w-8 h-8"
            />
          )}
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
      {menuItems.map((item, index) => (
        <li key={item.path}>
        <Link
          key={index}
          to={item.path}
          className={`flex items-center px-4 py-2 transition-all duration-200
                    ${location.pathname === item.path 
                      ? 'bg-yellow-700 text-white' 
                      : 'text-yellow-100 hover:bg-yellow-800'}`}
                  onClick={() => window.innerWidth <= 768 && toggleSidebar()}
          // className={`flex items-center py-2.5 px-4 rounded transition duration-200 ${location.pathname === item.path ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'}`}
        >
          <item.icon className={`h-5 w-5 ${isOpen ? 'mr-3' : 'mx-auto'}`} />
          <span className={`${isOpen ? 'block' : 'hidden'}`}>{item.name}</span>
        </Link>
        </li>
      ))}
      </ul>
        </nav>
      </div>
    </div>
);
};

export default Sidebar;