import axios from 'axios';
import React from 'react';
import { getTokenFromLocalStorage } from '../utils/auth';
import toast from 'react-hot-toast';

export default function Library({ title, year, image }) {
  async function List(e) {
    e.preventDefault();

    const token = getTokenFromLocalStorage(); 
    const userId = localStorage.getItem('userId'); 

    try {
      await axios.post(
        "http://localhost:8000/add-movie",
        {
          title,
          year,
          image,
          userId 
        },
        {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        }
      )
      .then(res => {
        if (res.data === "success") {
          toast.success("Movie added to the list");
        } else {
          alert("Try again");
        }
      })
      .catch(e => {
        toast.error("Error adding movie");
        console.log(e);
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <button onClick={List} className='hover:scale-110 focus:scale-110 transition bg-green-600 text-black rounded-lg p-1 font-medium'>
      Add to list
    </button>
  );
}
