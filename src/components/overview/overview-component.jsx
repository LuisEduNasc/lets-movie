import React from 'react';

import './overview-style.scss';

const Overview = ({currentMovie, closeOverview}) => {
    return (
        <div className='overview-content'>
            <button onClick={() => closeOverview()}>Fechar</button>
            <div className="top-container">
                <div className="left-container">
                    <img src={`http://image.tmdb.org/t/p/w185${currentMovie.poster_path}`} alt={currentMovie.title}/>

                </div>
                <div className="right-container">
                    <div className="title">Título: <span className="bold">{currentMovie.title}</span></div>
                    <div className="release">Data Lançamento: <span className="bold">{currentMovie.release_date}</span></div>
                    <div className="vote">Média de votos: <span className="bold">{currentMovie.vote_average}</span></div>
                </div>
            </div>
            <div className="bottom-container">
                <p className="overview">Sinópse:</p>
                <p className="bold">{currentMovie.overview}</p>
            </div>
        </div>
    )
}

export default Overview;