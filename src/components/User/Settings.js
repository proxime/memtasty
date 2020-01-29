import React, { useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';

import SettingsProfile from './SettingsProfile';

const Settings = () => {
    useEffect(() => {
        return () => {
            window.scrollTo(0, 0);
        };
    }, []);

    return (
        <div className="user__settings">
            <div className="user__title">Ustawienia</div>
            <div className="user__settings-categories">
                <NavLink
                    to="/user/settings"
                    className="user__settings-category"
                    exact
                >
                    Profil
                </NavLink>
                <NavLink
                    to="/user/settings/account"
                    className="user__settings-category"
                    exact
                >
                    Konto
                </NavLink>
                <NavLink
                    to="/user/settings/password"
                    className="user__settings-category"
                    exact
                >
                    Hasło
                </NavLink>
            </div>
            <div className="user__settings-main">
                <Route
                    path="/user/settings"
                    exact
                    component={SettingsProfile}
                />
            </div>
        </div>
    );
};

export default Settings;
