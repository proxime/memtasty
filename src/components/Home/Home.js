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
            <div className="section__list">
                <Element
                    image="https://i1.jbzd.com.pl/contents/2020/01/normal/eOpZKiDjA0CvB4ExFuMW2y8JB9WmgiBj.jpg"
                    type="image"
                />
                <Element
                    image="https://i1.jbzd.com.pl/contents/2020/01/CMpn984QVUkRk1iOFqjSMqqI8Anp7u1T.mp4"
                    type="video"
                />
                <Element
                    image="https://img-9gag-fun.9cache.com/photo/aO0pqmM_700b.jpg"
                    type="image"
                />
                <Element
                    image="https://img-9gag-fun.9cache.com/photo/aO0pqmM_700b.jpg"
                    type="image"
                />
                <Element
                    image="https://img-9gag-fun.9cache.com/photo/aO0pqmM_700b.jpg"
                    type="image"
                />
                <Element
                    image="https://img-9gag-fun.9cache.com/photo/aO0pqmM_700b.jpg"
                    type="image"
                />
            </div>
            <RecomendSection />
        </div>
    );
};

export default Home;