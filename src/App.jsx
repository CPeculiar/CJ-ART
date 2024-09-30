import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Jobs from './pages/Jobs';
import Payments from './pages/Payments';
import Expenses from './pages/Expenses';
import Reports from './pages/Reports';
import BankAccounts from './pages/BankAccounts';
import HomePage from './pages/Homepage';

import './App.css'

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
     <Router>

      {/* <div className="flex h-screen bg-gray-100"> */}
      {/* <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} /> */}
        {/* <div className="flex-1 flex flex-col"> */}
       
        {/* <Navbar toggleSidebar={toggleSidebar} /> */}
          {/* <main className="flex-1 p-4 bg-gray-100 overflow-y-auto"> */}
          
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/bank-accounts" element={<BankAccounts />} />
            </Routes>
        
   
      
    </Router>
    </>
  )
}

export default App
