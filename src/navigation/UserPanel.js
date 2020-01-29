import React from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../firebaseConfig';

import { Link } from 'react-router-dom';

const UserPanel = ({ setOpenNavigation }) => {
    const authState = useSelector(state => state.auth);
    const user = authState.user;

    if (authState.loading) {
        return null;
    }

    return (
        <div className="navigation__user-panel">
            {user ? (
                <div className="navigation__authenticated">
                    <Link className="navigation__profile" to="/user">
                        <i className="fas fa-user"></i>
                    </Link>
                    <Link className="navigation__settings" to="/user/settings">
                        <i className="fas fa-cog"></i>
                    </Link>
                    <div className="navigation__create">
                        <i className="fas fa-plus"></i>
                    </div>
                    <div
                        className="navigation__logout"
                        onClick={() => auth.signOut()}
                    >
                        Wyloguj
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
