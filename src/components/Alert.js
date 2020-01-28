import React from 'react';

const Alert = ({ status, message }) => {
    return (
        <div className={`alert ${status === 'ok' ? '' : 'alert-wrong'}`}>
            <div className="alert__icon">
                {status === 'ok' ? (
                    <i className="fas fa-check"></i>
                ) : (
                    <i className="fas fa-exclamation-triangle"></i>
                )}
            </div>
            <div className="alert__text">{message}</div>
            <div className="alert__close">
                <i className="fas fa-times"></i>
            </div>
        </div>
    );
};

export default Alert;
