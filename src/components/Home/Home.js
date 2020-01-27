import React from 'react';
import Element from '../Element';
import RecomendedElement from '../RecomendedElement';

const Home = () => {
    return (
        <div className="section">
            <div className="section__list">
                <Element />
                <Element />
                <Element />
                <Element />
                <Element />
                <Element />
            </div>
            <div className="section__recommended">
                <RecomendedElement />
                <RecomendedElement />
                <RecomendedElement />
                <RecomendedElement />
                <RecomendedElement />
                <RecomendedElement />
            </div>
        </div>
    );
};

export default Home;
