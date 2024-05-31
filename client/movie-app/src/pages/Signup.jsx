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
      <h1 className='absolute top-32 left-[450px] text-8xl text-red-600 font-extrabold'>Welcome</h1>
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
          <button className='bg-red-600 rounded-lg p-1 hover:scale-110 transition font-medium' onClick={submit}>Continue</button>
        </form>
      </div>
      <div>
        <button className='absolute right-0 top-0 bg-white' onClick={goToLogin}>LogIn</button>
      </div>
    </div>
  );
}
