import { auth, database, storage, firebase } from '../../firebaseConfig';
import {
    SET_SETTING_LOAING,
    CHANGE_PROFILE_DATA,
    SET_SETTING_PROGGRESS,
    CHANGE_ACCOUNT_DATA,
} from './types';

export const createAccount = async (email, password, nick) => {
    try {
        // Check if nick is available
        let users = await database.ref('/users').once('value');
        users = users.val();

        let enabled = true;
        for (const key in users) {
            if (users[key].nick === nick) {
                enabled = false;
                break;
            }
        }
        if (!enabled) {
            return {
                status: 'error',
                error: { nick: 'Ten nick jest już zajęty' },
            };
        }

        //  Try create account
        const res = await auth.createUserWithEmailAndPassword(email, password);

        // Push user to database
        const userData = {
            nick,
            avatar: null,
            desc: '',
        };
        await database.ref('users/' + res.user.uid).set(userData);

        return {
            status: 'ok',
        };
    } catch (err) {
        let error = '';
        switch (err.code) {
            case 'auth/email-already-in-use':
                error = { email: 'Adres email jest już w użyciu' };
                break;
            case 'auth/invalid-email':
                error = { email: 'Podaj prawidłowy adres E-mail' };
                break;
            case 'auth/weak-password':
                error = { password: 'Hasło musi zawierać minimum 6 znaków' };
                break;
            default:
                error = { other: 'Coś poszło nie tak' };
                break;
        }
        return {
            status: 'error',
            error,
        };
    }
};

export const login = (email, password) => async () => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        return {
            status: 'ok',
        };
    } catch (err) {
        let error = '';
        switch (err.code) {
            case 'auth/user-disabled':
                error = { other: 'To konto zostało zablokowane' };
                break;
            case 'auth/invalid-email':
                error = { email: 'Podaj prawidłowy adres E-mail' };
                break;
            case 'auth/user-not-found':
                error = { email: 'Taki użytkownik nie istnieje' };
                break;
            case 'auth/wrong-password':
                error = { password: 'Wprowadziłeś błędne hasło' };
                break;
            default:
                error = { other: 'Coś poszło nie tak' };
                break;
        }
        return {
            status: 'error',
            error,
        };
    }
};

export const changeProfileData = (
    nick,
    desc,
    avatar,
    setAvatarError
) => async dispatch => {
    dispatch({ type: SET_SETTING_LOAING, payload: true });

    const user = auth.currentUser;

    try {
        //Check if nick is available
        let users = await database.ref('/users').once('value');
        users = users.val();

        let enabled = true;
        for (const key in users) {
            if (users[key].nick === nick) {
                if (key !== user.uid) {
                    enabled = false;
                }
                break;
            }
        }

        if (!enabled) {
            dispatch({ type: SET_SETTING_LOAING, payload: false });
            return {
                status: 'error',
                error: { nick: 'Ten nick jest już zajęty' },
            };
        }

        const data = {
            nick,
            desc,
        };
        if (avatar) {
            const upload = storage.ref(`/avatars/${user.uid}`).put(avatar);

            upload.on(
                'state_changed',
                snapshot => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    dispatch({
                        type: SET_SETTING_PROGGRESS,
                        payload: progress,
                    });
                },
                err => {
                    dispatch({ type: SET_SETTING_LOAING, payload: false });
                    setAvatarError(
                        'Plik może zawierać maksymalnie 5MB, oraz musi być obrazem'
                    );
                },
                async () => {
                    try {
                        const avatarUrl = await storage
                            .ref(`/avatars/${user.uid}`)
                            .getDownloadURL();
                        data.avatar = avatarUrl;
                        await database.ref(`/users/${user.uid}`).update(data);
                        dispatch({
                            type: CHANGE_PROFILE_DATA,
                            payload: data,
                        });
                    } catch (err) {
                        dispatch({ type: SET_SETTING_LOAING, payload: false });
                    }
                }
            );
        } else {
            await database.ref(`/users/${user.uid}`).update(data);
            dispatch({
                type: CHANGE_PROFILE_DATA,
                payload: data,
            });
        }
        return {
            status: 'ok',
        };
    } catch (err) {
        dispatch({ type: SET_SETTING_LOAING, payload: false });
        return {
            status: 'error',
            error: { other: 'Coś poszło nie tak' },
        };
    }
};

export const changeAccountData = (
    email,
    password,
    newPassword
) => async dispatch => {
    dispatch({ type: SET_SETTING_LOAING, payload: true });
    try {
        const user = auth.currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            password
        );

        await user.reauthenticateWithCredential(credential);

        if (email !== user.email) {
            await user.updateEmail(email);
        }
        if (newPassword && password) {
            await user.updatePassword(newPassword);
        }
        dispatch({ type: CHANGE_ACCOUNT_DATA, payload: email });

        return {
            status: 'ok',
        };
    } catch (err) {
        dispatch({ type: SET_SETTING_LOAING, payload: false });
        let error;
        switch (err.code) {
            case 'auth/wrong-password':
                error = { password: 'Wprowadziłeś złe hasło' };
                break;
            case 'auth/weak-password':
                error = { newPassword: 'Hasło musi zawierać minimum 6 znaków' };
                break;
            case 'auth/invalid-email':
                error = { email: 'Wprowadź prawidłowy email' };
                break;
            case 'auth/email-already-in-use':
                error = { email: 'Ten email jest już zajęty' };
                break;
            default:
                error = { other: 'Coś poszło nie tak' };
                break;
        }
        return {
            status: 'error',
            error,
        };
    }
};
