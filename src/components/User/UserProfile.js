import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Link, Route } from 'react-router-dom';

import UserPosts from './UserPosts';
import UserComments from './UserComments';

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
                {user.desc ? (
                    user.desc
                ) : (
                    <Link to="/user/settings">Napisz coś o sobie</Link>
                )}
            </div>
            <div className="user__items">
                <div className="user__select">
                    <NavLink to="/user" exact>
                        Posty
                    </NavLink>
                    <NavLink to="/user/comments">Komentarze</NavLink>
                </div>
            </div>
            <Route path="/user" exact component={UserPosts} />
            <Route path="/user/comments" exact component={UserComments} />
        </div>
    );
};

export default UserProfile;
