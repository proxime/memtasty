import React from 'react';
import { Link } from 'react-router-dom';
import { getElapsedTime } from '../../timeFunctions';

import ElementSummary from './ElementSummary';
import ElementImage from './ElementImage';
import ElementVideo from './ElementVideo';

const Element = ({ post, place, single }) => {
    const renderContent = () => {
        if (post.data.type === 'video/mp4')
            return <ElementVideo video={post.data.url} />;
        else
            return (
                <ElementImage
                    image={post.data.url}
                    single={single}
                    id={post.key}
                />
            );
    };

    return (
        <div className="element">
            <div className="element__top">
                <div className="element__author">
                    {post.nick && post.avatar && (
                        <>
                            <Link
                                to={`/profile/${post.owner}`}
                                className={`element__author-avatar`}
                                style={{
                                    backgroundImage: `url(${post.avatar})`,
                                }}
                            ></Link>
                            <Link
                                to={`/profile/${post.owner}`}
                                className={`element__author-name`}
                            >
                                {post.nick}
                            </Link>
                        </>
                    )}
                </div>
                <div className="element__date">{getElapsedTime(post.date)}</div>
            </div>
            {single ? (
                <div className={`element__title single`}>{post.data.title}</div>
            ) : (
                <Link to={`/post/${post.key}`} className={'element__title'}>
                    {post.data.title}
                </Link>
            )}
            {renderContent()}
            <ElementSummary
                points={post.likes}
                status={post.status}
                id={post.key}
                place={place}
            />
        </div>
    );
};

export default Element;
