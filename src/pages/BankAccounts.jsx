import React, { useState, useEffect } from 'react';
import { getBankAccounts, addBankTransaction } from '../services/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const BankAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    accountId: '',
    amount: '',
    type: 'deposit',
    date: '',
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const fetchedAccounts = await getBankAccounts();
    setAccounts(fetchedAccounts);
  };

  const handleAddTransaction = async () => {
    await addBankTransaction(newTransaction);
    setNewTransaction({
      accountId: '',
      amount: '',
      type: 'deposit',
      date: '',
    });
    fetchAccounts();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-yellow-900 mb-6">Bank Accounts</h1>

      <Card className="bg-white shadow-lg border border-yellow-100">
        <CardHeader>
          <CardTitle className="text-yellow-900">Add Bank Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <select
              className="w-full p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={newTransaction.accountId}
              onChange={(e) => setNewTransaction({ ...newTransaction, accountId: e.target.value })}
            >
              <option value="">Select an Account</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Amount"
              className="w-full p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
            />
            <select
              className="w-full p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={newTransaction.type}
              onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
            >
              <option value="deposit">Deposit</option>
              <option value="withdrawal">Withdrawal</option>
            </select>
            <input
              type="date"
              className="w-full p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={newTransaction.date}
              onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
            />
            <button
              onClick={handleAddTransaction}
              className="w-full bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition-colors"
            >
              Add Transaction
            </button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg border border-yellow-100">
        <CardHeader>
          <CardTitle className="text-yellow-900">Bank Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {accounts.map((account) => (
              <Card key={account.id} className="bg-yellow-50 border-yellow-100">
                <CardContent className="space-y-2">
                  <h3 className="text-lg font-semibold text-yellow-900">{account.name}</h3>
                  <p className="text-yellow-800">
                    <span className="font-semibold">Balance:</span> ${account.balance.toFixed(2)}
                  </p>
                  <div className="mt-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">Recent Transactions</h4>
                    <div className="space-y-2">
                      {account.transactions?.slice(0, 5).map((transaction, index) => (
                        <div key={index} className="text-yellow-700 text-sm">
                          {transaction.type === 'deposit' ? '+ ' : '- '}${transaction.amount} -{' '}
                          {transaction.date}
                        </div>
                      ))}
                    </div>
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

export default BankAccounts;