import React from 'react';

const NavigationSearch = () => {
    return (
        <div className="navigation__search">
            <div className="navigation__search-btn">
                <i className="fas fa-times"></i>
            </div>
            <input
                className="navigation__search-input"
                type="text"
                name="search"
                placeholder="Wyszukaj"
            />
            <div className="navigation__search-btn">
                <i className="fas fa-search"></i>
            </div>
        </div>
    );
};

export default NavigationSearch;
