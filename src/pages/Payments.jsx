import React, { useState, useEffect } from 'react';
import { getPayments, addPayment, getJobs, getCustomers } from '../services/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [newPayment, setNewPayment] = useState({
    customerId: '',
    jobId: '',
    amount: '',
    date: '',
    paymentMethod: '',
  });

  useEffect(() => {
    fetchPayments();
    fetchJobs();
    fetchCustomers();
  }, []);

  const fetchPayments = async () => {
    const fetchedPayments = await getPayments();
    setPayments(fetchedPayments);
  };

  const fetchJobs = async () => {
    const fetchedJobs = await getJobs();
    setJobs(fetchedJobs);
  };

  const fetchCustomers = async () => {
    const fetchedCustomers = await getCustomers();
    setCustomers(fetchedCustomers);
  };

  const handleAddPayment = async () => {
    await addPayment(newPayment);
    setNewPayment({ customerId: '', jobId: '', amount: '', date: '', paymentMethod: '' });
    fetchPayments();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-yellow-900 mb-6">Payments</h1>

      <Card className="bg-white shadow-lg border border-yellow-100">
        <CardHeader>
          <CardTitle className="text-yellow-900">Add New Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <select
              className="w-full p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={newPayment.customerId}
              onChange={(e) => setNewPayment({ ...newPayment, customerId: e.target.value })}
            >
              <option value="">Select a Customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <select
              className="w-full p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={newPayment.jobId}
              onChange={(e) => setNewPayment({ ...newPayment, jobId: e.target.value })}
            >
              <option value="">Select a Job</option>
              {jobs
                .filter(job => job.customerId === newPayment.customerId)
                .map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.description}
                  </option>
                ))}
            </select>
            <input
              type="number"
              placeholder="Amount"
              className="w-full p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={newPayment.amount}
              onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
            />
            <input
              type="date"
              className="w-full p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={newPayment.date}
              onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
            />
            <select
              className="w-full p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={newPayment.paymentMethod}
              onChange={(e) => setNewPayment({ ...newPayment, paymentMethod: e.target.value })}
            >
              <option value="">Select Payment Method</option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
            <button
              onClick={handleAddPayment}
              className="w-full bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition-colors"
            >
              Add Payment
            </button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg border border-yellow-100">
        <CardHeader>
          <CardTitle className="text-yellow-900">Payment List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {payments.map((payment, index) => (
              <Card key={index} className="bg-yellow-50 border-yellow-100">
                <CardContent className="space-y-2">
                  <p className="text-yellow-800">
                    <span className="font-semibold">Customer:</span>{' '}
                    {customers.find(c => c.id === payment.customerId)?.name}
                  </p>
                  <p className="text-yellow-800">
                    <span className="font-semibold">Job:</span>{' '}
                    {jobs.find(j => j.id === payment.jobId)?.description}
                  </p>
                  <p className="text-yellow-800">
                    <span className="font-semibold">Amount:</span> ${payment.amount}
                  </p>
                  <p className="text-yellow-800">
                    <span className="font-semibold">Date:</span> {payment.date}
                  </p>
                  <p className="text-yellow-800">
                    <span className="font-semibold">Payment Method:</span>{' '}
                    {payment.paymentMethod}
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

export default Payments;