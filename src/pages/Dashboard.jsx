import React, { useState, useEffect } from 'react';
import { getDashboardData } from '../services/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'; // src/components/ui/Card.jsx @components/ui/card
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${data.totalRevenue.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${data.totalExpenses.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Net Profit</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${data.netProfit.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Revenue vs Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.revenueVsExpenses}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue" />
                  <Line type="monotone" dataKey="expenses" stroke="#82ca9d" name="Expenses" />
                </LineChart>
              </ResponsiveContainer>
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