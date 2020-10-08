import React, { useEffect, useState, Fragment } from 'react';
import Slider from 'react-slick';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

import './wrapper.style.scss';

import Overview from '../overview/overview-component';

const Wrapper = ({isMobile, movieList, changeBottomDescription, getListOfMovies, otherProps}) => {
    const [ nav1, setNav1 ] = useState(null);
    const [ nav2, setNav2 ] = useState(null);
    const [ showOverview, setShowOverview ] = useState(false);
    const [ currentMovie, setCurrentMovie ] = useState(movieList[0]);
    const [ scroll, setScroll ] = useState(0);

    useBottomScrollListener(() => scrolledToBottom());

    useEffect(() => {
        window.addEventListener('scroll', function(e) {
            setScroll(window.scrollY);
        });
    },[])

    useEffect(() => {
        changeBottomDescription(currentMovie);
    },[currentMovie])

    const settings = {
        dots: false,
        infinite: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        beforeChange: function(currentSlide, nextSlide) {
            if (nextSlide == movieList.length -1 && otherProps.page < otherProps.total_pages) {
                getListOfMovies(otherProps.page + 1);
            }
        },
        afterChange: function(currentSlide) {
          setCurrentMovie(movieList[currentSlide])
        }
    };

    const settings2 = {
        dots: false,
        infinite: false,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        speed: 500,
        centerMode: true,
        centerPadding: "60px",
    };

    const closeOverview = () => {
        setShowOverview(false);
    }

    const handleMovieClickMobile = (idx) => {
        setCurrentMovie(movieList[idx])
        setShowOverview(true);
    }

    const scrolledToBottom = () => {
        isMobile && getListOfMovies(otherProps.page + 1);
    }

    const scrollToTop = () => {
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth'
        });
    }

    return (
        <div className='wrapper'>

            {
                !isMobile ? 
                <Fragment>
                    <Slider asNavFor={nav2} ref={slider => (setNav1(slider))} {...settings}>
                    {
                        movieList.map(movie => {
                            let date = new Date(movie.release_date);
                            date.setDate(date.getDate() + 1);
                            date = date.toLocaleDateString();

                            return <div className="movie" key={movie.id}>
                                    <div className="background-img">
                                        <img src={`https://source.unsplash.com/1280x820/?movie-studio${movie.id}`} alt={movie.title}/>
                                    </div>
                                    <div className="center-container">
                                        <div className="left-side">
                                            <div className="movie-name">
                                                <h2>{movie.title}</h2>
                                            </div>
                                            <div className="release-date">
                                                <p>Data lançamento: <span>{date}</span></p>
                                            </div>
                                            <button className="know-more-button" onClick={() => setShowOverview(true)}>Sinópse</button>
                                        </div>
                                    </div>
                                </div>
                        })
                    }
                    </Slider> 

                    <div className="right-side">
                        <div className="movie-list-slick">
                            <Slider asNavFor={nav1} ref={slider => (setNav2(slider))} {...settings2}>
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
                </Fragment>
                : 
                <Fragment>
                    {
                        movieList.map((movie, idx) => {
                            return <div key={movie.id} className="mobile-movie" data-idx-movie={idx} onClick={() => handleMovieClickMobile(idx)}>
                                <img src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title}/>
                                <h2>{movie.title}</h2>
                            </div>
                        })
                    }
                    {
                        scroll > 10 && <button id="go-to-top" onClick={() => scrollToTop()}></button>
                    }
                </Fragment>
            }

            {
                showOverview ? <Overview currentMovie={currentMovie} closeOverview={closeOverview}/> : null
            }
            {
                showOverview ? <div id="backdrop" onClick={closeOverview}></div> : null
            }
        </div>
    )
}

export default Wrapper;