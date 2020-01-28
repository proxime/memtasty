import React from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../firebaseConfig';

const UserPanel = ({ setOpenNavigation }) => {
    const authReducer = useSelector(state => state.auth);
    const user = authReducer.user;

    const logOut = async () => {
        await auth.signOut();
    };

    return (
        <div className="navigation__user-panel">
            {user ? (
                <div className="navigation__logout" onClick={logOut}>
                    Wyloguj się
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
