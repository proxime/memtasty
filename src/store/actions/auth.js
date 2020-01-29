import { auth, database, storage } from '../../firebaseConfig';

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
            uid: res.user.uid,
            email: res.user.email,
            nick,
            avatar: null,
            emailVerified: res.user.emailVerified,
            status: 'normal',
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

export const changeProfileData = (nick, desc, avatar) => async dispatch => {
    const user = auth.currentUser;
    console.log(user);

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
        await storage.ref(`/avatars/${user.uid}`).put(avatar);
        const avatarUrl = await storage
            .ref(`/avatars/${user.uid}`)
            .getDownloadURL();
        data.avatar = avatarUrl;
    }

    database.ref(`/users/${user.uid}`).update(data);
};
