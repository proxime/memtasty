import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSinglePost } from '../../store/actions/posts';

import Element from '../Elements/Element';
import Spinner from '../Spinner';
import Comments from './Comments';

const Post = ({ match }) => {
    const [firstRender, setFirstRender] = useState(true);
    const post = useSelector((state) => state.posts.singlePost);
    const loading = useSelector((state) => state.posts.loading);
    const userLoading = useSelector((state) => state.auth.loading);
    const from =
        match.path === '/post' || match.path === '/post/:id'
            ? 'posts'
            : 'mainPosts';
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            window.scrollTo(0, 0);
        };
    }, []);

    useEffect(() => {
        dispatch(getSinglePost(match.params.id, from));
        setFirstRender(false);
    }, [dispatch, match.params.id, from]);

    return (
        <div className="section__list">
            {firstRender || loading || userLoading ? (
                <Spinner size={250} />
            ) : !post ? (
                <p>brak wyników</p>
            ) : (
                <>
                    <Element post={post} place="single" single />
                    <Link to="/" className="section__back">
                        Wróć na stronę główną
                    </Link>
                    <Comments postId={post.key} from={from} />
                </>
            )}
        </div>
    );
};

export default Post;
