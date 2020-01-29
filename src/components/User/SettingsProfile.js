import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeProfileData } from '../../store/actions/auth';

import Spinner from '../Spinner';

const SettingsProfile = () => {
    const user = useSelector(state => state.auth.user);
    const settingsLoading = useSelector(state => state.auth.settingsLoading);
    const changeProggress = useSelector(state => state.auth.changeProggress);
    const [nick, setNick] = useState('');
    const [desc, setDesc] = useState('');
    const [avatar, setAvatar] = useState('');

    const [validateErrors, setValidateErrors] = useState({
        nick: '',
        desc: '',
        other: '',
    });
    const [avatarError, setAvatarError] = useState('');

    useEffect(() => {
        setNick(user.nick);
        setAvatar('');
        if (user.desc) setDesc(user.desc);
    }, [user.nick, user.desc, user.avatar]);

    const dispatch = useDispatch();

    const handleChangeAvatar = e => {
        setAvatar(e.target.files[0]);
    };

    const handleResetChanges = () => {
        setNick(user.nick);
        setAvatar('');
        if (user.desc) setDesc(user.desc);
        else setDesc('');
        setValidateErrors({
            nick: '',
            desc: '',
            other: '',
        });
    };

    const saveChanges = async () => {
        setValidateErrors({
            nick: '',
            desc: '',
            other: '',
        });
        setAvatarError('');
        if (nick === user.nick && desc == user.desc && !avatar) return;
        let error = false;
        if (nick.length < 4 || nick.length > 12) {
            setValidateErrors(prevState => ({
                ...prevState,
                nick: 'Nick musi zawierać od 4 do 12 znaków',
            }));
            error = true;
        }
        if (desc.length > 100) {
            setValidateErrors(prevState => ({
                ...prevState,
                desc: 'Opis może zawierać do 100 znaków',
            }));
            error = true;
        }
        if (avatar) {
            if (avatar.size > 5 * 1024 * 1024) {
                setAvatarError('Plik może zawierać maksymalnie 5MB');
                error = true;
            } else {
                const validType = avatar.type.search('image/');
                if (validType === -1) {
                    setAvatarError('Możesz wybrać tylko obrazy!');
                    error = true;
                }
            }
        }
        if (error) return;

        const resetData = () => {
            setNick(user.nick);
            setAvatar('');
            if (user.desc) setDesc(user.desc);
            else setDesc('');
        };

        try {
            const res = await dispatch(
                changeProfileData(nick, desc, avatar, setAvatarError)
            );
            if (res.status === 'error') {
                setValidateErrors(prevState => ({
                    ...prevState,
                    ...res.error,
                }));
                resetData();
            } else {
                setNick(user.nick);
                setAvatar('');
            }
        } catch (err) {
            resetData();
            setValidateErrors(prevState => ({
                ...prevState,
                other: 'Coś poszło nie tak',
            }));
        }
    };

    if (settingsLoading) {
        return (
            <div className="settings__loading">
                <Spinner size={200} />
                {changeProggress ? (
                    <div className="settings__progress-bar">
                        <p> {Math.round(changeProggress)}% </p>
                        <div
                            className="settings__progress-bar-active"
                            style={{ width: `${changeProggress}%` }}
                        ></div>
                    </div>
                ) : null}
            </div>
        );
    }

    return (
        <>
            <div className="settings">
                <div className="settings__item">
                    <div className="settings__title">Avatar</div>
                    <div className="settings__avatar-container">
                        <div
                            className="settings__avatar"
                            style={{ backgroundImage: `url(${user.avatar})` }}
                        ></div>
                        <div className="settings__change-avatar">
                            <label>
                                <input
                                    type="file"
                                    name="avatar"
                                    style={{ display: 'none' }}
                                    accept=".jpg, .gif, .png"
                                    onChange={handleChangeAvatar}
                                />
                                <div className="settings__avatar-input">
                                    Zmień avatar
                                </div>
                            </label>
                            {avatar && (
                                <div className="settings__avatar-desc">
                                    Wybrałeś {avatar.name}
                                </div>
                            )}
                            {avatarError && (
                                <div className="settings__avatar-error">
                                    {avatarError}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="settings__item">
                    <div className="settings__title">Nick</div>
                    <input
                        type="text"
                        name="nick"
                        className="settings__nick-input"
                        value={nick}
                        onChange={e => setNick(e.target.value)}
                    />
                    {validateErrors.nick && (
                        <div className="settings__error">
                            {validateErrors.nick}
                        </div>
                    )}
                </div>
                <div className="settings__item">
                    <div className="settings__title">Twój opis</div>
                    <textarea
                        name="desc"
                        className="settings__desc-input"
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                    ></textarea>
                    {validateErrors.desc && (
                        <div className="settings__error">
                            {validateErrors.desc}
                        </div>
                    )}
                </div>
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
        </>
    );
};

export default SettingsProfile;
