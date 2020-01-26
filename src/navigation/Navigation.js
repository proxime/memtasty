import React, { useState, useEffect, useRef } from 'react';
import NavigationSearch from './NavigationSearch';
import UserPanel from './UserPanel';
import NavigationTopBar from './NavigationTopBar';

const Navigation = ({ setOpenNavigation }) => {
    const [isHiddenNav, setIsHiddenNav] = useState(false);
    const navigationEl = useRef(null);

    useEffect(() => {
        let scrollY = 0;

        const navigationScroll = e => {
            if (scrollY > 100 && scrollY < window.scrollY) {
                setIsHiddenNav(true);
            } else {
                setIsHiddenNav(false);
            }
            scrollY = window.scrollY;
        };

        window.addEventListener('scroll', navigationScroll);

        return () => {
            window.removeEventListener('scroll', navigationScroll);
        };
    }, []);

    return (
        <nav
            className={`navigation ${isHiddenNav ? 'navigation-hidden' : ''}`}
            ref={navigationEl}
        >
            <NavigationTopBar />
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
