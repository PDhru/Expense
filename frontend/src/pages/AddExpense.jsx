import React, { useState } from 'react';
import axios from 'axios';

const AddExpense = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    const expenseData = {
      name,
      amount,
      description,
      date,
      category,
      paymentMethod,
    };
  
    try {
      // Get the JWT token from localStorage
      const token = localStorage.getItem('token');
  
      // Set up Axios with Authorization header
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,  // Include the token in the request
        },
      };
  
      // Send the POST request to add expense
      const response = await axios.post('http://localhost:5000/api/expenses', expenseData, config);
  
      if (response.data) {
        setSuccess('Expense added successfully!');
        // Reset form fields after submission
        setName('');
        setAmount('');
        setDescription('');
        setDate('');
        setCategory('');
        setPaymentMethod('cash');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Unauthorized: Please log in again.');
      } else {
        setError('Failed to add expense. Please try again.');
      }
    }
  };
  

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="page-header">
          <div className="page-block">
            <ul className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item"><a href="javascript: void(0)">Forms</a></li>
              <li className="breadcrumb-item" aria-current="page">Add Expense</li>
            </ul>
            <div className="page-header-title">
              <h2 className="mb-0">Add Expense</h2>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <div className="card">
              <div className="card-header">
                <h5>Expense Form</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-6">
                      <div className="mb-3">
                        <label className="form-label">Expense Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter expense name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <small className="form-text text-muted">Please enter the expense name</small>
                      </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <div className="mb-3">
                        <label className="form-label">Amount:</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                        <small className="form-text text-muted">Please enter the amount</small>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-6">
                      <div className="mb-3">
                        <label className="form-label">Description:</label>
                        <textarea
                          className="form-control"
                          placeholder="Enter description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <small className="form-text text-muted">Please provide a brief description of the expense</small>
                      </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <div className="mb-3">
                        <label className="form-label">Date:</label>
                        <input
                          type="date"
                          className="form-control"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                        <small className="form-text text-muted">Please select the date of the expense</small>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-6">
                      <div className="mb-3">
                        <label className="form-label">Category:</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter category (e.g., Food, Travel)"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        />
                        <small className="form-text text-muted">Please enter the category</small>
                      </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <div className="mb-3">
                        <label className="form-label">Payment Method:</label>
                        <select
                          className="form-control"
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                          <option value="cash">Cash</option>
                          <option value="credit">Credit</option>
                        </select>
                        <small className="form-text text-muted">Please select the payment method</small>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button type="submit" className="btn btn-primary w-full">
                      Add Expense
                    </button>
                  </div>
                </form>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                {success && <div className="alert alert-success mt-3">{success}</div>}
              </div>
            </div>
          </div>
        </div>
        {/* Main Content end */}
      </div>
    </div>
  );
};

export default AddExpense;
