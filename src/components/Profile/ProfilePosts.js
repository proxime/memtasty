import React from 'react';

import Element from '../Elements/Element';

const ProfilePosts = ({ posts }) => {
    const renderPosts = () =>
        posts.map(post => (
            <Element key={post.key} post={post} place="profile" />
        ));

    return (
        <>
            {!posts ? (
                <div className="user__items-container">
                    <div className="user__items-no-posts">
                        <div className="user__items-no-posts-text">
                            Ten użytkownik jeszcze nic nie dodał
                        </div>
                    </div>
                </div>
            ) : (
                renderPosts()
            )}
        </>
    );
};

export default ProfilePosts;
