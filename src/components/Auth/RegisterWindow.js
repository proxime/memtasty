import React, { useState, useCallback } from 'react';
import AuthInput from './AuthInput';
import { createAccount } from '../../store/actions/auth';
import validate from 'validate.js';
import Spinner from '../Spinner';
import { withRouter } from 'react-router-dom';

const RegisterWindow = ({ setOpenNavigation, scrollWhenChange, history }) => {
    const [formData, setFormData] = useState({
        nick: '',
        email: '',
        password: '',
    });

    const [validateErrors, setValidateErrors] = useState({
        email: '',
        password: '',
        other: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const { email, password, nick } = formData;

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

    const handleRegisterUser = async e => {
        e.preventDefault();
        setValidateErrors({
            nick: '',
            email: '',
            password: '',
            other: '',
        });
        let error = false;
        if (nick.length < 4 || nick.length > 12) {
            setValidateErrors(prevState => ({
                ...prevState,
                nick: 'Nick musi zawierać od 4 do 12 znaków',
            }));
            error = true;
        }
        var constraints = {
            email: {
                presence: true,
                email: true,
            },
            password: {
                presence: true,
                length: {
                    minimum: 6,
                },
            },
        };

        const validateResult = validate({ email, password }, constraints);
        if (validateResult) {
            if (validateResult.email) {
                setValidateErrors(prevState => ({
                    ...prevState,
                    email: 'Podaj prawidłowy adres Email',
                }));
                error = true;
            }
            if (validateResult.password) {
                setValidateErrors(prevState => ({
                    ...prevState,
                    password: 'Hasło musi zawierać minimum 6 znaków',
                }));
                error = true;
            }
        }
        if (error) return;

        try {
            setIsLoading(true);
            const res = await createAccount(email, password, nick);
            if (res.status === 'error') {
                setValidateErrors(prevState => ({
                    ...prevState,
                    ...res.error,
                }));
                setIsLoading(false);
            } else {
                setOpenNavigation(false);
                history.push('/user');
            }
        } catch (err) {
            setValidateErrors(prevState => ({
                ...prevState,
                other: 'Coś poszło nie tak',
            }));
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="authentication__title">Rejestracja</div>
            <div className="authentication__desc">
                Rejestracja przy pomocy Emaila
            </div>
            {isLoading ? (
                <Spinner size={150} />
            ) : (
                <form
                    className="authentication__form"
                    onSubmit={handleRegisterUser}
                    noValidate
                >
                    <AuthInput
                        text="Nick"
                        type="text"
                        name="nick"
                        onChange={handleChangeData}
                        value={nick}
                        error={validateErrors.nick}
                        firstInput
                    />
                    <AuthInput
                        text="Email"
                        type="email"
                        name="email"
                        onChange={handleChangeData}
                        value={email}
                        error={validateErrors.email}
                    />
                    <AuthInput
                        text="Hasło"
                        type="password"
                        name="password"
                        onChange={handleChangeData}
                        value={password}
                        error={validateErrors.password}
                    />
                    <div className="authentication__button-container">
                        <button className="authentication__button">
                            Zarejestruj się
                        </button>
                    </div>
                </form>
            )}
            <div
                className="authentication__change"
                onClick={handleChangeWindow}
            >
                Masz już konto?
            </div>
        </>
    );
};

export default withRouter(RegisterWindow);
