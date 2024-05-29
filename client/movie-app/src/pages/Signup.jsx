import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import Backgroundimage from '../components/Backgroundimage'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  function goToLogin() {
    navigate("/login");
    
  }

  async function submit(e){
    e.preventDefault();
    try{
      await axios.post("http://localhost:8000/signup",{
        email,password
      })
      .then(res=>{
        if(res.data=="exist"){
            alert("User already exist")
        }
        else if(res.data.message=="Signed In"){
            navigate("/home")
        }
    })
    .catch(e=>{
        alert("wrong details")
        console.log(e)
    })
    
    }
    catch(e){
      console.log(e);
  }
  }
  return <>
    <div>
    <Backgroundimage className="relative" />

    <h1 className='absolute top-32 left-[450px] text-8xl text-red-600 font-extrabold'>Welcome</h1>
    
  
    <div className='absolute top-72  left-[550px] '>
      <form className='grid gap-2 text-center justify-center items-center'>
        <input type='email' placeholder='Email' name='email' onChange={(e)=>setEmail(e.target.value)} className='rounded-lg p-1  text-white bg-gray-600 focus:bg-gray-900 transition'/>
        <input type="password" placeholder="password" name="password" onChange={(e)=>setPassword(e.target.value)} className='rounded-lg p-1  text-white bg-gray-600 focus:bg-gray-900 transition'/>
        <button className='bg-red-600 rounded-lg p-1 hover:scale-110 transition font-medium' onClick={submit}>Continue</button>
      </form>
      
    </div>
    <div>
      <button className='absolute right-0 top-0 bg-white' onClick={goToLogin} >LogIn</button>
    </div>
    </div>
    </>
  
}
