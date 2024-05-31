import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { getTokenFromLocalStorage } from '../utils/auth';
import Library from '../components/library';

export default function Home() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

 
  

  const fetchData = async (value) => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${value}&plot=full&apikey=3f8db1d7`);
      const json = await response.json();
      if (json.Response === "True") {
        const results = json.Search.filter((movie) => {
          return movie && movie.Title && movie.Title.toLowerCase().includes(value.toLowerCase());
        });
        setMovies(results);
        setError('');
      } else {
        setMovies([]);
        setError(json.Error);
      }
    } catch (err) {
      setMovies([]);
      setError('An error occurred while fetching data.');
    }
  };

  const handleChange = (value) => {
    setSearch(value);
    if (value) {
      fetchData(value);
    } else {
      setMovies([]);
    }
  };

  return (
    <>
      <Navbar />
      <div className='bg-gray-950 h-screen text-white'>
        <div className='flex justify-center items-center top-52'>
          Search Movies:
          <input
            type="search"
            name="library"
            placeholder='Movie Title'
            value={search}
            onChange={(e) => handleChange(e.target.value)}
            className='bg-gray-600 rounded-md m-2 p-1 outline-none'
          />
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <div className='flex flex-wrap justify-center mt-4 '>
          {movies.length > 0 && movies.map((movie) => (
            <div key={movie.imdbID} className='m-2 p-2 bg-gray-700 rounded-md '>
              <h2>{movie.Title}</h2>
              <Library title={movie.Title} year={movie.Year}/>
              <p>{movie.Year}</p>
              <p>{movie.Type}</p>
              <img src={movie.Poster} alt={movie.Title} className='w-32 h-48'/>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
