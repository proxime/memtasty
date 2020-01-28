import { auth } from '../../firebaseConfig';

export const createAccount = (email, password) => async () => {
    try {
        await auth.createUserWithEmailAndPassword(email, password);
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
