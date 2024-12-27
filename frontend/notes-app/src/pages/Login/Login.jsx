import React, { useState } from 'react';
import Navbarv2 from '../../components/Navbar/Navbarv2';
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import writing from '../../assets/images/F8megJVbEAAMh5w.jpeg';
import axiosInstance from '../../utils/axiosInstance';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError('');

    // Login API
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      }); 

      // handle successful login response 
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      // handle login error 
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again"); 
      }
    }
  };

  return (
    <>
      <Navbarv2 />
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='flex bg-white border rounded shadow-lg'>
          {/* Form Section */}
          <div className='w-1/2 p-10'>
            <h4 className="text-3xl font-semibold mb-7 text-blue-600">Login</h4>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder='Enter your email'
                className='input-box focus:border-blue-500'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className='text-red-500 text-xs pb-2'>{error}</p>}
              <button type="submit" className="btn-primary bg-blue-500 hover:bg-blue-700">
                Login
              </button>
              <p className="text-sm text-center mt-4">
                Not registered yet?{" "}
                <Link to="/signUp" className='font-medium text-blue-500 hover:underline'>
                  Create an Account
                </Link>
              </p>
            </form>
          </div>
          {/* Image Section */}
          <div className='w-1/2 bg-blue-500 flex items-center justify-center'>
            <img
              src={writing} // Replace with your image URL
              alt="Login Illustration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
