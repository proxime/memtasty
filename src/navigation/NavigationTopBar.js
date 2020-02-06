import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getRandomPost } from '../store/actions/posts';

const NavigationTopBar = ({ history }) => {
    const dispatch = useDispatch();

    const handleGetRandomPost = () => {
        dispatch(getRandomPost(history));
    };

    return (
        <div className="navigation-top-bar">
            <div className="navigation-top-bar__categories">
                <Link to="/" className="navigation-top-bar__item">
                    Strona Główna
                </Link>
                <Link to="/waiting" className="navigation-top-bar__item">
                    Poczekalnia
                </Link>
                <p
                    onClick={handleGetRandomPost}
                    className="navigation-top-bar__item"
                >
                    Losowe
                </p>
            </div>
        </div>
    );
};

export default withRouter(NavigationTopBar);
