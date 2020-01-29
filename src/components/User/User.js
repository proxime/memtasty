import React, { useEffect } from 'react';
import RecomendSection from '../Elements/RecomendSection';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../Spinner';
import { Route } from 'react-router-dom';
import UserProfile from './UserProfile';
import Settings from './Settings';

const User = () => {
    const auth = useSelector(state => state.auth);
    const { loading, user } = auth;

    useEffect(() => {
        return () => {
            window.scrollTo(0, 0);
        };
    }, []);

    if (!loading && !user) {
        return <Redirect to="/" />;
    }

    return (
        <div className="section">
            <div className="section__list">
                {loading ? (
                    <div className="user">
                        <Spinner size={200} />
                    </div>
                ) : (
                    <div className="user">
                        <Route path="/user" exact component={UserProfile} />
                        <Route path="/user/settings" component={Settings} />
                    </div>
                )}
            </div>
            <RecomendSection />
        </div>
    );
};

export default User;
