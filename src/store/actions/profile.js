import { database, storage } from '../../firebaseConfig';
import { SET_PROFILE_LOADING, GET_PROFILE } from './types';

export const getProfile = id => dispatch => {
    dispatch({ type: SET_PROFILE_LOADING, payload: true });
    database.ref('/users/' + id).once('value', async snapshot => {
        const user = snapshot.val();
        if (!user)
            return dispatch({ type: SET_PROFILE_LOADING, payload: false });

        // Check if avatar exists, else get the default
        const avatar = user.avatar
            ? user.avatar
            : await storage.ref('/avatars/default.jpg').getDownloadURL();

        database
            .ref(`/users/${id}/posts`)
            .orderByChild('date')
            .once('value', snapshot => {
                let posts = [];
                snapshot.forEach(post => {
                    posts.push(post.val());
                });
                if (posts.length === 0) {
                    return dispatch({
                        type: GET_PROFILE,
                        payload: {
                            nick: user.nick,
                            avatar,
                            desc: user.desc ? user.desc : '',
                            posts: null,
                        },
                    });
                }
                posts.reverse();
                const resPosts = [];
                let readyToSend = 0;
                posts.forEach(post => {
                    database
                        .ref(`/posts/${post.key}`)
                        .once('value', snapshot => {
                            resPosts.push({ ...snapshot.val(), key: post.key });
                        })
                        .then(() => {
                            readyToSend++;
                            if (readyToSend === posts.length) {
                                console.log({
                                    nick: user.nick,
                                    avatar,
                                    desc: user.desc ? user.desc : '',
                                    posts: resPosts,
                                });
                                dispatch({
                                    type: GET_PROFILE,
                                    payload: {
                                        nick: user.nick,
                                        avatar,
                                        desc: user.desc ? user.desc : '',
                                        posts: resPosts,
                                    },
                                });
                            }
                        });
                });
            });
    });
};
