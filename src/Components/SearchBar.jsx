import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const searchResultsRef = useRef();

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
      setResults([]);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=2ced967a5c2aae7adc4ab8601a516368&query=${searchQuery}`
      );
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-950"
          placeholder="Search"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-r px-4 py-2 ml-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <i className="fa fa-search"></i>
        </button>
      </div>
      {results.length > 0 && (
        <div ref={searchResultsRef} className="absolute top-10 left-0 z-50 bg-transparent shadow rounded w-80 max-h-64 overflow-y-auto">
          {results.slice(0, 100).map((movie) => (
            <NavLink
              key={movie.id}
              to={`/movie/${movie.id}`}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <div className="flex items-center border-b border-gray-300 py-2 cursor-pointer">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="h-16 w-16 rounded-md object-cover m-1"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-md bg-gray-300"></div>
                )}
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-white">{movie.title}</h4>
                  <p className=" text-white">{movie.vote_average}</p>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
