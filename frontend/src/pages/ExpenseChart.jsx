// src/components/ExpenseChart.js
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import axios from 'axios';

const ExpenseChart = () => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Token stored in localStorage
        },
      };
      const { data } = await axios.get('http://localhost:5000/api/chart', config);
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const chartData = expenses.map((expense) => ({
    date: new Date(expense.date).toLocaleDateString('en-US'),
    amount: expense.amount,
  }));

  return (
    <>

      <div className="pc-container">
        <div className="pc-content">
          <div className="page-header">
            <div className="page-block">
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item"><a href="javascript: void(0)">Forms</a></li>
                <li className="breadcrumb-item" aria-current="page">Expense Information</li>
              </ul>
              <div className="page-header-title">
                <h2 className="mb-0">Expense Information</h2>
              </div>
            </div>
          </div>
          {/* Main Content */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <div className="card">
                <div className="card-header">
                  <h5>Expense Chart</h5>
                </div>
                <div className="card-body">
                  <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer>
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Main Content end */}
        </div>
      </div>

    </>


  );
};

export default ExpenseChart;
