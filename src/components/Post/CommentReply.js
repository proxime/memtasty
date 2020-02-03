import React from 'react';

const CommentReply = () => {
    return (
        <div className="comment__answer">
            <div className="comment__main">
                <div
                    className="comment__avatar-small"
                    style={{
                        backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/memtasty.appspot.com/o/avatars%2Fdefault.jpg?alt=media&token=fac1b126-6c62-4a1a-b7be-a7472871521a")`,
                    }}
                ></div>
                <div className="comment__main-items">
                    <div className="comment__top">
                        <div className="comment__user">Ncik</div>
                        <div className="comment__time">minutę temu</div>
                    </div>
                    <div className="comment__text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Reprehenderit harum debitis neque molestiae. Enim rem
                        sequi amet asperiores, modi officiis.
                    </div>
                    <div className="comment__summary">
                        <div className="comment__reply">Odpowiedz</div>
                        <div className="comment__actions">
                            <div className="comment__points">15</div>
                            <div className="comment__plus">
                                <i className="fas fa-plus"></i>
                            </div>
                            <div className="comment__minus">
                                <i className="fas fa-minus"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentReply;
