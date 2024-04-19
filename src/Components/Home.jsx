import React, {useState, useEffect } from 'react'
import './Home.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { NavLink } from 'react-router-dom';
import MovieList from './MovieList';

const Home = () => {
    
    const [popularMovies, setPopularMovies] = useState([])

    useEffect(() =>  {
      fetch('https://api.themoviedb.org/3/movie/popular?api_key=2ced967a5c2aae7adc4ab8601a516368&language=en-US')
      .then(res => res.json())
      .then (data => setPopularMovies(data.results))
    
    }, [])
    
    return (
        <>
        <div className='poster z-0'>
            <Carousel
            showThumbs = {false}
            autoPlay = {true}
            transitionTime = {2}
            infiniteLoop = {true}
            showStatus = {false}
            >


            {
                popularMovies.map(movie => (
                    <NavLink style={{textDecoration: 'none', color:'white'}} to={`/movie/${movie.id}`} key={movie.id}>
                    <div className="posterImage" >
                        <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`}  />
                    </div>
                    <div className="posterImage__overlay">
                        <div className="posterImage__title">{movie ? movie.original_title: ''}</div>
                        <div className="posterImage_runtime">{movie? movie.release_date : ''} 
                        <span className="posterImage__rating">{movie ? movie.vote_average: ''}
                        <i className="fas fa-star" /> {''}
                        </span>
                        </div>
                        <div className="posterImage__description">{movie ? movie.overview: ''}</div>
                    </div>
                    </NavLink>
                ))
            }
            </Carousel>

            

            <MovieList />
            

        </div>
    </>
  )
}

export default Home