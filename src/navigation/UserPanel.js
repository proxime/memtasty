import React from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

const UserPanel = ({ setOpenNavigation }) => {
    const auth = useSelector(state => state.auth);
    const user = auth.user;

    if (auth.loading) {
        return null;
    }

    return (
        <div className="navigation__user-panel">
            {user ? (
                <div className="navigation__authenticated">
                    <Link
                        className="navigation__avatar"
                        style={{
                            backgroundImage:
                                'url(https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557376304.186_U5U7u5_100x100.jpg)',
                        }}
                        to="/user"
                    />
                    <div className="navigation__create">
                        <i className="fas fa-plus"></i>
                    </div>
                </div>
            ) : (
                <>
                    <div
                        className="navigation__login"
                        onClick={() => setOpenNavigation('login')}
                    >
                        Zaloguj się
                    </div>
                    <div
                        className="navigation__register"
                        onClick={() => setOpenNavigation('register')}
                    >
                        Rejestracja
                    </div>
                </>
            )}
        </div>
    );
};

export default UserPanel;
