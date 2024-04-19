import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

const Cast = () => {
  const [castData, setCastData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=2ced967a5c2aae7adc4ab8601a516368`
    )
      .then((response) => response.json())
      .then((data) => {
        setCastData(data.cast);
      })
      .catch((error) => {
        console.log('Error fetching cast data:', error);
      });
  };

  return (
    <div className="w-full mx-auto justify-between">
      <h3 className="mb-4 text-3xl font-bold">Cast</h3>
      <div className="w-full mx-auto justify-between">
        <Swiper
          slidesPerView={1}
          spaceBetween={4}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 8,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 8,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 8,
            },
          }}
          className="w-4/5"
        >
          {castData.map((castMember) => (
            <SwiperSlide key={castMember.id} className="w-full">
              <div className="flex flex-col items-center pt-2 w-full bg-gray-900 rounded-lg shadow-md">
                <img
                  className="w-4/5 h-44 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
                  src={`https://image.tmdb.org/t/p/original${castMember.profile_path}`}
                  alt={castMember.name}
                />
                <div className="">
                  <div className="font-bold text-base">{castMember.name}</div>
                  <div className="text-sm text-gray-600">{castMember.character}</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Cast;
