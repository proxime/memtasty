import React, { useState, useEffect } from 'react';
import RecomendSection from './Elements/RecomendSection';
import Routes from './Routes';

const Section = () => {
    const [isMobile, setIsMobile] = useState(
        window.matchMedia('(max-width: 1023px)').matches
    );

    useEffect(() => {
        const matchQuery = window.matchMedia('(max-width: 1023px)');

        const checkIfIsMobile = e => {
            if (e.matches) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        matchQuery.addListener(checkIfIsMobile);
    }, []);

    return (
        <div className="section">
            <Routes />
            {!isMobile && <RecomendSection />}
        </div>
    );
};

export default Section;
