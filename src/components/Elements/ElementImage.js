import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';

const ElementImage = ({ image, single, id, history, from }) => {
    const [isCorrectHeight, setIsCorrectHeight] = useState(true);
    const [isImageExpanded, setIsImageExpanded] = useState(false);
    const imageEl = useRef(null);

    const handleLoadImage = () => {
        if (imageEl.current.height > 2000) setIsCorrectHeight(false);
    };

    const handleOpenSinglePost = () => {
        if (single) return;
        history.push(`/${from}/${id}`);
    };

    return (
        <div
            className={`element__content ${
                isImageExpanded ? 'element__content-expanded' : ''
            }`}
        >
            <img
                src={image}
                draggable="false"
                alt=""
                ref={imageEl}
                onLoad={handleLoadImage}
                className={single ? 'single' : ''}
                onClick={handleOpenSinglePost}
            />
            {!isCorrectHeight && !isImageExpanded && (
                <div
                    className="element__show-more"
                    onClick={() => setIsImageExpanded(true)}
                >
                    Rozwiń obrazek
                </div>
            )}
        </div>
    );
};

export default withRouter(ElementImage);
