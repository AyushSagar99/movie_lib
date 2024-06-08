import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { getTokenFromLocalStorage, removeTokenFromLocalStorage } from '../utils/auth';
import Library from '../components/library';
import toast from 'react-hot-toast';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hasMovies, setHasMovies] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = getTokenFromLocalStorage();
        const response = await axios.get('http://localhost:8000/movies', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setHasMovies(response.data.movies.length > 0);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const goToList = () => {
    navigate("/mylist");
    
  };

  const goToHome = () => {
    navigate("/home");
  };

  const handleLogout = () => {
    removeTokenFromLocalStorage();
    navigate("/signin");
    toast.success("Logged Out")
  };

  return (
    <div className='bg-gray-800 h-14 sticky flex justify-between'>
      <div className='text-white p-3 font-bold text-3xl cursor-pointer' onClick={goToHome}>
        Movie Catalogue
      </div>
      <div className='flex items-center'>
        {location.pathname !== '/mylist' && hasMovies && (
          <button onClick={goToList} className='bg-blue-700 h-10 p-1 m-2 rounded-lg font-medium hover:scale-110 transition'>
            Get List
          </button>
        )}
        <button onClick={handleLogout} className='bg-red-700 h-10 p-1 m-2 rounded-lg font-medium transition border-2 border-red-600  hover:bg-white hover:border-red-600 hover:text-red-600'>
          Logout
        </button>
      </div>
    </div>
  );
}
