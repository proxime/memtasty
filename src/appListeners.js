import { auth, database, storage } from './firebaseConfig';
import { SET_USER, UNSET_USER, GET_USER_LIKES } from './store/actions/types';
import store from './store/store';

export const authStateListener = () => {
    auth.onAuthStateChanged(async user => {
        if (user) {
            let admin = false;
            user.getIdTokenResult().then(async idToknResult => {
                if (idToknResult.claims.admin) {
                    admin = true;
                }

                let thisUser = await database
                    .ref('/users/' + user.uid)
                    .once('value');
                thisUser = thisUser.val();

                store.dispatch({
                    type: SET_USER,
                    payload: {
                        id: user.uid,
                        nick: thisUser.nick,
                        email: user.email,
                        avatar: thisUser.avatar,
                        emailVerified: user.emailVerified,
                        desc: thisUser.desc ? thisUser.desc : '',
                        admin,
                    },
                });

                database
                    .ref(`/users/${user.uid}/likes`)
                    .once('value', snapshopt => {
                        const data = snapshopt.val();
                        const likes = [];
                        for (const key in data) {
                            likes.push(data[key]);
                        }
                        store.dispatch({
                            type: GET_USER_LIKES,
                            payload: likes,
                        });
                    });
            });
        } else {
            store.dispatch({
                type: UNSET_USER,
            });
        }
    });
};
