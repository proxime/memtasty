import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getElapsedTime } from '../../timeFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { likeComment, deleteComment } from '../../store/actions/posts';
import { auth } from '../../firebaseConfig';
import CommentReply from './CommentReply';
import CommentAddReply from './CommentAddReply';

const Comment = ({ comment, history, postId, from }) => {
    const user = auth.currentUser;
    const [isLiked, setIsLiked] = useState(null);
    const [isAddingReply, setIsAddingReply] = useState(false);
    const likedComments = useSelector(state => state.posts.myCommentLikes);
    const dispatch = useDispatch();

    useEffect(() => {
        if (likedComments[comment.key]) {
            setIsLiked(likedComments[comment.key].type);
        }
    }, [likedComments, comment.key]);

    const handleRedirectToProfile = () => {
        history.push(`/profile/${comment.owner}`);
    };

    const handleAddLike = value => {
        dispatch(likeComment(postId, comment.key, value, from));
    };

    const handleDeleteComment = () => {
        dispatch(deleteComment(postId, comment.key, from));
    };

    const stopAddReply = () => {
        setIsAddingReply(false);
    };

    const renderReplies = () =>
        comment.replies.map(item => (
            <CommentReply
                key={item.key}
                postId={postId}
                commentId={comment.key}
                reply={item}
                from={from}
            />
        ));

    return (
        <div className="comment">
            <div className="comment__main">
                <div
                    className="comment__avatar"
                    style={{
                        backgroundImage: `url(${comment.avatar})`,
                    }}
                    onClick={handleRedirectToProfile}
                ></div>
                <div className="comment__main-items">
                    <div className="comment__top">
                        <Link
                            to={`/profile/${comment.owner}`}
                            className="comment__user"
                        >
                            {comment.nick}
                        </Link>
                        <div className="comment__time">
                            {getElapsedTime(comment.date)}
                        </div>
                    </div>
                    <div className="comment__text">{comment.comment}</div>
                    <div className="comment__summary">
                        {user && (
                            <div className="comment__settings">
                                <p
                                    className="comment__reply"
                                    onClick={() => setIsAddingReply(true)}
                                >
                                    Odpowiedz
                                </p>
                                {user && user.uid === comment.owner && (
                                    <p className="comment__reply">Edytuj</p>
                                )}
                                {user && user.uid === comment.owner && (
                                    <p
                                        className="comment__reply"
                                        onClick={handleDeleteComment}
                                    >
                                        Usuń
                                    </p>
                                )}
                            </div>
                        )}
                        <div className="comment__actions">
                            <div className="comment__points">
                                {comment.points}
                            </div>
                            {(!isLiked || isLiked === 'increment') && (
                                <div
                                    className={`comment__plus ${
                                        isLiked === 'increment' ? 'active' : ''
                                    }`}
                                    onClick={() => handleAddLike(1)}
                                >
                                    <i className="fas fa-plus"></i>
                                </div>
                            )}
                            {(!isLiked || isLiked === 'decrement') && (
                                <div
                                    className={`comment__minus ${
                                        isLiked === 'decrement' ? 'active' : ''
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
            {(isAddingReply ||
                (comment.replies && comment.replies.length > 0)) && (
                <div className="comment__replies">
                    {isAddingReply && (
                        <CommentAddReply
                            stopAddReply={stopAddReply}
                            postId={postId}
                            commentId={comment.key}
                            from={from}
                        />
                    )}
                    {comment.replies &&
                        comment.replies.length > 0 &&
                        renderReplies()}
                </div>
            )}
        </div>
    );
};

export default withRouter(Comment);
