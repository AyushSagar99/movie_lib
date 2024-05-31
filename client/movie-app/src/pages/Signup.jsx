import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Backgroundimage from '../components/Backgroundimage';

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function goToLogin() {
    navigate("/login");
  }

  async function submit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/signup", {
        email,
        password
      });

      if (response.status === 201) {
        // Signup successful, save the token and userId in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user._id);
        navigate("/home");
      } else {
        // Signup failed
        alert("User already exists or internal server error occurred");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error during signup:', error);
      alert("An error occurred during signup. Please try again.");
    }
  }

  return (
    <div>
      <Backgroundimage className="relative" />
      <h1 className='absolute top-32 left-[50%] transform -translate-x-1/2 text-5xl text-white font-extrabold'>Welcome</h1>
      <div className='absolute top-1/2 left-[50%] transform -translate-x-1/2 -translate-y-1/2'>
        <form className='grid gap-4 text-center'>
          <input
            type='email'
            placeholder='Email'
            name='email'
            onChange={(e) => setEmail(e.target.value)}
            className='rounded-md p-2 text-gray-900 bg-gray-100 focus:outline-none  w-56'
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className='rounded-md p-2 text-gray-900 bg-gray-100 focus:outline-none'
          />
          <button className='bg-red-600 text-white rounded-md p-2 hover:bg-red-700 transition font-medium' onClick={submit}>Continue</button>
        </form>
      </div>
      <div className=''>
        <button className='absolute right-2 top-1 bg-red-600 text-white font-medium w-28 font-mono hover:scale-110 transition h-8 p-1 rounded-lg focus:scale-110 ' onClick={goToLogin}>LogIn</button>
      </div>
    </div>
  );
}
