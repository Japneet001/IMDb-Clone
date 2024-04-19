import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Movie.css';
import Trailer from './Trailer';
import Cast from './Cast';
import Reviews from './Reviews';

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, [id]);

  const getData = async() => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=2ced967a5c2aae7adc4ab8601a516368&language=en-US`
            )
            const data = await response.json();
            setMovie(data);
        } catch (error) {
            console.log('Error in MoviesDetails', error);
        }
  };

  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${currentMovieDetail?.backdrop_path}`}
          alt=""
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${currentMovieDetail?.poster_path}`}
              alt=""
            />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">{currentMovieDetail?.original_title}</div>
            <div className="movie__tagline">{currentMovieDetail?.tagline}</div>
            <div className="movie__rating">
              {currentMovieDetail?.vote_average} <i className="fas fa-star" />{' '}
              <span className="movie__voteCount">({currentMovieDetail?.vote_count} votes)</span>
            </div>
            <div className="movie__runtime">{currentMovieDetail?.runtime} mins</div>
            <div className="movie__releaseDate">Release date: {currentMovieDetail?.release_date}</div>
            <div className="movie__genres">
              {currentMovieDetail?.genres &&
                currentMovieDetail.genres.map((genre) => (
                  <span className="movie__genre" id={genre.id} key={genre.id}>
                    {genre.name}
                  </span>
                ))}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div>{currentMovieDetail?.overview}</div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Cast />
      </div>
      <div className="yt_trailer w-3/5 sm:w-4/5 sm:pb-5">
        <Trailer />
      </div>
      <div className="movie__links">
        <div className="movie__heading">Useful Links</div>
        {currentMovieDetail?.homepage && (
          <a href={currentMovieDetail.homepage} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <p>
              <span className="movie__homeButton movie__Button">
                Homepage <i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
        {currentMovieDetail?.imdb_id && (
          <a href={`https://www.imdb.com/title/${currentMovieDetail.imdb_id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <p>
              <span className="movie__imdbButton movie__Button">
                IMDb<i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
      </div>
      <div className="movie__heading">Production companies</div>
      <div className="movie__production">
        {currentMovieDetail?.production_companies &&
          currentMovieDetail.production_companies.map((company) => (
            <React.Fragment key={company.id}>
              {company.logo_path && (
                <span className="productionCompanyImage">
                  <img
                    className="movie__productionComapany"
                    src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                    alt={company.name}
                  />
                  <span>{company.name}</span>
                </span>
              )}
            </React.Fragment>
          ))}
      </div>
      <div className="w-full">
        <Reviews />
      </div>
    </div>
  );
};

export default Movie;
