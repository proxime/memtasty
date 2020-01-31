import React from 'react';
import { Link } from 'react-router-dom';

const NavigationTopBar = () => {
    return (
        <div className="navigation-top-bar">
            <div className="navigation-top-bar__categories">
                <Link to="/" className="navigation-top-bar__item">
                    Strona Główna
                </Link>
                <Link to="/waiting" className="navigation-top-bar__item">
                    Poczekalnia
                </Link>
                <a href="#!" className="navigation-top-bar__item">
                    Losowe
                </a>
            </div>
        </div>
    );
};

export default NavigationTopBar;
