import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getElapsedTime } from '../../timeFunctions';
import CommentReply from './CommentReply';

const Comment = ({ comment, history }) => {
    const handleRedirectToProfile = () => {
        history.push(`/profile/${comment.owner}`);
    };

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
                        <div className="comment__time">minutę temu</div>
                    </div>
                    <div className="comment__text">{comment.comment}</div>
                    <div className="comment__summary">
                        <div className="comment__reply">Odpowiedz</div>
                        <div className="comment__actions">
                            <div className="comment__points">
                                {comment.points}
                            </div>
                            <div className="comment__plus">
                                <i className="fas fa-plus"></i>
                            </div>
                            <div className="comment__minus">
                                <i className="fas fa-minus"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="comment__replies">
                <CommentReply />
                <CommentReply />
            </div>
        </div>
    );
};

export default withRouter(Comment);
