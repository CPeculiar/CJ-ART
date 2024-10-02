import React, { useState, useEffect } from 'react';
import { getExpenses, addExpense, getJobs } from '../services/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [newExpense, setNewExpense] = useState({
    amount: '',
    purpose: '',
    date: '',
    jobId: '',
    category: 'Job Related',
  });

  useEffect(() => {
    fetchExpenses();
    fetchJobs();
  }, []);

  const fetchExpenses = async () => {
    const fetchedExpenses = await getExpenses();
    setExpenses(fetchedExpenses);
  };

  const fetchJobs = async () => {
    const fetchedJobs = await getJobs();
    setJobs(fetchedJobs);
  };

  const handleAddExpense = async () => {
    await addExpense(newExpense);
    setNewExpense({
      amount: '',
      purpose: '',
      date: '',
      jobId: '',
      category: 'Job Related',
    });
    fetchExpenses();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-yellow-900 mb-6">Expenses</h1>

      <Card className="bg-white shadow-lg border border-yellow-100">
        <CardHeader>
          <CardTitle className="text-yellow-900">Add New Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Amount"
              className="w-full p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            />
            <input
              type="text"
              placeholder="Purpose"
              className="w-full p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={newExpense.purpose}
              onChange={(e) => setNewExpense({ ...newExpense, purpose: e.target.value })}
            />
            <input
              type="date"
              className="w-full p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={newExpense.date}
              onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
            />
            <select
              className="w-full p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            >
              <option value="Job Related">Job Related</option>
              <option value="General">General</option>
            </select>
            {newExpense.category === 'Job Related' && (
              <select
                className="w-full p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={newExpense.jobId}
                onChange={(e) => setNewExpense({ ...newExpense, jobId: e.target.value })}
              >
                <option value="">Select a Job</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.customerName} - {job.description}
                  </option>
                ))}
              </select>
            )}
            <button
              onClick={handleAddExpense}
              className="w-full bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition-colors"
            >
              Add Expense
            </button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg border border-yellow-100">
        <CardHeader>
          <CardTitle className="text-yellow-900">Expense List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {expenses.map((expense, index) => (
              <Card key={index} className="bg-yellow-50 border-yellow-100">
                <CardContent className="space-y-2">
                  <p className="text-yellow-800">
                    <span className="font-semibold">Amount:</span> ${expense.amount}
                  </p>
                  <p className="text-yellow-800">
                    <span className="font-semibold">Purpose:</span> {expense.purpose}
                  </p>
                  <p className="text-yellow-800">
                    <span className="font-semibold">Date:</span> {expense.date}
                  </p>
                  <p className="text-yellow-800">
                    <span className="font-semibold">Category:</span> {expense.category}
                  </p>
                  {expense.category === 'Job Related' && (
                    <p className="text-yellow-800">
                      <span className="font-semibold">Job:</span>{' '}
                      {jobs.find(j => j.id === expense.jobId)?.description || 'N/A'}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Expenses;