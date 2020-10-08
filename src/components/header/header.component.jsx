import React from 'react';

import './header.style.scss';

const Header = ({ isMobile }) => {
    return (
        <div className='header'>
            <div className="container">
                <div className="logo-place">
                    <div className="logo"></div>
                    {
                        !isMobile ? <div className="logotype">Let´s movie</div> : null
                    }
                </div>
                <div className="search-place">
                    <input className={`${isMobile ? 'shorter' : ''}`} type="text" placeholder="O que procura?"/>
                    <div className="search"></div>
                </div>
            </div>
        </div>
    )
}

export default Header;