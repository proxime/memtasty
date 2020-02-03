import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLoginWindow } from '../../store/actions/auth';
import { addComment } from '../../store/actions/posts';

import Comment from './Comment';

const Comments = ({ postId }) => {
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState('');
    const user = useSelector(state => state.auth.user);
    const comments = useSelector(state => state.posts.singlePost.comments);

    const dispatch = useDispatch();

    const handleLoginToComment = () => {
        dispatch(toggleLoginWindow('login'));
    };

    const handleAddComment = e => {
        e.preventDefault();
        setCommentError('');
        if (!comment.trim()) return setCommentError('Wprowadź komentarz');
        if (comment.length > 100)
            return setCommentError('Komentarz może zawierać do 100 znaków');
        setComment('');
        dispatch(addComment(postId, comment)).then(res => {
            if (res) {
            } else {
                setCommentError('Coś poszło nie tak, spróbuj ponownie');
            }
        });
    };

    const handleChangeComment = e => {
        setComment(e.target.value);
    };

    const handleResetComment = e => {
        setComment('');
    };

    const renderComments = () => {
        return comments.map(comment => (
            <Comment key={comment.key} comment={comment} />
        ));
    };

    return (
        <div className="comments">
            <div className="comments__add-container">
                {user ? (
                    <>
                        <div
                            className="comments__add-avatar"
                            style={{ backgroundImage: `url(${user.avatar})` }}
                        ></div>
                        <div className="comments__add-input">
                            <form onSubmit={handleAddComment}>
                                <textarea
                                    name="comment"
                                    placeholder="Dodaj komentarz..."
                                    onChange={handleChangeComment}
                                    value={comment}
                                ></textarea>
                                <div className="comments__add-buttons">
                                    <div
                                        className="comments__add-button"
                                        onClick={handleResetComment}
                                    >
                                        Anuluj
                                    </div>
                                    <button className="comments__add-button">
                                        Skomentuj
                                    </button>
                                    {commentError && (
                                        <div className="comments__error">
                                            {commentError}
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="comments__login">
                        <p onClick={handleLoginToComment}>Zaloguj się</p> aby
                        dodać komentarz
                    </div>
                )}
            </div>
            {comments && renderComments()}
        </div>
    );
};

export default Comments;
