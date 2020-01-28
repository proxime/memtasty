import React from 'react';

import ElementSummary from './ElementSummary';
import ElementImage from './ElementImage';
import ElementVideo from './ElementVideo';

const Element = ({ image, type }) => {
    const renderContent = () => {
        if (type === 'image') return <ElementImage image={image} />;
        if (type === 'video') return <ElementVideo video={image} />;
    };

    return (
        <div className="element">
            <div className="element__top">
                <div className="element__author">
                    <div
                        className="element__author-avatar"
                        style={{
                            backgroundImage:
                                'url(https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557376304.186_U5U7u5_100x100.jpg)',
                        }}
                    ></div>
                    <div className="element__author-name">Funny</div>
                </div>
                <div className="element__date">10 godzin temu</div>
            </div>
            <div className="element__title">Tytuł</div>
            {renderContent()}
            <ElementSummary />
        </div>
    );
};

export default Element;
