import React, { useEffect, useState } from 'react';
import { NavLink, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../store/actions/profile';
import { auth } from '../firebaseConfig';
import RecomendSection from './Elements/RecomendSection';
import Spinner from './Spinner';
import ProfilePosts from './Profile/ProfilePosts';
import AdminPanel from './Profile/AdminPanel';

const Profile = ({ match }) => {
    const user = auth.currentUser;
    const isAdmin = useSelector(state => {
        if (state.auth.user) return state.auth.user.admin;
        else return false;
    });
    const [firstRender, setFirstRender] = useState(true);
    const loading = useSelector(state => state.profile.loading);
    const userLoading = useSelector(state => state.auth.loading);
    const profile = useSelector(state => state.profile.profile);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfile(match.params.id));
        setFirstRender(false);
    }, [dispatch, match.params.id]);

    useEffect(() => {
        return () => {
            window.scrollTo(0, 0);
        };
    });

    if (user && user.uid === match.params.id) {
        return <Redirect to="/user" />;
    }

    return (
        <div className="section">
            <div className="section__list">
                {loading || userLoading || firstRender ? (
                    <div className="user">
                        <Spinner size={200} />
                    </div>
                ) : (
                    <div className="user">
                        <div className="user__profile">
                            <div className="user__main">
                                <div
                                    className="user__avatar"
                                    style={{
                                        backgroundImage: `url(${profile.avatar})`,
                                    }}
                                ></div>
                                <div className="user__info">
                                    <div className="user__nick">
                                        {profile.nick}
                                    </div>
                                </div>
                            </div>
                            {user && isAdmin && (
                                <AdminPanel
                                    id={match.params.id}
                                    isAdmin={profile.admin}
                                />
                            )}
                            {profile.desc && (
                                <div className="user__desc">{profile.desc}</div>
                            )}
                            <div className="user__items">
                                <div className="user__select">
                                    <NavLink
                                        to={`/profile/${match.params.id}`}
                                        exact
                                    >
                                        Posty
                                    </NavLink>
                                    <NavLink
                                        to={`/profile/${match.params.id}/comments`}
                                    >
                                        Komentarze
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <Route
                            path={`/profile/${match.params.id}`}
                            exact
                            render={() => (
                                <ProfilePosts posts={profile.posts} />
                            )}
                        />
                        {/* <Route
                            path="/user/comments"
                            exact
                            component={UserComments}
                        /> */}
                    </div>
                )}
            </div>
            <RecomendSection />
        </div>
    );
};

export default Profile;
