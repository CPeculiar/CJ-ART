import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Jobs from './pages/Jobs';
import Payments from './pages/Payments';
import Expenses from './pages/Expenses';
import Reports from './pages/Reports';
import BankAccounts from './pages/BankAccounts';
import HomePage from './pages/Homepage';
import Login from './pages/Login';
import RegistrationForm from './pages/RegistrationForm';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import Test from './pages/Test';
import OurServices from './pages/OurServices';


function App() {

 
  return (
    <>
     

      {/* <div className="flex h-screen bg-gray-100"> */}
      {/* <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} /> */}
        {/* <div className="flex-1 flex flex-col"> */}
       
        {/* <Navbar toggleSidebar={toggleSidebar} /> */}
          {/* <main className="flex-1 p-4 bg-gray-100 overflow-y-auto"> */}
          
            <Routes>
            {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/services" element={<OurServices />} />


       {/* Private routes wrapped in Layout */}
       <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/bank-accounts" element={<BankAccounts />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

       {/* Not Found route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
        
   
      
    </>
  )
}

export default App
