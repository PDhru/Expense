// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState('');

//   // Fetch all users and their expenses when the component mounts
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:5000/api/users', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUsers(response.data); // Store the users data in state
//       } catch (error) {
//         setError('Failed to fetch users');
//         console.error(error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Handle delete user request
//   const handleDeleteUser = async (userId) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         const token = localStorage.getItem('token');
//         await axios.delete(`http://localhost:5000/api/users/${userId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUsers(users.filter(user => user._id !== userId)); // Remove the user from the state
//         alert('User deleted successfully');
//       } catch (error) {
//         setError('Failed to delete user');
//         console.error(error);
//       }
//     }
//   };
//     return (
//         <div className="col-span-12">
//             <div className="card table-card">
//                 <div className="card-header flex items-center justify-between py-3">
//                     <h5 className="mb-0">Transaction History</h5><button className="btn btn-sm btn-link-primary">View
//                         All</button>
//                 </div>
//                 <div className="card-body">
//                     <div className="table-responsive">
//                         <table className="table table-hover" id="pc-dt-simple">
//                             <thead>
//                                 <tr>
//                                     <th>Name</th>
//                                     <th>Email</th>
//                                     <th>Role</th>
//                                     <th>Expenses</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {users.length > 0 ? (
//                                     users.map(user => (
//                                         <tr key={user._id}>
//                                             <td>{user.name}</td>
//                                             <td>{user.email}</td>
//                                             <td>{user.role}</td>
//                                             <td>
//                                                 {user.expenses && user.expenses.length > 0 ? (
//                                                     <ul>
//                                                         {user.expenses.map(expense => (
//                                                             <li key={expense._id}>
//                                                                 {expense.description} - ₹{expense.amount}
//                                                             </li>
//                                                         ))}
//                                                     </ul>
//                                                 ) : (
//                                                     <span>No expenses</span>
//                                                 )}
//                                             </td>
//                                             <td>
//                                                 <button
//                                                     className="btn btn-danger"
//                                                     onClick={() => handleDeleteUser(user._id)}
//                                                 >
//                                                     Delete
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="5" className="text-center">No users found</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default AdminUsers


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        setError('Failed to fetch users');
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(users.filter(user => user._id !== userId));
        alert('User deleted successfully');
      } catch (error) {
        setError('Failed to delete user');
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Admin Users</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
