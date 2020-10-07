import React, { useEffect } from 'react';
import Slider from 'react-slick';

import './wrapper.style.scss';

const Wrapper = ({allProp, movieList}) => {
    const settings = {
        dots: false,
        infinite: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        beforeChange: function(currentSlide, nextSlide) {
          console.log("before change", currentSlide, nextSlide);
        },
        afterChange: function(currentSlide) {
          console.log("after change", currentSlide);
        }
    };

    const settings2 = {
        dots: false,
        infinite: false,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        beforeChange: function(currentSlide, nextSlide) {
          console.log("before change", currentSlide, nextSlide);
        },
        afterChange: function(currentSlide) {
          console.log("after change", currentSlide);
        }
    };

    return (
        <div className='wrapper'>
            <Slider {...settings}>
                {
                    movieList.map(movie => {
                        let date = new Date(movie.release_date);
                        date.setDate(date.getDate() + 1);
                        date = date.toLocaleDateString();

                        return <div className="movie" key={movie.id}>
                                <div className="background-img">
                                    <img src={`https://source.unsplash.com/1280x820/?movies${movie.id}`} alt={movie.title}/>
                                </div>
                                <div className="center-container">
                                    <div className="left-side">
                                        <div className="movie-name">
                                            <h2>{movie.title}</h2>
                                        </div>
                                        <div className="release-date">
                                            <p>Data lançamento: <span>{date}</span></p>
                                        </div>
                                        <button className="know-more-button">Saber mais</button>
                                    </div>
                                </div>
                            </div>
                    })
                }
             </Slider> 
            <div className="right-side">
                <div className="movie-list-slick">
                    <Slider {...settings2}>
                        {
                            movieList.map(movie => {
                                return <div className="movie-slide" key={movie.id}>
                                    <img src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title}/>
                                </div>
                            })
                        }
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default Wrapper;