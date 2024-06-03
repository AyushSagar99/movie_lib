import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Backgroundimage from '../components/Backgroundimage';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  async function submit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("movielib-production-4fcf.up.railway.app/signin", {
        email,
        password
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user._id);
        navigate("/home");
      }
       else {
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
        console.error('Error during login:', error);
        toast.error("An error occurred during login. Please try again.");
      }
    }
  }

  return (
    <div>
      <Backgroundimage className="relative" />
      <h1 className='absolute top-32 left-[50%] transform -translate-x-1/2 text-5xl text-white font-extrabold font-'>Welcome back!</h1>
      <div className='absolute top-1/2 left-[50%] transform -translate-x-1/2 -translate-y-1/2 mt-4 bg-gray-800 w-80 h-60 rounded-2xl drop-shadow-xl'>
        <form className='grid gap-4 text-center shadow-2xl justify-center '>
          <input
            type='email'
            placeholder='name@email.com'
            name='email'
            onChange={(e) => setEmail(e.target.value)}
            className='rounded-md p-2 text-gray-900 bg-gray-100 mt-7 focus:outline-none max-w-56'
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className='rounded-md p-2 text-gray-900 bg-gray-100 focus:outline-none  max-w-56'
          />
          <button className='bg-red-600 text-white rounded-md p-2 hover:bg-red-700 transition font-medium text-center max-w-56' onClick={submit}>Login</button>
          <p className='text-white'>Don't have an account? <a className='text-red-600 font-medium hover:underline transition' href='/signup'>Register</a></p>
        </form>
      </div>
    </div>
  );
}
