import React, { useState, useEffect, useCallback } from 'react';
import AuthInput from './AuthInput';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions/auth';
import Spinner from '../Spinner';

const LoginWindow = ({ setOpenNavigation, scrollWhenChange }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [validateErrors, setValidateErrors] = useState({
        email: '',
        password: '',
        other: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const { email, password } = formData;

    const dispatch = useDispatch();

    useEffect(() => {
        document.querySelector('body').classList.add('disabled');

        return () => {
            document.querySelector('body').classList.remove('disabled');
        };
    }, []);

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

    const handleLoginrUser = async e => {
        e.preventDefault();
        setValidateErrors({
            email: '',
            password: '',
            other: '',
        });
        let error = false;

        if (!email) {
            setValidateErrors(prevState => ({
                ...prevState,
                email: 'Wprowadź prawidłowy ared E-mail',
            }));
            error = true;
        }
        if (!password) {
            setValidateErrors(prevState => ({
                ...prevState,
                password: 'Wprowadź hasło',
            }));
            error = true;
        }
        if (error) return;

        try {
            setIsLoading(true);
            const res = await dispatch(login(email, password));
            if (res.status === 'error') {
                setValidateErrors(prevState => ({
                    ...prevState,
                    ...res.error,
                }));
                setIsLoading(false);
            } else {
                setOpenNavigation(false);
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
            <div className="authentication__title">Logowanie</div>
            <div className="authentication__desc">
                Zaloguj przy pomocy Emaila
            </div>
            {isLoading ? (
                <Spinner size={150} />
            ) : (
                <form
                    className="authentication__form"
                    onSubmit={handleLoginrUser}
                    noValidate
                >
                    <AuthInput
                        text="Email"
                        type="email"
                        name="email"
                        onChange={handleChangeData}
                        value={email}
                        error={validateErrors.email}
                        firstInput
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
                            Zaloguj
                        </button>
                    </div>
                </form>
            )}
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
