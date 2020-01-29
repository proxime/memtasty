import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeProfileData } from '../../store/actions/auth';

const SettingsProfile = () => {
    const user = useSelector(state => state.auth.user);
    const [nick, setNick] = useState('');
    const [desc, setDesc] = useState('');
    const [avatar, setAvatar] = useState('');

    const [validateErrors, setValidateErrors] = useState({
        nick: '',
        desc: '',
        avatar: '',
    });

    useEffect(() => {
        setNick(user.nick);
        if (user.desc) setDesc(user.desc);
    }, [user.nick, user.desc]);

    const dispatch = useDispatch();

    const handleChangeAvatar = e => {
        setAvatar(e.target.files[0]);
    };

    const saveChanges = async () => {
        setValidateErrors({
            nick: '',
            desc: '',
            avatar: '',
        });
        let error = false;
        if (nick.length < 4 || nick.length > 12) {
            setValidateErrors(prevState => ({
                ...prevState,
                nick: 'Nick musi zawierać od 4 do 12 znaków',
            }));
            error = true;
        }
        if (error) return;

        try {
            // setIsLoading(true);
            const res = await dispatch(changeProfileData(nick, desc, avatar));
            if (res.status === 'error') {
                setValidateErrors(prevState => ({
                    ...prevState,
                    ...res.error,
                }));
                // setIsLoading(false);
            } else {
                // setOpenNavigation(false);
                // history.push('/user');
            }
        } catch (err) {
            setValidateErrors(prevState => ({
                ...prevState,
                other: 'Coś poszło nie tak',
            }));
            // setIsLoading(false);
        }
    };

    return (
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
                    <div className="settings__error">{validateErrors.nick}</div>
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
            </div>
            <div className="settings__button" onClick={saveChanges}>
                Zapisz
            </div>
        </div>
    );
};

export default SettingsProfile;
