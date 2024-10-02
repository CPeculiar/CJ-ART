import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();  // Initialize the navigate hook

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSignOut = () => {
    // Redirect to the login page after sign out
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
     <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
      <Navbar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} onSignOut={handleSignOut} />
        <main className="p-4 md:p-6 min-h-screen bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;