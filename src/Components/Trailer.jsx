import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Trailer.css';


const Trailer = () => {
  const [currentMovieDetail, setMovie] = useState();
  const [trailerId, setTrailerId] = useState();

  const { id } = useParams();

  useEffect(() => {
    
    getData();
    window.scrollTo(0, 0);
  }, [id]);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=2ced967a5c2aae7adc4ab8601a516368&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        getTrailerId(data.id);
      });
  };

  const getTrailerId = (movieId) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=2ced967a5c2aae7adc4ab8601a516368`
    )
      .then((res) => res.json())
      .then((data) => {
        const trailers = data.results.filter(
          (video) => video.site === 'YouTube' && video.type === 'Trailer'
        );
        if (trailers.length > 0) {
          setTrailerId(trailers[0].key);
        }
      });
  };

  return (
    <div className="container p-20">
    {/* Render the movie details */}
    {currentMovieDetail && (
      <div className="movie-details">
        <h2>{currentMovieDetail.title}</h2>
        {/* Render the video component with the retrieved trailerId */}
        {trailerId && (
          <div className="video-container">
            <iframe
              width="560px"
              height="315px"
              src={`https://www.youtube.com/embed/${trailerId}`}
              title="Trailer"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}
        {/* Render other movie details */}
      </div>
    )}
  </div>

  );
};

export default Trailer;
