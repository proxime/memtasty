import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addReply } from '../../store/actions/posts';

const CommentAddReply = ({ stopAddReply, postId, commentId, from }) => {
    const [reply, setReply] = useState('');
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();

    const handleAddReply = async (e) => {
        e.preventDefault();
        await dispatch(addReply(postId, commentId, reply, from));
        stopAddReply();
    };

    const handleChangeReply = async (e) => {
        setReply(e.target.value);
    };

    return (
        <div className="comments__add-reply-container">
            <div
                className="comments__add-avatar-small"
                style={{ backgroundImage: `url(${user.avatar})` }}
            ></div>
            <div className="comments__add-input">
                <form onSubmit={handleAddReply}>
                    <textarea
                        name="comment"
                        placeholder="Dodaj opowiedź..."
                        onChange={handleChangeReply}
                        value={reply}
                    ></textarea>
                    <div className="comments__add-buttons">
                        <div
                            className="comments__add-button"
                            onClick={stopAddReply}
                        >
                            Anuluj
                        </div>
                        <button className="comments__add-button">
                            Odpowiedz
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CommentAddReply;
