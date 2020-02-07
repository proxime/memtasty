import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CLOSE_ALERT } from '../store/actions/types';

const Alert = () => {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    const handleCloseAlert = () => {
        dispatch({ type: CLOSE_ALERT });
        if (alert.func) {
            alert.func();
        }
    };

    if (!alert.open) return null;

    return (
        <>
            <div className="alert__popup">
                <div className="alert">
                    <div className="alert__title">{alert.title}</div>
                    <div className="alert__desc">{alert.msg}</div>
                    <div className="alert__button-container">
                        <div
                            className="alert__button"
                            onClick={handleCloseAlert}
                        >
                            Rozumiem
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Alert;
