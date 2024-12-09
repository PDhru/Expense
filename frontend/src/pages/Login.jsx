import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const loginData = {
      email,
      password
    };

    try {
      // Send POST request to login the user
      const response = await axios.post('http://localhost:5000/api/auth/login', loginData);

      if (response.data) {
        // Store the JWT token (you can store it in localStorage, or context state)
        localStorage.setItem('token', response.data.token);

        // Navigate to the dashboard or any other protected route
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message); // Display error message from the server
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="auth-main relative">
      <div className="auth-wrapper v2 flex items-center w-full h-full min-h-screen">
        <div className="auth-sidecontent">
          <img
            src="../assets/images/authentication/img-auth-sideimg.jpg"
            alt="images"
            className="img-fluid h-screen hidden lg:block"
          />
        </div>
        <div className="auth-form flex items-center justify-center grow flex-col min-h-screen bg-cover relative p-6 bg-theme-cardbg dark:bg-themedark-cardbg">
          <div className="card sm:my-12 w-full max-w-[480px] border-none shadow-none">
            <div className="card-body sm:!p-10">
              <div className="text-center mb-5">
                <a href="#">
                  <img src="../assets/images/logo-dark.svg" alt="img" className="mx-auto" />
                </a>
              </div>
              <h4 className="text-center font-medium mb-4">Login with your email</h4>

              {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="floatingInput"
                    placeholder="Email Address"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="floatingInput1"
                    placeholder="Password"
                  />
                </div>
                <div className="flex mt-1 justify-between items-center flex-wrap">
                  <div className="form-check">
                    <input className="form-check-input input-primary" type="checkbox" id="customCheckc1" defaultChecked />
                    <label className="form-check-label text-muted" htmlFor="customCheckc1">
                      Remember me?
                    </label>
                  </div>
                  <h6 className="font-normal text-primary-500 mb-0">
                    <a href="/register">Forgot Password?</a>
                  </h6>
                </div>
                <div className="mt-4">
                  <button type="submit" className="btn btn-primary w-full">
                    Login
                  </button>
                </div>
              </form>

              <div className="flex justify-between items-end flex-wrap mt-4">
                <h6 className="f-w-500 mb-0">Don't have an Account?</h6>
                <a href="/register" className="text-primary-500">
                  Create Account
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
