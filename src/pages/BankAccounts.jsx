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
      <Card>
        <CardHeader>
          <CardTitle>Add Bank Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <select
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
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
            />
            <select
              value={newTransaction.type}
              onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
            >
              <option value="deposit">Deposit</option>
              <option value="withdrawal">Withdrawal</option>
            </select>
            <input
              type="date"
              value={newTransaction.date}
              onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
            />
            <button onClick={handleAddTransaction}>Add Transaction</button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bank Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          {accounts.map((account) => (
            <div key={account.id} className="mb-4 p-4 border rounded">
            </div>
        ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default BankAccounts;