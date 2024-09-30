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
      <Card>
        <CardHeader>
          <CardTitle>Add New Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            />
            <input
              placeholder="Purpose"
              value={newExpense.purpose}
              onChange={(e) => setNewExpense({ ...newExpense, purpose: e.target.value })}
            />
            <input
              type="date"
              value={newExpense.date}
              onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
            />
            <select
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            >
              <option value="Job Related">Job Related</option>
              <option value="General">General</option>
            </select>
            {newExpense.category === 'Job Related' && (
              <select
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
            <button onClick={handleAddExpense}>Add Expense</button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expense List</CardTitle>
        </CardHeader>
        <CardContent>
          {expenses.map((expense) => (
            <div key={expense.id} className="mb-4 p-4 border rounded">
              <p>Amount: ${expense.amount}</p>
              <p>Purpose: {expense.purpose}</p>
              <p>Date: {expense.date}</p>
              <p>Category: {expense.category}</p>
              {expense.category === 'Job Related' && <p>Job: {expense.jobId}</p>}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Expenses;