import { auth } from './firebaseConfig';
import { SET_USER, UNSET_USER } from './store/actions/types';
import store from './store/store';

export const authStateListener = () => {
    auth.onAuthStateChanged(user => {
        if (user) {
            store.dispatch({
                type: SET_USER,
                payload: {
                    id: user.uid,
                    email: user.email,
                    nick: user.displayName,
                    avatar: user.photoURL,
                    emailVerified: user.emailVerified,
                },
            });
        } else {
            store.dispatch({
                type: UNSET_USER,
            });
        }
    });
};
