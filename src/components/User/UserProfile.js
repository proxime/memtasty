import React from 'react';

const UserProfile = () => {
    return (
        <div className="user__profile">
            <div className="user__main">
                <div
                    className="user__avatar"
                    style={{
                        backgroundImage:
                            'url(https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557376304.186_U5U7u5_100x100.jpg)',
                    }}
                ></div>
                <div className="user__nick">Nick</div>
            </div>
            <div className="user__desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas ex recusandae earum maiores odio, placeat assumenda
                esse nemo vero libero aspernatur, adipisci doloremque quos ipsum
                inventore, sed a enim! Modi.
            </div>
            <div className="user__items">
                <div className="user__select">
                    <p className="active">Posty</p>
                    <p>Komentarze</p>
                </div>
                <div className="user__items-container"></div>
            </div>
        </div>
    );
};

export default UserProfile;
