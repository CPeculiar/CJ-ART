import React, { useState, useEffect } from 'react';
import { getCustomers, addCustomer } from '../services/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const Customers = () => {
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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-yellow-900 mb-6">Customers</h1>

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
              onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
            />
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

      <Card className="bg-white shadow-lg border border-yellow-100">
        <CardHeader>
          <CardTitle className="text-yellow-900">Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {customers.map((customer, index) => (
              <Card key={index} className="bg-yellow-50 border-yellow-100">
                <CardHeader>
                  <CardTitle className="text-lg text-yellow-900">{customer.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-yellow-800">
                    <p><span className="font-semibold">Email:</span> {customer.email}</p>
                    <p><span className="font-semibold">Phone:</span> {customer.phone}</p>
                    <p><span className="font-semibold">Address:</span> {customer.address}</p>
                  </div>
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