import React from 'react';

import ElementSummary from './ElementSummary';
import ElementImage from './ElementImage';
import ElementVideo from './ElementVideo';

const Element = ({ post }) => {
    const renderContent = () => {
        if (post.data.type === 'video/mp4')
            return <ElementVideo video={post.data.url} />;
        else return <ElementImage image={post.data.url} />;
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
            <div className="element__title">{post.data.title}</div>
            {renderContent()}
            <ElementSummary />
        </div>
    );
};

export default Element;
