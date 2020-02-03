import React from 'react';

const UserComments = () => {
    return (
        <div className="user__items-container">
            <div className="user__items-no-posts">
                <div className="user__items-no-posts-text">
                    Nie masz jeszcze żadnych komentarzy
                </div>
                <div className="user__items-no-posts-button">
                    Sprawdź Najnowsze Memy
                </div>
            </div>
        </div>
    );
};

export default UserComments;
