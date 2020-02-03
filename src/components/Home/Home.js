import React, { useEffect } from 'react';
import Element from '../Elements/Element';
import RecomendSection from '../Elements/RecomendSection';

const Home = () => {
    useEffect(() => {
        return () => {
            window.scrollTo(0, 0);
        };
    }, []);

    return (
        <div className="section">
            <div className="section__list"></div>
            <RecomendSection />
        </div>
    );
};

export default Home;
