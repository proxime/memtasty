import React from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from '../../firebaseConfig';

const UserNavigation = () => {
    return (
        <div className="user__links">
            <NavLink to="/user" exact className="user__link">
                Profil
            </NavLink>
            <NavLink to="/user/settings" exact className="user__link">
                Ustawienia
            </NavLink>
            <p className="user__link" onClick={() => auth.signOut()}>
                Wyloguj
            </p>
        </div>
    );
};

export default UserNavigation;
