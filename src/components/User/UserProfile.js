import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        return () => {
            window.scrollTo(0, 0);
        };
    }, []);

    return (
        <div className="user__profile">
            <div className="user__title">Mój profil</div>
            <div className="user__main">
                <div
                    className="user__avatar"
                    style={{
                        backgroundImage: `url(${user.avatar})`,
                    }}
                ></div>
                <div className="user__info">
                    <div className="user__nick">{user.nick}</div>
                    <div className="user__mail">{user.email}</div>
                </div>
            </div>
            <div className="user__desc">
                {user.desc ? user.desc : 'Napisz coś o sobie'}
            </div>
            <div className="user__items">
                <div className="user__select">
                    <p className="active">Posty</p>
                    <p>Komentarze</p>
                </div>
                <div className="user__items-container"></div>
            </div>
        </div>
    );
};

export default UserProfile;
