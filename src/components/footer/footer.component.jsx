import React from 'react';

import './footer.style.scss';

const Footer = ({ currentInfo, isMobile }) => {
    return (
        <div className='footer'>
            <div className="social">
                <div className="container">
                    <a className="instagram" href="https://www.instagram.com/imdb/" target="_blank"></a>
                    <a className="twitter" href="https://twitter.com/imdb" target="_blank"></a>
                </div>
            </div>

            {
                !isMobile ? <div className="resume">
                    {
                        currentInfo ? <div className="container">
                            <div className="vote-average">
                                <p className="title">Média de votos</p>
                                <p className="value">{currentInfo.vote_average}</p>
                            </div>
                            <div className="vote-count">
                                <p className="title">Contagem de votos</p>
                                <p className="value">{currentInfo.vote_count}</p>
                            </div>
                            <div className="popularity">
                                <p className="title">Popularidade</p>
                                <p className="value">{currentInfo.popularity}</p>
                            </div>
                        </div>
                        : null
                    }
                </div>
                : null
            }
        </div>
    )
}

export default Footer;