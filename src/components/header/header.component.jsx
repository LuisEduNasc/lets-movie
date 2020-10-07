import React from 'react';

import './header.style.scss';

const Header = () => {
    return (
        <div className='header'>
            <div className="container">
                <div className="logo-place">
                    <div className="logo"></div>
                    <div className="logotype">Lets movie</div>
                </div>
                <div className="search"></div>
            </div>
        </div>
    )
}

export default Header;