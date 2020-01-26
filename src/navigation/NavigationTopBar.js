import React from 'react';

const NavigationTopBar = () => {
    return (
        <div className="navigation-top-bar">
            <div className="navigation-top-bar__categories">
                <a href="#!" className="navigation-top-bar__item">
                    Strona Główna
                </a>
                <a href="#!" className="navigation-top-bar__item">
                    Poczekalnia
                </a>
                <a href="#!" className="navigation-top-bar__item">
                    Losowe
                </a>
            </div>
        </div>
    );
};

export default NavigationTopBar;
