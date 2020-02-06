import React, { useEffect, useState } from 'react';
import Element from './Elements/Element';
import RecomendSection from './Elements/RecomendSection';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../store/actions/posts';
import { Redirect, withRouter } from 'react-router-dom';
import Spinner from './Spinner';

const WaitingRoom = props => {
    const posts = useSelector(state => state.posts.downloadedPosts);
    const isLoading = useSelector(state => state.posts.loading);
    const allPages = useSelector(state => state.posts.pages);
    const [page, setPage] = useState(
        props.match.params.id &&
            !isNaN(Number(props.match.params.id)) &&
            props.match.params.id > 0
            ? Number(props.match.params.id)
            : 1
    );

    useEffect(() => {
        return () => {
            window.scrollTo(0, 0);
        };
    }, []);

    const dispatch = useDispatch();

    console.log('sad');

    useEffect(() => {
        dispatch(getPosts(page, 'posts'));
        window.scrollTo(0, 0);
    }, [page, dispatch]);

    if (allPages) {
        if (
            props.match.params.id &&
            (isNaN(Number(props.match.params.id)) ||
                props.match.params.id > allPages ||
                props.match.params.id <= 0)
        ) {
            if (page !== 1) {
                setPage(1);
            }
            return <Redirect to="/waiting" />;
        }
    }

    const renderPosts = () =>
        posts.map(post => (
            <Element key={post.key} post={post} place="waitingRoom" />
        ));

    const handleChangePage = newPage => {
        if (newPage > allPages) {
            props.history.push(`/waiting/1`);
            setPage(1);
            return;
        }
        props.history.push(`/waiting/${newPage}`);
        setPage(newPage);
    };

    const getPagesNumbers = () => {
        const pages = [];
        if (page > 4) {
            pages.push(page - 4);
        } else {
            pages.push(1);
        }
        for (let i = 1; i < 7; ++i) {
            if (pages[0] + i <= allPages) {
                pages[i] = pages[0] + i;
            } else break;
        }

        return pages.map(val => (
            <div
                key={val}
                className={`section__page ${val === page ? 'active' : ''}`}
                onClick={() => handleChangePage(val)}
            >
                {val}
            </div>
        ));
    };

    return (
        <div className="section">
            {isLoading ? (
                <div className="section__list">
                    <Spinner size={200} />
                </div>
            ) : (
                <div className="section__list">
                    {renderPosts()}
                    <div
                        className="section__next-page"
                        onClick={() => handleChangePage(page + 1)}
                    >
                        {page === allPages
                            ? 'Wróć na pierwszą stronę'
                            : 'Następna Strona'}
                    </div>
                    <div className="section__pages">{getPagesNumbers()}</div>
                </div>
            )}
            <RecomendSection />
        </div>
    );
};

export default withRouter(WaitingRoom);
