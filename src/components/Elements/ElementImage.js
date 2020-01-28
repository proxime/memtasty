import React, { useState, useRef } from 'react';

const ElementImage = ({ image }) => {
    const [isCorrectHeight, setIsCorrectHeight] = useState(true);
    const [isImageExpanded, setIsImageExpanded] = useState(false);
    const imageEl = useRef(null);

    const handleLoadImage = () => {
        if (imageEl.current.height > 2000) setIsCorrectHeight(false);
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

export default ElementImage;
