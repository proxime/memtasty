import { auth, database, storage } from './firebaseConfig';
import { SET_USER, UNSET_USER } from './store/actions/types';
import store from './store/store';

export const authStateListener = () => {
    auth.onAuthStateChanged(async user => {
        if (user) {
            let thisUser = await database
                .ref('/users/' + user.uid)
                .once('value');
            thisUser = thisUser.val();

            // Check if avatar exists, else get the default
            const avatar = thisUser.avatar
                ? thisUser.avatar
                : await storage.ref('/avatars/default.jpg').getDownloadURL();

            store.dispatch({
                type: SET_USER,
                payload: {
                    id: user.uid,
                    nick: thisUser.nick,
                    email: user.email,
                    avatar,
                    emailVerified: user.emailVerified,
                    desc: thisUser.desc ? thisUser.desc : null,
                },
            });
        } else {
            store.dispatch({
                type: UNSET_USER,
            });
        }
    });
};
