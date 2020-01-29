import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChangePassword from './ChangePassword';
import { changeAccountData } from '../../store/actions/auth';
import EnterPassword from './EnterPassword';
import validate from 'validate.js';

const SettingsAccount = () => {
    const user = useSelector(state => state.auth.user);
    const [isPasswordChanged, setIsPasswordChanged] = useState(false);
    const [passwordsData, setPasswordsData] = useState({
        password: '',
        newPassword: '',
        newPassword2: '',
    });
    const [isWaitingForPassword, setIsWaitingForPassword] = useState(false);

    const { password, newPassword, newPassword2 } = passwordsData;

    const [email, setEmail] = useState('');

    const [validateErrors, setValidateErrors] = useState({
        email: '',
        password: '',
        newPassword: '',
        newPassword2: '',
        other: '',
    });

    const dispatch = useDispatch();

    useEffect(() => {
        setEmail(user.email);
    }, [user.email]);

    const handleChangeData = e => {
        e.persist();
        setPasswordsData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleResetChanges = () => {
        setEmail(user.email);
        setPasswordsData({
            password: '',
            newPassword: '',
            newPassword2: '',
        });
        setValidateErrors({
            email: '',
            password: '',
            newPassword: '',
            newPassword2: '',
            other: '',
        });
    };

    const saveChanges = () => {
        setValidateErrors({
            email: '',
            password: '',
            newPassword: '',
            newPassword2: '',
            other: '',
        });
        let error = false;
        if (isPasswordChanged) {
            if (newPassword.length < 6) {
                setValidateErrors(prevState => ({
                    ...prevState,
                    newPassword: 'Hasło musi zawierać minimum 6 znaków',
                }));
                error = true;
            }
            if (newPassword !== newPassword2) {
                setValidateErrors(prevState => ({
                    ...prevState,
                    newPassword2: 'Hasła nie są identyczne',
                }));
                error = true;
            }
        } else if (email === user.email) return;
        var constraints = {
            email: {
                presence: true,
                email: true,
            },
        };

        const validateResult = validate({ email }, constraints);
        if (validateResult) {
            if (validateResult.email) {
                setValidateErrors(prevState => ({
                    ...prevState,
                    email: 'Podaj prawidłowy adres Email',
                }));
                error = true;
            }
        }

        if (error) return;

        setIsWaitingForPassword(true);
    };

    const handleSaveChanges = async e => {
        e.preventDefault();
        try {
            const res = await dispatch(
                changeAccountData(email, password, newPassword)
            );
            if (res.status === 'error') {
                setValidateErrors(prevState => ({
                    ...prevState,
                    ...res.error,
                }));
                if (!res.error.password) {
                    setIsWaitingForPassword(false);
                }
            } else {
                setIsWaitingForPassword(false);
                setPasswordsData({
                    password: '',
                    newPassword: '',
                    newPassword2: '',
                });
                setIsPasswordChanged(false);
            }
        } catch (err) {
            setValidateErrors(prevState => ({
                ...prevState,
                other: 'Coś poszło nie tak',
            }));
        }
    };

    return (
        <>
            <div className="settings">
                <div className="settings__item">
                    <div className="settings__title">E-mail</div>
                    <input
                        type="text"
                        name="email"
                        className="settings__email-input"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {validateErrors.email && (
                        <div className="settings__error">
                            {validateErrors.email}
                        </div>
                    )}
                </div>
                <div
                    className="settings__change-paswword"
                    style={isPasswordChanged ? { marginBottom: '20px' } : null}
                    onClick={() =>
                        setIsPasswordChanged(prevState => !prevState)
                    }
                >
                    {isPasswordChanged ? 'Nie zmieniaj hasła' : 'Zmień Hasło'}
                </div>
                {isPasswordChanged && (
                    <ChangePassword
                        handleChangeData={handleChangeData}
                        passwordsData={passwordsData}
                        validateErrors={validateErrors}
                    />
                )}
                <div className="settings__buttons">
                    <div className="settings__button" onClick={saveChanges}>
                        Zapisz
                    </div>
                    <div
                        className="settings__button-reset"
                        onClick={handleResetChanges}
                    >
                        Resetuj
                    </div>
                </div>
                {validateErrors.other && (
                    <div className="settings__error-other">
                        {validateErrors.other}
                    </div>
                )}
            </div>
            {isWaitingForPassword && (
                <EnterPassword
                    setOpenNavigation={setIsWaitingForPassword}
                    handleChangeData={handleChangeData}
                    password={password}
                    validateError={validateErrors.password}
                    onSave={handleSaveChanges}
                />
            )}
        </>
    );
};

export default SettingsAccount;
