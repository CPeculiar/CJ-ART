// src/services/firestore.js
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc,
  updateDoc,
  query,
  where,
  Timestamp
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwrWbGUHOyMlgJQurSmbQjSOj5NX1Aacg",
    authDomain: "cj-art-software.firebaseapp.com",
    projectId: "cj-art-software",
    storageBucket: "cj-art-software.appspot.com",
    messagingSenderId: "645095877574",
    appId: "1:645095877574:web:5dfcee71f4bc11e24960c7",
    measurementId: "G-6G2040YFW1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Customers
export const addCustomer = (customer) => addDoc(collection(db, 'customers'), customer);
export const getCustomers = async () => {
  const querySnapshot = await getDocs(collection(db, 'customers'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Jobs
export const addJob = (job) => addDoc(collection(db, 'jobs'), job);
export const getJobs = async () => {
  const querySnapshot = await getDocs(collection(db, 'jobs'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
export const updateJobStatus = async (jobId, newStatus) => {
  const jobRef = doc(db, 'jobs', jobId);
  await updateDoc(jobRef, { status: newStatus });
};

// Payments
export const addPayment = (payment) => addDoc(collection(db, 'payments'), payment);
export const getPayments = async () => {
  const querySnapshot = await getDocs(collection(db, 'payments'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Expenses
export const addExpense = (expense) => addDoc(collection(db, 'expenses'), expense);
export const getExpenses = async () => {
  const querySnapshot = await getDocs(collection(db, 'expenses'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Bank Accounts
export const addBankAccount = (account) => addDoc(collection(db, 'bankAccounts'), account);
export const getBankAccounts = async () => {
  const querySnapshot = await getDocs(collection(db, 'bankAccounts'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
export const addBankTransaction = async (transaction) => {
  const accountRef = doc(db, 'bankAccounts', transaction.accountId);
  const accountDoc = await getDoc(accountRef);
  const currentBalance = accountDoc.data().balance;
  const newBalance = transaction.type === 'deposit' 
    ? currentBalance + parseFloat(transaction.amount) 
    : currentBalance - parseFloat(transaction.amount);
  
  await updateDoc(accountRef, { balance: newBalance });
  return addDoc(collection(db, 'bankTransactions'), transaction);
};

// Reports
export const getJobReport = async (jobId) => {
  const jobDoc = await getDoc(doc(db, 'jobs', jobId));
  const job = { id: jobDoc.id, ...jobDoc.data() };

  const paymentsQuery = query(collection(db, 'payments'), where('jobId', '==', jobId));
  const paymentsSnapshot = await getDocs(paymentsQuery);
  const payments = paymentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const expensesQuery = query(collection(db, 'expenses'), where('jobId', '==', jobId));
  const expensesSnapshot = await getDocs(expensesQuery);
  const expenses = expensesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const totalPayments = payments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  const profit = totalPayments - totalExpenses;

  return {
    job,
    payments,
    expenses,
    totalPayments,
    totalExpenses,
    profit
  };
};

export const getAllTransactionsReport = async (startDate, endDate) => {
  const paymentsQuery = query(
    collection(db, 'payments'),
    where('date', '>=', startDate),
    where('date', '<=', endDate)
  );
  const paymentsSnapshot = await getDocs(paymentsQuery);
  const payments = paymentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const expensesQuery = query(
    collection(db, 'expenses'),
    where('date', '>=', startDate),
    where('date', '<=', endDate)
  );
  const expensesSnapshot = await getDocs(expensesQuery);
  const expenses = expensesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const totalIncome = payments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  const netProfit = totalIncome - totalExpenses;

  return {
    payments,
    expenses,
    totalIncome,
    totalExpenses,
    netProfit
  };
};

// New function for dashboard data
export const getDashboardData = async () => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const startOfYearTimestamp = Timestamp.fromDate(startOfYear);

  // Fetch all payments and expenses for the current year
  const paymentsQuery = query(
    collection(db, 'payments'),
    where('date', '>=', startOfYearTimestamp)
  );
  const expensesQuery = query(
    collection(db, 'expenses'),
    where('date', '>=', startOfYearTimestamp)
  );

  const [paymentsSnapshot, expensesSnapshot] = await Promise.all([
    getDocs(paymentsQuery),
    getDocs(expensesQuery)
  ]);

  const payments = paymentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const expenses = expensesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const totalRevenue = payments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  const netProfit = totalRevenue - totalExpenses;

  // Calculate revenue vs expenses per month
  const revenueVsExpenses = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(now.getFullYear(), i, 1).toLocaleString('default', { month: 'short' });
    const monthRevenue = payments
      .filter(p => new Date(p.date.toDate()).getMonth() === i)
      .reduce((sum, p) => sum + parseFloat(p.amount), 0);
    const monthExpenses = expenses
      .filter(e => new Date(e.date.toDate()).getMonth() === i)
      .reduce((sum, e) => sum + parseFloat(e.amount), 0);
    return { month, revenue: monthRevenue, expenses: monthExpenses };
  });

  return {
    totalRevenue,
    totalExpenses,
    netProfit,
    revenueVsExpenses
  };
};


// import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
// import { db } from './firebase';

// export const addTransaction = (transaction) => addDoc(collection(db, 'transactions'), transaction);
// export const getTransactions = async () => {
//   const querySnapshot = await getDocs(collection(db, 'transactions'));
//   return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// };