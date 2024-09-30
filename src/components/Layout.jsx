import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Dashboard from '../pages/Dashboard';
import Customers from '../pages/Customers';
import Jobs from '../pages/Jobs';
import Payments from '../pages/Payments';
import Expenses from '../pages/Expenses';
import Reports from '../pages/Reports';
import BankAccounts from '../pages/BankAccounts';

const Layout = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/bank-accounts" element={<BankAccounts />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default Layout;