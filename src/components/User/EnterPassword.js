import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import Spinner from '../Spinner';
import AuthInput from '../Auth/AuthInput';

const EnterPassword = ({
    setOpenNavigation,
    handleChangeData,
    password,
    validateError,
    onSave,
}) => {
    const authPopup = useRef(null);
    const isLoading = useSelector(state => state.auth.settingsLoading);

    useEffect(() => {
        document.querySelector('body').classList.add('disabled');

        return () => {
            document.querySelector('body').classList.remove('disabled');
        };
    }, []);

    const handleCloseWindow = e => {
        if (e.target === authPopup.current) setOpenNavigation(null);
    };

    return (
        <div
            className="authentication__popup"
            onClick={handleCloseWindow}
            ref={authPopup}
        >
            <div className="authentication">
                <div className="authentication__close-container">
                    <div
                        className="authentication__close"
                        onClick={() => setOpenNavigation(null)}
                    >
                        <i className="fas fa-times"></i>
                    </div>
                </div>
                <div className="authentication__title">Zapisz zmiany</div>
                <div className="authentication__desc">
                    Wprowadź hasło aby potwierdzić zmiany
                </div>
                {isLoading ? (
                    <Spinner size={150} />
                ) : (
                    <form
                        className="authentication__form"
                        onSubmit={onSave}
                        noValidate
                    >
                        <AuthInput
                            text="Wprowadź hasło"
                            type="password"
                            name="password"
                            onChange={handleChangeData}
                            value={password}
                            error={validateError}
                            firstInput
                        />
                        <div className="authentication__button-container">
                            <button className="authentication__button">
                                Zapisz zmiany
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EnterPassword;
