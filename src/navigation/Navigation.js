import React from 'react';
import NavigationSearch from './NavigationSearch';
import UserPanel from './UserPanel';

const Navigation = ({ setOpenNavigation }) => {
    return (
        <nav className="navigation">
            <div className="navigation__container">
                <div className="navigation__title">MemTasty</div>
                <div className="navigation__tools"></div>
                <NavigationSearch />
                <UserPanel setOpenNavigation={setOpenNavigation} />
            </div>
        </nav>
    );
};

export default Navigation;
