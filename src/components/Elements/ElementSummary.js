import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLike } from '../../store/actions/posts';

const ElementSummary = ({ points, status, id, place }) => {
    const likes = useSelector(state => state.posts.myLikes);
    const [isLiked, setIsLiked] = useState(false);
    const dispatch = useDispatch();

    const handleAddLike = () => {
        if (isLiked) return;
        dispatch(addLike(status, id, 'increase', place));
    };

    const handleRemoveLike = () => {
        if (isLiked) return;
        dispatch(addLike(status, id, 'decrease', place));
    };

    useEffect(() => {
        const isLiked = likes.find(like => like.id === id);
        if (isLiked) setIsLiked(isLiked.type);
        else setIsLiked(false);
    }, [id, likes]);

    return (
        <div className="element__summary">
            <div className="element__points">{points}</div>
            <div className="element__actions">
                {(!isLiked || isLiked === 'increase') && (
                    <div
                        className={`element__action ${
                            isLiked === 'increase' ? 'active' : ''
                        }`}
                        onClick={handleAddLike}
                    >
                        <i className="fas fa-plus"></i>
                    </div>
                )}
                {(!isLiked || isLiked === 'decrease') && (
                    <div
                        className={`element__action ${
                            isLiked === 'decrease' ? 'active' : ''
                        }`}
                        onClick={handleRemoveLike}
                    >
                        <i className="fas fa-minus"></i>
                    </div>
                )}
                <div className="element__action">
                    <i className="fas fa-comment"></i>
                </div>
            </div>
        </div>
    );
};

export default ElementSummary;
