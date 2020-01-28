import React from 'react';

const ElementSummary = () => {
    return (
        <div className="element__summary">
            <div className="element__points">5411</div>
            <div className="element__actions">
                <div className="element__action">
                    <i className="fas fa-plus"></i>
                </div>
                <div className="element__action">
                    <i className="fas fa-minus"></i>
                </div>
                <div className="element__action">
                    <i className="fas fa-comment"></i>
                </div>
            </div>
        </div>
    );
};

export default ElementSummary;
