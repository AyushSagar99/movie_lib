import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Backgroundimage from '../components/Backgroundimage';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function goToSignup() {
    navigate("/signup");
  }

  async function submit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/signin", {
        email,
        password
      });

      if (response.status === 200) {
        // Login successful, save the token and userId in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user._id);
        navigate("/home");
      }
       else {
        // Login failed
        toast.error("Invalid password");
      }
    }  catch (error) {
      if (error.response && error.response.status === 400) {
        if (error.response.data.error === "Invalid password") {
          toast.error("Invalid password");
        } else if (error.response.data.error === "User does not exist") {
          toast.error("User does not exist");
        }
      } else {
        // Handle other errors or network issues
        console.error('Error during login:', error);
        toast.error("An error occurred during login. Please try again.");
      }
    }
  }

  return (
    <div>
      <Backgroundimage className="relative" />
      <h1 className='absolute top-32 left-[50%] transform -translate-x-1/2 text-5xl text-white font-extrabold font-'>Welcome,Back</h1>
      <div className='absolute top-1/2 left-[50%] transform -translate-x-1/2 -translate-y-1/2'>
        <form className='grid gap-4 text-center'>
          <input
            type='email'
            placeholder='Email'
            name='email'
            onChange={(e) => setEmail(e.target.value)}
            className='rounded-md p-2 text-gray-900 bg-gray-100 focus:outline-none w-56'
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className='rounded-md p-2 text-gray-900 bg-gray-100 focus:outline-none'
          />
          <button className='bg-red-600 text-white rounded-md p-2 hover:bg-red-700 transition font-medium text-center' onClick={submit}>Login</button>
        </form>
      </div>
      <div className=''>
        <button className='absolute right-2 top-1 bg-red-600 text-white font-medium font-mono w-28 hover:scale-110 transition h-8 p-1 rounded-lg ' onClick={goToSignup}>Signup</button>
      </div>
    </div>
  );
}
