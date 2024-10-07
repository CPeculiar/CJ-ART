import React, { useState, useEffect } from 'react';
import { getCustomers, addCustomer, searchCustomers } from '../services/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Search, Users } from 'lucide-react';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    customerId: '',
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const fetchedCustomers = await getCustomers();
    setCustomers(fetchedCustomers);
  };

  const generateCustomerId = (name) => {
    return name.trim().split(' ')[0];
  };

  const handleNameChange = (name) => {
    const customerId = generateCustomerId(name);
    setNewCustomer({ ...newCustomer, name, customerId });
  };

  const handleAddCustomer = async () => {
    await addCustomer(newCustomer);
    setNewCustomer({ name: '', email: '', phone: '', address: '', customerId: '' });
    fetchCustomers();
  };

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      const searchResults = await searchCustomers(searchTerm);
      setCustomers(searchResults);
    }
  };

  const toggleMode = () => {
    setIsSearchMode(!isSearchMode);
    if (isSearchMode) {
      fetchCustomers();
      setSearchTerm('');
    }
  };

  return (
    <div className="space-y-6 mt-[4rem] md:mt-10 relative">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-yellow-900">Customers</h1>
      <button
        onClick={toggleMode}
        className="flex items-center space-x-1 bg-yellow-600 text-white py-1 px-4 rounded hover:bg-yellow-700 transition-colors"
    >
        {isSearchMode ? <Users size={20} /> : <Search size={20} />}
        <span>{isSearchMode ? 'Show All Customers' : 'Search Customer'}</span>
      </button>
    </div>

    {isSearchMode ? (
      <Card className="bg-white shadow-lg border border-yellow-100 z-30 mt-4 md:mt-0">
        <CardHeader>
          <CardTitle className="text-yellow-900">Search Customer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Enter customer name"
              className="flex-grow p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition-colors"
              >
              Search
            </button>
          </div>
        </CardContent>
      </Card>
    ) : (
      <Card className="bg-white shadow-lg border border-yellow-100">
        <CardHeader>
          <CardTitle className="text-yellow-900">Add New Customer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={newCustomer.name}
              onChange={(e) => handleNameChange(e.target.value)}
            />
            {newCustomer.customerId && (
              <p className="text-yellow-800">Customer ID: {newCustomer.customerId}</p>
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={newCustomer.email}
              onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={newCustomer.phone}
              onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={newCustomer.address}
              onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
            />
            <button
              onClick={handleAddCustomer}
              className="w-full bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition-colors"
            >
              Add Customer
            </button>
          </div>
        </CardContent>
      </Card>
    )}

    <Card className="bg-white shadow-lg border border-yellow-100">
      <CardHeader>
        <CardTitle className="text-yellow-900">Customer List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {customers.map((customer) => (
            <Card key={customer.id} className="bg-yellow-50 border-yellow-100">
              <CardContent className="space-y-2">
                <h3 className="text-lg font-semibold text-yellow-900">{customer.name}</h3>
                <p className="text-yellow-800">
                  <span className="font-semibold">Customer ID:</span> {customer.customerId}
                </p>
                <p className="text-yellow-800">
                  <span className="font-semibold">Email:</span> {customer.email}
                </p>
                <p className="text-yellow-800">
                  <span className="font-semibold">Phone:</span> {customer.phone}
                </p>
                <p className="text-yellow-800">
                  <span className="font-semibold">Address:</span> {customer.address}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);
};

export default Customers;