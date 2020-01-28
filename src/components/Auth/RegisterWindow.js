import React, { useState, useCallback } from 'react';
import AuthInput from './AuthInput';
import { useDispatch } from 'react-redux';
import { createAccount } from '../../store/actions/auth';
import validate from 'validate.js';
import Spinner from '../Spinner';
import { withRouter } from 'react-router-dom';

const RegisterWindow = ({ setOpenNavigation, scrollWhenChange, history }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: '',
    });

    const [validateErrors, setValidateErrors] = useState({
        email: '',
        password: '',
        password2: '',
        other: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const { email, password, password2 } = formData;

    const dispatch = useDispatch();

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
            email: '',
            password: '',
            password2: '',
            other: '',
        });
        let error = false;
        if (password !== password2) {
            setValidateErrors(prevState => ({
                ...prevState,
                password2: 'Hasła nie są identyczne!',
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
            const res = await dispatch(createAccount(email, password));
            if (res.status === 'error') {
                setValidateErrors(prevState => ({
                    ...prevState,
                    ...res.error,
                }));
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
                    <AuthInput
                        text="Powtórz Hasło"
                        type="password"
                        name="password2"
                        onChange={handleChangeData}
                        value={password2}
                        error={validateErrors.password2}
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
