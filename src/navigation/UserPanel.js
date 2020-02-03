import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLoginWindow } from '../store/actions/auth';
import { auth } from '../firebaseConfig';
import { Link } from 'react-router-dom';

const UserPanel = () => {
    const authState = useSelector(state => state.auth);
    const user = authState.user;

    const dispatch = useDispatch();

    if (authState.loading) {
        return null;
    }

    const setOpenNavigation = window => {
        dispatch(toggleLoginWindow(window));
    };

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
                    <Link className="navigation__create" to="/create">
                        <i className="fas fa-plus"></i>
                    </Link>
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
