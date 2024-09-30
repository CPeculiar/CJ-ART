import React, { useState, useEffect } from 'react';
import { getCustomers, addCustomer } from '../services/firestore';

const Customers = ({ isSidebarExpanded }) => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const fetchedCustomers = await getCustomers();
    setCustomers(fetchedCustomers);
  };

  const handleAddCustomer = async () => {
    await addCustomer(newCustomer);
    setNewCustomer({ name: '', email: '', phone: '', address: '' });
    fetchCustomers();
  };


  return (
    <div className={`dashboard ${isSidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>  
      {/* //space-y-6 */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Customer</h2>
        <div className="space-y-4">
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Name"
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
          />
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            type="email"
            value={newCustomer.email}
            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
          />
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Phone"
            type="tel"
            value={newCustomer.phone}
            onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
          />
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Address"
            value={newCustomer.address}
            onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
          />
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleAddCustomer}
          >
            Add Customer
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Customer List</h2>
        {customers.map((customer) => (
          <div key={customer.id} className="mb-4 p-4 border border-gray-200 rounded-md">
            <h3 className="font-bold">{customer.name}</h3>
            <p>Email: {customer.email}</p>
            <p>Phone: {customer.phone}</p>
            <p>Address: {customer.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;