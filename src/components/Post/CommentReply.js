import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getElapsedTime } from '../../timeFunctions';
import { likeReply, deleteReply } from '../../store/actions/posts';
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../../firebaseConfig';

const CommentReply = ({ postId, commentId, reply, history, from }) => {
    const user = auth.currentUser;
    const [isLiked, setIsLiked] = useState(null);
    const likedComments = useSelector((state) => state.posts.myCommentLikes);
    const dispatch = useDispatch();

    useEffect(() => {
        if (likedComments[reply.key]) {
            setIsLiked(likedComments[reply.key].type);
        }
    }, [likedComments, reply.key]);

    const handleRedirectToProfile = () => {
        history.push(`/profile/${reply.owner}`);
    };

    const handleAddLike = (value) => {
        if (isLiked) return;
        dispatch(likeReply(postId, commentId, reply.key, value, from));
    };

    const handleDeleteReply = () => {
        dispatch(deleteReply(postId, commentId, reply.key, from));
    };

    return (
        <>
            <div className="comment__answer">
                <div className="comment__main">
                    <div
                        className="comment__avatar-small"
                        style={{
                            backgroundImage: `url(${reply.avatar})`,
                        }}
                        onClick={handleRedirectToProfile}
                    ></div>
                    <div className="comment__main-items">
                        <div className="comment__top">
                            <Link
                                to={`/profile/${reply.owner}`}
                                className="comment__user"
                            >
                                {reply.nick}
                            </Link>
                            <div className="comment__time">
                                {getElapsedTime(reply.date)}
                            </div>
                        </div>
                        <div className="comment__text">{reply.comment}</div>
                        <div className="comment__summary">
                            {user && user.uid === reply.owner && (
                                <div className="comment__settings">
                                    <p
                                        className="comment__reply"
                                        onClick={handleDeleteReply}
                                    >
                                        Usuń
                                    </p>
                                </div>
                            )}
                            <div className="comment__actions">
                                <div className="comment__points">
                                    {reply.points}
                                </div>
                                {(!isLiked || isLiked === 'increment') && (
                                    <div
                                        className={`comment__plus ${
                                            isLiked === 'increment'
                                                ? 'active'
                                                : ''
                                        }`}
                                        onClick={() => handleAddLike(1)}
                                    >
                                        <i className="fas fa-plus"></i>
                                    </div>
                                )}
                                {(!isLiked || isLiked === 'decrement') && (
                                    <div
                                        className={`comment__minus ${
                                            isLiked === 'decrement'
                                                ? 'active'
                                                : ''
                                        }`}
                                        onClick={() => handleAddLike(-1)}
                                    >
                                        <i className="fas fa-minus"></i>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default withRouter(CommentReply);
