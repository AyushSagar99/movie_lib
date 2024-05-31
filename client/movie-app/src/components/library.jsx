import axios from 'axios';
import React from 'react';
import { getTokenFromLocalStorage } from '../utils/auth';

export default function Library({ title, year, image }) {
  async function List(e) {
    e.preventDefault();

    const token = getTokenFromLocalStorage(); // Assuming you have a utility function to get the token
    const userId = localStorage.getItem('userId'); // Get userId from localStorage

    try {
      await axios.post(
        "http://localhost:8000/add-movie",
        {
          title,
          year,
          image,
          userId // Include userId in the request body
        },
        {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the request headers
          }
        }
      )
      .then(res => {
        if (res.data === "success") {
          alert("Movie added to the list");
        } else {
          alert("Try again");
        }
      })
      .catch(e => {
        alert("Error adding movie");
        console.log(e);
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <button onClick={List} className='hover:scale-110 transition bg-green-600 text-black rounded-lg p-1 font-medium'>
      Add to list
    </button>
  );
}
