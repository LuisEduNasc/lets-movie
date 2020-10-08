import React, { useState } from 'react';

import './header.style.scss';

const Header = ({ isMobile, searchFor }) => {
    return (
        <header className='header'>
            <div className="container">
                <div className="logo-place">
                    <div className="logo"></div>
                    {
                        !isMobile ? <div className="logotype">Let´s movie</div> : null
                    }
                </div>
                <div className="search-place">
                    <input className={`${isMobile ? 'shorter' : ''}`} type="text" placeholder="O que procura?" onChange={searchFor}/>
                    <div className="search"></div>
                </div>
            </div>
        </header>
    )
}

export default Header;