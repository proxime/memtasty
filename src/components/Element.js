import React from 'react';

const Element = () => {
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
            <div className="element__title">Tytuł</div>
            <div className="element__content">
                <img
                    src="https://img-9gag-fun.9cache.com/photo/aO0pqmM_700b.jpg"
                    draggable="false"
                    alt=""
                />
            </div>
            <div className="element__summary">
                <div className="element__points">5411</div>
                <div className="element__actions">
                    <div className="element__action">
                        <i class="fas fa-plus"></i>
                    </div>
                    <div className="element__action">
                        <i class="fas fa-minus"></i>
                    </div>
                    <div className="element__action">
                        <i class="fas fa-comment"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Element;
