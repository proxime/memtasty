import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLoggedUserPosts } from '../../store/actions/posts';
import { Link } from 'react-router-dom';

import Element from '../Elements/Element';
import Spinner from '../Spinner';

const UserPosts = () => {
    const posts = useSelector(state => state.posts.userPosts);
    const isLoading = useSelector(state => state.posts.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLoggedUserPosts());
    }, [dispatch]);

    const renderPosts = () =>
        posts.map(post => <Element key={post.key} post={post} place="user" />);

    return (
        <>
            {!renderPosts().length ? (
                <div className="user__items-container">
                    <div className="user__items-no-posts">
                        {isLoading ? (
                            <Spinner size={150} />
                        ) : (
                            <>
                                <div className="user__items-no-posts-text">
                                    Nie masz jeszcze żadnych postów
                                </div>
                                <Link
                                    to="/create"
                                    className="user__items-no-posts-button"
                                >
                                    Dodaj coś
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                renderPosts()
            )}
        </>
    );
};

export default UserPosts;
