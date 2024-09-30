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
      <Card>
        <CardHeader>
          <CardTitle>Add New Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <select
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
              value={newPayment.jobId}
              onChange={(e) => setNewPayment({ ...newPayment, jobId: e.target.value })}
            >
              <option value="">Select a Job</option>
              {jobs.filter(job => job.customerId === newPayment.customerId).map((job) => (
                <option key={job.id} value={job.id}>
                  {job.description}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Amount"
              value={newPayment.amount}
              onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
            />
            <input
              type="date"
              value={newPayment.date}
              onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
            />
            <input
              placeholder="Payment Method"
              value={newPayment.paymentMethod}
              onChange={(e) => setNewPayment({ ...newPayment, paymentMethod: e.target.value })}
            />
            <button onClick={handleAddPayment}>Add Payment</button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment List</CardTitle>
        </CardHeader>
        <CardContent>
          {payments.map((payment) => (
            <div key={payment.id} className="mb-4 p-4 border rounded">
              <p>Customer: {customers.find(c => c.id === payment.customerId)?.name}</p>
              <p>Job: {jobs.find(j => j.id === payment.jobId)?.description}</p>
              <p>Amount: ${payment.amount}</p>
              <p>Date: {payment.date}</p>
              <p>Payment Method: {payment.paymentMethod}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;