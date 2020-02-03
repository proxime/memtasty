import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSinglePost } from '../../store/actions/posts';

import RecomendSection from '../Elements/RecomendSection';
import Element from '../Elements/Element';
import Spinner from '../Spinner';
import Comments from './Comments';

const Post = ({ match }) => {
    const [firstRender, setFirstRender] = useState(true);
    const post = useSelector(state => state.posts.singlePost);
    const loading = useSelector(state => state.posts.loading);
    const userLoading = useSelector(state => state.auth.loading);

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            window.scrollTo(0, 0);
        };
    }, []);

    useEffect(() => {
        dispatch(getSinglePost(match.params.id));
        setFirstRender(false);
    }, [dispatch, match.params.id]);

    return (
        <div className="section">
            <div className="section__list">
                {firstRender || loading || userLoading ? (
                    <Spinner size={250} />
                ) : (
                    <>
                        <Element post={post} place="single" single />
                        <Comments postId={post.key} comments={post.comments} />
                    </>
                )}
            </div>
            <RecomendSection />
        </div>
    );
};

export default Post;
