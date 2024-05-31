import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Backgroundimage from '../components/Backgroundimage';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      } else {
        // Login failed
        alert("Invalid credentials or internal server error occurred");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error during login:', error);
      alert("An error occurred during login. Please try again.");
    }
  }

  return (
    <div>
      <Backgroundimage className="relative" />
      <h1 className='absolute top-32 left-[450px] text-8xl text-red-600 font-extrabold'>Welcome Back</h1>
      <div className='absolute top-72 left-[550px]'>
        <form className='grid gap-2 text-center justify-center items-center'>
          <input
            type='email'
            placeholder='Email'
            name='email'
            onChange={(e) => setEmail(e.target.value)}
            className='rounded-lg p-1 text-white bg-gray-600 focus:bg-gray-900 transition'
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className='rounded-lg p-1 text-white bg-gray-600 focus:bg-gray-900 transition'
          />
          <button className='bg-red-600 rounded-lg p-1 hover:scale-110 transition font-medium' onClick={submit}>Login</button>
        </form>
      </div>
    </div>
  );
}
