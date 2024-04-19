import React, { useEffect, useState } from 'react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
// import './Reviews.css';
import { useParams } from 'react-router-dom';

SwiperCore.use([Navigation, Pagination, Autoplay]);

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=2ced967a5c2aae7adc4ab8601a516368&language=en-US&page=1`
      );
      const data = await response.json();
      setReviews(data.results);
    } catch (error) {
      console.log('Error fetching reviews:', error);
    }
  };

  const trimContent = (content) => {
    if (content.length > 100) {
      return content.substr(0, 100) + '...';
    }
    return content;
  };

  return (
    <section className="text-center p-20 w-full mx-auto">
      <h3 className="text-lg mb-4">Customer's reviews</h3>
      <h1 className="text-2xl mb-8">What they say!</h1>
      <div className="mx-auto relative overflow-hidden h-auto sm:mx-auto">
        <Swiper
          slidesPerView={1}
          spaceBetween={4}
          navigation
          autoplay={{ delay: 5000 }}
          loop={true}
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
              slidesPerView: 2,
              spaceBetween: 32,
            },
            1280: {
              slidesPerView: 2,
              spaceBetween: 32,
            },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide
              key={review.id}
              className="p-8 border-[0.1rem solid rgba(0, 0, 0, 0.2)] rounded-sm relative bg-[#060606] flex flex-col items-center justify-center text-center h-48 shadow-[0 .5rem 1.5rem rgba(0,0,0,.1)]"
            >
              <i className="fas fa-quote-right absolute top-1 right-1 text-lg text-[#ccc]"></i>
              <div className="flex items-center justify-center gap-7 pb-6">
                <img
                  src={
                    review.author_details.avatar_path
                      ? `https://image.tmdb.org/t/p/original${review.author_details.avatar_path}`
                      : '/user.png'
                  }
                  alt="user"
                  className="absolute top-2 left-2 h-16 w-16 rounded-full object-cover"
                />
                <div className="user-info">
                  <h3 className="text-[#7388be] text-base pb-2">{review.author}</h3>
                  <div className="stars text-[#f5c518] text-base mt-auto">
                    {renderStars(review.author_details.rating)}
                  </div>
                </div>
              </div>
              <p className="text-base text-[#fff] mt-auto">{trimContent(review.content)}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

const renderStars = (rating) => {
  const fullStars = Math.floor(rating / 2);
  const halfStar = rating % 2 === 1;

  return (
    <>
      {[...Array(fullStars)].map((_, index) => (
        <i key={index} className="fas fa-star"></i>
      ))}
      {halfStar && <i className="fas fa-star-half-alt"></i>}
    </>
  );
};

export default Reviews;
