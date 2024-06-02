import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Backgroundimage from '../components/Backgroundimage';
import toast from 'react-hot-toast';

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  async function submit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/signup", {
        email,
        password
      });

      if (response.status === 201) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user._id);
        navigate("/home");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("User already exists");
        } else {
          console.error('Error during signup:', error.response.data);
          alert("An error occurred during signup. Please try again.");
        }
      } else {
        console.error('Error during signup:', error);
        alert("An error occurred during signup. Please try again.");
      }
    }
  }

  return (
    <div>
      <Backgroundimage className="relative" />
      <h1 className='absolute top-32 left-[50%] transform -translate-x-1/2 text-5xl text-white font-extrabold'>Welcome</h1>
      <div className='absolute top-1/2 left-[50%] transform -translate-x-1/2 -translate-y-1/2 mt-4 bg-gray-800 w-80 h-60 rounded-2xl drop-shadow-xl'>
        <form className='grid gap-4 text-center justify-center'>
          <input
            type='email'
            placeholder='name@email.com'
            name='email'
            onChange={(e) => setEmail(e.target.value)}
            className='rounded-md p-2 text-gray-900 bg-gray-100 focus:outline-none mt-7  w-56'
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className='rounded-md p-2 text-gray-900 bg-gray-100 focus:outline-none w-56'
          />
          <button className='bg-red-600 text-white rounded-md p-2 hover:bg-red-700 transition font-medium w-56' onClick={submit}>Continue</button>
          <p className='text-white'>Have an account? <a className='text-red-600 font-medium hover:underline transition' href='/login'>Login</a></p>
        </form>
      </div>
    </div>
  );
}
