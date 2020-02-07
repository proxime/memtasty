import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../Spinner';
import { Route, Switch } from 'react-router-dom';
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
        <div className="section__list">
            {loading ? (
                <div className="user">
                    <Spinner size={200} />
                </div>
            ) : (
                <div className="user">
                    <Switch>
                        <Route path="/user/settings" component={Settings} />
                        <Route path="/user" component={UserProfile} />
                    </Switch>
                </div>
            )}
        </div>
    );
};

export default User;
