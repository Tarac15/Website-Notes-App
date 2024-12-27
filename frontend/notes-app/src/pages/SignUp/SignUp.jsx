import React, { useState } from 'react'
import Navbarv2 from '../../components/Navbar/Navbarv2'
import PasswordInput from '../../components/Input/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import writing from '../../assets/images/F8megJVbEAAMh5w.jpeg';
import axiosInstance from '../../utils/axiosInstance';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError('');
    // signup API
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      // handle successful register response 
      if (response.data && response.data.error) {
        setError(response.data.message)
        return
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      // handle register error 
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
            <h4 className="text-3xl font-semibold mb-7 text-blue-600">Sign Up</h4>

            <form onSubmit={handleSignUp}>
              <input
                type="text"
                placeholder='Enter your name'
                className='input-box focus:border-purple-500'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="text"
                placeholder='Enter your email'
                className='input-box focus:border-purple-500'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className='text-red-500 text-xs pb-2'>{error}</p>}

              <button type="submit" className="btn-primary bg-purple-500 hover:bg-purple-700">
                Create Account
              </button>

              <p className="text-sm text-center mt-4">
                Already have an account?{" "}
                <Link to="/login" className='font-medium text-purple-500 hover:underline'>
                  Login
                </Link>
              </p>
            </form>
          </div>
          {/* Image Section */}
          <div className='w-1/2 bg-blue-500 flex items-center justify-center'>
            <img
              src={writing}
              alt="Login Illustration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div >
    </>
  );
};

export default SignUp;

