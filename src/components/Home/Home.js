import React, { useEffect, useState } from 'react';
import Element from '../Elements/Element';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../store/actions/posts';
import { Redirect, withRouter } from 'react-router-dom';
import Spinner from '../Spinner';

const Home = (props) => {
    const posts = useSelector((state) => state.posts.downloadedPosts);
    const isLoading = useSelector((state) => state.posts.loading);
    const allPages = useSelector((state) => state.posts.pages);
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

    useEffect(() => {
        dispatch(getPosts(page, 'mainPosts'));
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
            return <Redirect to="/" />;
        }
    }

    const renderPosts = () =>
        posts.map((post) => (
            <Element key={post.key} post={post} place="home" />
        ));

    const handleChangePage = (newPage) => {
        if (newPage > allPages) {
            props.history.push(`/1`);
            setPage(1);
            return;
        }
        props.history.push(`/${newPage}`);
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

        return pages.map((val) => (
            <div
                key={val}
                className={`section__page ${val === page ? 'active' : ''}`}
                onClick={() => handleChangePage(val)}
            >
                {val}
            </div>
        ));
    };

    return isLoading ? (
        <div className="section__list">
            <Spinner size={200} />
        </div>
    ) : (
        <div className="section__list">
            {renderPosts()}
            {page !== allPages && (
                <div
                    className="section__next-page"
                    onClick={() => handleChangePage(page + 1)}
                >
                    Następna strona
                </div>
            )}
            <div className="section__pages">{getPagesNumbers()}</div>
        </div>
    );
};

export default withRouter(Home);
