import React, { useState, useCallback } from 'react';

import AuthInput from './AuthInput';

const RegisterWindow = ({ setOpenNavigation, scrollWhenChange }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: '',
    });

    const { email, password, password2 } = formData;

    const handleChangeData = useCallback(
        e => {
            e.persist();
            setFormData(prevState => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));
        },
        [setFormData]
    );

    const handleChangeWindow = () => {
        setOpenNavigation('login');
        scrollWhenChange();
    };

    return (
        <>
            <div className="authentication__title">Rejestracja</div>
            <div className="authentication__desc">
                Rejestracja przy pomocy Emaila
            </div>
            <form className="authentication__form">
                <AuthInput
                    text="Email"
                    type="email"
                    name="email"
                    onChange={handleChangeData}
                    value={email}
                />
                <AuthInput
                    text="Hasło"
                    type="password"
                    name="password"
                    onChange={handleChangeData}
                    value={password}
                />
                <AuthInput
                    text="Powtórz Hasło"
                    type="password"
                    name="password2"
                    onChange={handleChangeData}
                    value={password2}
                />
                <div className="authentication__button-container">
                    <button className="authentication__button">
                        Zarejestruj się
                    </button>
                </div>
            </form>
            <div
                className="authentication__change"
                onClick={handleChangeWindow}
            >
                Masz już konto?
            </div>
        </>
    );
};

export default RegisterWindow;
