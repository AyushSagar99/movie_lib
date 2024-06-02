import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { getTokenFromLocalStorage, removeTokenFromLocalStorage } from '../utils/auth';
import Library from '../components/library';

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

    navigate("/login");
  };

  return (
    <div className='bg-gray-800 h-14 sticky flex justify-between'>
      <div className='text-white p-3 font-bold text-3xl cursor-pointer' onClick={goToHome}>
        Movie Catalogue
      </div>
      <div className='flex items-center'>
        {location.pathname !== '/mylist' && hasMovies && (
          <button onClick={goToList} className='bg-blue-700 h-10 p-1 m-2 rounded-lg hover:scale-110 transition'>
            Get List
          </button>
        )}
        <button onClick={handleLogout} className='bg-red-700 h-10 p-1 m-2 rounded-lg hover:scale-110 transition'>
          Logout
        </button>
      </div>
    </div>
  );
}
