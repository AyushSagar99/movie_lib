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

      const response = await fetch(`https://www.omdbapi.com/?s=${value}&plot=full&apikey=${import.meta.env.VITE_OMDB_API_KEY}`);
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
      <div className='bg-gray-900 h-full  text-white'>
        <div className='flex justify-center'>
          <h1 className="text-4xl font-bold mt-2">Discover Movies</h1>
          <input
            type="search"
            name="library"
            placeholder='Search by Movie Title'
            value={search}
            onChange={(e) => handleChange(e.target.value)}
            className='bg-gray-600 rounded-md m-2 p-1 outline-none ml-4 mt-4 '
          />
        </div>

        {error && <p className="text-red-500 text-center mt-4 h-screen">{error}</p>}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 mx-4'>
          {movies.map((movie) => (
            <div key={movie.imdbID} className='bg-gray-700 rounded-md overflow-hidden'>
              <img src={movie.Poster} alt={movie.Title} className='w-full h-64 object-cover' />
              <div className='p-4'>
                <h2 className='text-xl font-semibold mb-2'>{movie.Title}</h2>
                <p className='text-sm text-gray-400'>{movie.Year}</p>
                <p className='text-sm text-gray-400'>{movie.Type}</p>
                <Library title={movie.Title} year={movie.Year} image={movie.Poster} type={movie.Type}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}