import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateExpense = () => {
  const { id } = useParams(); // Get the expense ID from the URL params
  const navigate = useNavigate();

  // State to store form data
  const [expense, setExpense] = useState({
    description: '',
    category: '',
    amount: '',
    date: '',
    paymentMethod: 'cash', // Default value for payment method
  });

  // State to handle loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch the expense data when the component mounts
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/expenses/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExpense(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching expense data.');
        setLoading(false);
      }
    };

    fetchExpense();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.put(`http://localhost:5000/api/expenses/${id}`, expense, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/viewexpense'); // Redirect to View Expenses page after update
    } catch (error) {
      setError('Error updating expense.');
    }
  };
  if (loading) return <div>Loading...</div>;

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="page-header">
          <div className="page-block">
            <ul className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item"><a href="javascript: void(0)">Forms</a></li>
              <li className="breadcrumb-item" aria-current="page">Update Expense</li>
            </ul>
            <div className="page-header-title">
              <h2 className="mb-0">Update Expense</h2>
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
                  {error && <div className="alert alert-danger">{error}</div>}
                  
                  {/* Expense Name */}
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-6">
                      <div className="mb-3">
                        <label className="form-label">Expense Name:</label>
                        <input
                          type="text"
                          name="description"
                          className="form-control"
                          value={expense.description}
                          onChange={handleChange}
                          placeholder="Enter expense name"
                        />
                        <small className="form-text text-muted">Please enter the expense name</small>
                      </div>
                    </div>
                    {/* Amount */}
                    <div className="col-span-12 lg:col-span-6">
                      <div className="mb-3">
                        <label className="form-label">Amount:</label>
                        <input
                          type="number"
                          name="amount"
                          className="form-control"
                          value={expense.amount}
                          onChange={handleChange}
                          placeholder="Enter amount"
                        />
                        <small className="form-text text-muted">Please enter the amount</small>
                      </div>
                    </div>
                  </div>

                  {/* Description and Date */}
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-6">
                      <div className="mb-3">
                        <label className="form-label">Description:</label>
                        <textarea
                          name="description"
                          className="form-control"
                          value={expense.description}
                          onChange={handleChange}
                          placeholder="Enter description"
                        ></textarea>
                        <small className="form-text text-muted">Please provide a brief description of the expense</small>
                      </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <div className="mb-3">
                        <label className="form-label">Date:</label>
                        <input
                          type="date"
                          name="date"
                          className="form-control"
                          value={expense.date}
                          onChange={handleChange}
                        />
                        <small className="form-text text-muted">Please select the date of the expense</small>
                      </div>
                    </div>
                  </div>

                  {/* Category and Payment Method */}
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-6">
                      <div className="mb-3">
                        <label className="form-label">Category:</label>
                        <input
                          type="text"
                          name="category"
                          className="form-control"
                          value={expense.category}
                          onChange={handleChange}
                          placeholder="Enter category (e.g., Food, Travel)"
                        />
                        <small className="form-text text-muted">Please enter the category</small>
                      </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <div className="mb-3">
                        <label className="form-label">Payment Method:</label>
                        <select
                          name="paymentMethod"
                          className="form-control"
                          value={expense.paymentMethod}
                          onChange={handleChange}
                        >
                          <option value="cash">Cash</option>
                          <option value="credit">Credit</option>
                        </select>
                        <small className="form-text text-muted">Please select the payment method</small>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-4">
                    <button type="submit" className="btn btn-primary w-full">
                      Update Expense
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Main Content end */}
      </div>
    </div>
  );
};

export default UpdateExpense;
