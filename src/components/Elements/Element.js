import React from 'react';
import { Link } from 'react-router-dom';
import { getElapsedTime } from '../../timeFunctions';
import { useSelector, useDispatch } from 'react-redux';
import { addPostToMain } from '../../store/actions/posts';
import ElementSummary from './ElementSummary';
import ElementImage from './ElementImage';
import ElementVideo from './ElementVideo';

const Element = ({ post, place, single }) => {
    const from = post.status === 'main' ? 'mainPost' : 'post';
    const isAdmin = useSelector(state => {
        if (state.auth.user) return state.auth.user.admin;
        else return false;
    });

    const dispatch = useDispatch();

    const handleAddPostToMain = () => {
        dispatch(addPostToMain(post.key, post.owner));
    };

    const renderContent = () => {
        if (post.data.type === 'video/mp4' || post.data.type === 'video/webm')
            return <ElementVideo video={post.data.url} />;
        else
            return (
                <ElementImage
                    image={post.data.url}
                    single={single}
                    id={post.key}
                    from={from}
                />
            );
    };

    const getTags = post.data.tags.map((tag, index) => (
        <React.Fragment key={index}>
            <div className="element__space"> - </div>
            <div className="element__tag">{tag}</div>
        </React.Fragment>
    ));

    const getCategory = () => {
        switch (post.data.category) {
            case 'funny':
                return 'Śmieszne';
            case 'animals':
                return 'Zwierzęta';
            case 'automotive':
                return 'Motoryzacja';
            case 'games':
                return 'Gry';
            case 'sport':
                return 'Sport';
            case 'ask':
                return 'Pytanie';
            case 'politics':
                return 'Polityka';
            default:
                return '';
        }
    };

    return (
        <div className="element">
            {isAdmin && single && post.status === 'waiting' && (
                <div className="admin-panel__options add">
                    <div
                        className="admin-panel__option"
                        onClick={handleAddPostToMain}
                    >
                        Dodaj na główną
                    </div>
                    <div className="admin-panel__option">Usuń</div>
                </div>
            )}
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
                            <div className="element__links">
                                <Link
                                    to={`/profile/${post.owner}`}
                                    className={`element__author-name`}
                                >
                                    {post.nick}
                                </Link>
                                <div className="element__tags">
                                    <div className="element__category">
                                        {getCategory()}
                                    </div>
                                    {getTags}
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="element__date">{getElapsedTime(post.date)}</div>
            </div>
            {single ? (
                <div className={`element__title single`}>{post.data.title}</div>
            ) : (
                <Link to={`/${from}/${post.key}`} className={'element__title'}>
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
