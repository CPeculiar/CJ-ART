import React, { useState, useEffect } from 'react';
import { getDashboardData } from '../services/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'; // src/components/ui/Card.jsx @components/ui/card
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Sidebar from '../components/Sidebar';

  const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
 

    useEffect(() => {
      const fetchDashboardData = async () => {
        try {
          const data = await getDashboardData();
          setDashboardData(data);
        } catch (err) {
          console.error("Error fetching dashboard data:", err);
          console.error("Full error object:", err);
          setError("Failed to load dashboard data. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchDashboardData();
    }, []);
  
    const placeholderData = {
      totalRevenue: 0,
      totalExpenses: 0,
      netProfit: 0,
      revenueVsExpenses: Array.from({ length: 12 }, (_, i) => ({
        month: new Date(2024, i, 1).toLocaleString('default', { month: 'short' }),
        revenue: 0,
        expenses: 0
      }))
    };
  
    const renderContent = () => {
      const data = dashboardData || placeholderData;
  
      return (
        <div className="space-y-6">
        <h1 className="text-2xl font-bold text-yellow-900 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white shadow-lg border border-yellow-100">
            <CardHeader>
              <CardTitle className="text-yellow-900">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-600">
                ${dashboardData?.totalRevenue.toFixed(2) || '0.00'}
              </p>
            </CardContent>
          </Card>

         <Card className="bg-white shadow-lg border border-yellow-100">
            <CardHeader>
              <CardTitle className="text-yellow-900">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-600">
              ${data.totalExpenses.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border border-yellow-100">
            <CardHeader>
              <CardTitle className="text-yellow-900">Net Profit</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-600">
              ${data.netProfit.toFixed(2)}</p>
            </CardContent>
          </Card>
          </div>

          <Card className="mt-8 bg-white shadow-lg border border-yellow-100">
            <CardHeader>
            <CardTitle className="text-yellow-900">Revenue vs Expenses</CardTitle>
            </CardHeader>
            <CardContent>

             <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboardData?.revenueVsExpenses || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#FDF6B2" />
                <XAxis dataKey="month" stroke="#78350F" />
                <YAxis stroke="#78350F" />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#F59E0B" name="Revenue" />
                <Line type="monotone" dataKey="expenses" stroke="#78350F" name="Expenses" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
  
    return (
      <div className="dashboard">
        {loading && <div className="flex justify-center items-center h-full">Loading dashboard data...</div>}
        {error && <div className="text-red-500 p-4">{error}</div>}
        {renderContent()}
      </div>
    );
  };

export default Dashboard;