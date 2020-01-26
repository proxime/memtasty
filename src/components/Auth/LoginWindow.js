import React, { useState, useCallback } from 'react';
import AuthInput from './AuthInput';

const LoginWindow = ({ setOpenNavigation, scrollWhenChange }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

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
        setOpenNavigation('register');
        scrollWhenChange();
    };

    return (
        <>
            <div className="authentication__title">Logowanie</div>
            <div className="authentication__desc">
                Zaloguj przy pomocy Emaila
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
                <div className="authentication__button-container">
                    <button className="authentication__button">Zaloguj</button>
                </div>
            </form>
            <div
                className="authentication__change"
                onClick={handleChangeWindow}
            >
                Nie masz konta?
            </div>
        </>
    );
};

export default LoginWindow;
