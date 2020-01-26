import React from 'react';

const UserPanel = ({ setOpenNavigation }) => {
    return (
        <div className="navigation__user-panel">
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
        </div>
    );
};

export default UserPanel;
