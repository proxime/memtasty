import React, { useEffect } from 'react';
import Spinner from '../Spinner';

const PostLoadnig = ({ changeProggress }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="settings__loading">
            <Spinner size={200} />
            {changeProggress ? (
                <div className="settings__progress-bar">
                    <p> {Math.round(changeProggress)}% </p>
                    <div
                        className="settings__progress-bar-active"
                        style={{ width: `${changeProggress}%` }}
                    ></div>
                </div>
            ) : null}
        </div>
    );
};

export default PostLoadnig;
