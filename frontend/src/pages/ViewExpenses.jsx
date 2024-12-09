
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('date');
  const [order, setOrder] = useState('desc');
  const [error, setError] = useState('');
  const [file, setFile] = useState(null); 

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {throw new Error('No token found. Please log in again.');}
      const response = await axios.get('http://localhost:5000/api/expenses', {
        headers: {Authorization: `Bearer ${token}`},
        params: {page,limit, sortBy, order, search } 
      });

      setExpenses(response.data.expenses);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setError('Unable to fetch expenses. Please try again later.');
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [page, limit, sortBy, order, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);  
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setOrder('asc');
    }
  };

  const handlePagination = (newPage) => {
    setPage(newPage);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCSVUpload = async () => {
    const formData = new FormData();
    formData.append('csv', file);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:5000/api/expenses/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('CSV uploaded successfully');
      fetchExpenses(); 
    } catch (error) {
      console.error('Error uploading CSV:', error);
      alert('Error uploading CSV');
    }
  };

  const handleDelete = async (expenseId) => {
    const token = localStorage.getItem('token');
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await axios.delete(`http://localhost:5000/api/expenses/${expenseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchExpenses(); 
      } catch (error) {
        console.error('Error deleting expense:', error);
        alert('Error deleting expense');
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
              <li className="breadcrumb-item" aria-current="page">View Expenses</li>
            </ul>
            <div className="page-header-title">
              <h2 className="mb-0">View Expenses</h2>
            </div>
          </div>
        </div>

        {/* Table and Search Section */}
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12">
            <div className="card">
              <div className="card-header">
                <h5>Expense List</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive dt-responsive">
                  <div className='grid grid-cols-12 gap-3'>
                    <div className="col-span-12 lg:col-span-6">
                      <div className="dt-search flex gap-4">
                        <label htmlFor="dt-search">Search:</label>
                        <input type="search" className="form-control form-control-md" value={search} onChange={handleSearchChange}
                          placeholder="Search expenses"/>
                      </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <div className="flex flex-wrap justify-end gap-4 items-center">
                      <div className=".w-3\/4">
                      <input type="file" accept=".csv" onChange={handleFileChange} className="form-control" />
                    </div>
                    <div className="col-md-auto">
                      <button onClick={handleCSVUpload} className="btn btn-primary" disabled={!file} > Upload CSV </button>
                    </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2 justify-content-md-center">
                    <div className="col-12">
                      <table className="table table-striped table-bordered nowrap">
                        <thead>
                          <tr>
                            <th onClick={() => handleSort('description')} style={{ cursor: 'pointer' }}>
                              Description {sortBy === 'description' && (order === 'asc' ? '↓' : '↑')}
                            </th>
                            <th onClick={() => handleSort('category')} style={{ cursor: 'pointer' }}>
                              Category {sortBy === 'category' && (order === 'asc' ? '↓' : '↑')}
                            </th>
                            <th onClick={() => handleSort('amount')} style={{ cursor: 'pointer' }}>
                              Amount {sortBy === 'amount' && (order === 'asc' ? '↓' : '↑')}
                            </th>
                            <th onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
                              Date {sortBy === 'date' && (order === 'asc' ? '↓' : '↑')}
                            </th>
                            <th >Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {expenses && expenses.length > 0 ? (
                            expenses.map((expense) => (
                              <tr key={expense._id}>
                                <td>{expense.description}</td>
                                <td>{expense.category}</td>
                                <td>₹{expense.amount}</td>
                                <td>{new Date(expense.date).toLocaleDateString()}</td>
                                <td className="">
                                  <Link to={`/update-expense/${expense._id}`} className="w-8 h-8 rounded-xl inline-flex items-center justify-center btn-link-secondary">
                                    <i className="ti ti-edit text-xl leading-none" /> 
                                  </Link>
                                  <a href="#" onClick={() => handleDelete(expense._id)} className="w-8 h-8 rounded-xl inline-flex items-center justify-center btn-link-secondary">
                                    <i className="ti ti-trash text-xl leading-none" />
                                  </a>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4" className="text-center">
                                No expenses found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Pagination Section */}
                  <div className="row mt-2 justify-content-between">
                    <div className="col-md-auto me-auto">
                      <div className="dt-info" aria-live="polite">
                        Showing {((page - 1) * limit) + 1} to{' '}
                        {Math.min(page * limit, expenses.length)} of {expenses.length} entries
                      </div>
                    </div>
                    <div className="col-md-auto ms-auto">
                      <div className="dt-paging paging_full_numbers">
                        <ul className="pagination">
                          {page > 1 && (
                            <li className="page-item" onClick={() => handlePagination(page - 1)}>
                              <a className="page-link" href="#!">‹</a>
                            </li>
                          )}
                          {Array.from({ length: totalPages }, (_, i) => (
                            <li
                              key={i + 1}
                              className={`page-item ${page === i + 1 ? 'active' : ''}`}
                              onClick={() => handlePagination(i + 1)}
                            >
                              <a className="page-link" href="#!">
                                {i + 1}
                              </a>
                            </li>
                          ))}
                          {page < totalPages && (
                            <li className="page-item" onClick={() => handlePagination(page + 1)}>
                              <a className="page-link" href="#!">›</a>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ViewExpenses;

