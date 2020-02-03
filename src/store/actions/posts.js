import {
    SET_POST_LOADING,
    SET_POST_PROGGRESS,
    CREATE_POST,
    GET_WAITING_POSTS,
    ADD_LIKE,
    ADD_USER_LIKES,
    GET_USER_POSTS,
    GET_SINGLE_POST,
    ADD_COMMENT,
} from './types';
import { toggleLoginWindow } from './auth';
import { auth, storage, database } from '../../firebaseConfig';
import uuidv4 from 'uuid/v4';

export const createPost = (
    data,
    tags,
    file,
    setFileError
) => async dispatch => {
    dispatch({ type: SET_POST_LOADING, payload: true });
    const user = auth.currentUser;
    const uid = user.uid;
    const imageId = uuidv4();

    try {
        if (!data || !tags || !file || !uid) throw new Error('Błąd');

        const upload = storage.ref(`/content/${imageId}`).put(file);

        upload.on(
            'state_changed',
            snapshot => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                dispatch({
                    type: SET_POST_PROGGRESS,
                    payload: progress,
                });
            },
            err => {
                dispatch({ type: SET_POST_LOADING, payload: false });
                setFileError(
                    'Plik nie może przekroczyć 20MB, i musi mieć odpowiedni format!'
                );
            },
            async () => {
                try {
                    const imageUrl = await storage
                        .ref(`/content/${imageId}`)
                        .getDownloadURL();

                    const date = new Date().getTime();

                    const formData = {
                        owner: uid,
                        data: {
                            url: imageUrl,
                            type: file.type,
                            title: data.title,
                            desc: data.desc,
                            tags: tags,
                            category: data.category,
                            is18: data.is18,
                        },
                        likes: 0,
                        comments: [],
                        status: 'waiting',
                        date,
                    };

                    await database.ref(`/posts/${imageId}`).set(formData);
                    await database.ref(`/users/${uid}/posts/`).push({
                        key: imageId,
                        date,
                    });
                    dispatch({
                        type: CREATE_POST,
                    });
                } catch (err) {
                    dispatch({ type: SET_POST_LOADING, payload: false });
                }
            }
        );

        return {
            status: 'ok',
        };
    } catch (err) {
        dispatch({ type: SET_POST_LOADING, payload: false });
        return {
            status: 'error',
            error: { other: 'Coś poszło nie tak' },
        };
    }
};

export const getWaitingPosts = page => async dispatch => {
    dispatch({ type: SET_POST_LOADING, payload: true });
    database
        .ref('/posts/')
        .orderByChild('date')
        .limitToLast(page * 7)
        .once('value', snapshot => {
            const posts = [];
            snapshot.forEach(snap => {
                posts.push(snap);
            });
            const returnPosts = [];
            for (let i = 0; i < 7; ++i) {
                if (posts[i]) {
                    returnPosts[i] = posts[i].val();
                    returnPosts[i].key = posts[i].key;
                } else {
                    break;
                }
            }
            returnPosts.reverse();

            for (let i = 0; i < returnPosts.length; ++i) {
                database
                    .ref(`/users/${returnPosts[i].owner}`)
                    .once('value', snapshopt => {
                        const owner = snapshopt.val();
                        if (!owner) return;
                        returnPosts[i].avatar = owner.avatar;
                        returnPosts[i].nick = owner.nick;
                    });
            }

            fetch('https://memtasty.firebaseio.com/posts.json?shallow=true')
                .then(res => res.json())
                .then(data => {
                    let count = 0;
                    for (const key in data) {
                        count++;
                    }
                    const val = Number.isInteger(count / 7) ? 0 : 1;
                    const pages = Math.floor(count / 7) + val;
                    let otherPosts = count - page * 7;
                    if (otherPosts < 0) {
                        otherPosts *= -1;
                        returnPosts.splice(0, otherPosts);
                    }

                    dispatch({
                        type: GET_WAITING_POSTS,
                        payload: {
                            posts: returnPosts,
                            pages,
                        },
                    });
                });
        });
};

export const addLike = (status, postId, type, place) => dispatch => {
    const user = auth.currentUser;
    if (!user) return dispatch(toggleLoginWindow('login'));

    database.ref(`/users/${user.uid}/likes`).once('value', snapshopt => {
        const data = snapshopt.val();
        let exists = false;
        for (const key in data) {
            if (data[key].id === postId) exists = true;
        }
        if (exists) return;

        database.ref(`/users/${user.uid}/likes`).push({
            id: postId,
            type,
        });
        dispatch({
            type: ADD_USER_LIKES,
            payload: {
                id: postId,
                type,
            },
        });

        let store;
        let value;

        if (status === 'waiting') store = 'posts';

        if (type === 'increase') value = 1;
        else value = -1;

        const ref = database.ref(`/${store}/${postId}`);
        ref.once('value', snapshot => {
            const resLikes = snapshot.val().likes;
            ref.update({ likes: resLikes + value }, err => {
                if (!err) {
                    dispatch({
                        type: ADD_LIKE,
                        payload: {
                            key: postId,
                            likes: resLikes + value,
                            place,
                        },
                    });
                }
            });
        });
    });
};

export const getLoggedUserPosts = () => dispatch => {
    dispatch({ type: SET_POST_LOADING, payload: true });
    const user = auth.currentUser;
    database
        .ref(`/users/${user.uid}/posts`)
        .orderByChild('date')
        .once('value', snapshot => {
            let posts = [];
            snapshot.forEach(post => {
                posts.push(post.val());
            });
            if (posts.length === 0) {
                dispatch({ type: SET_POST_LOADING, payload: false });
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
                            dispatch({
                                type: GET_USER_POSTS,
                                payload: resPosts,
                            });
                        }
                    });
            });
        });
};

export const getSinglePost = id => dispatch => {
    dispatch({ type: SET_POST_LOADING, payload: true });
    database.ref(`/posts/${id}`).once('value', snapshopt => {
        const post = snapshopt.val();
        if (!post) return dispatch({ type: SET_POST_LOADING, payload: false });
        post.key = snapshopt.key;
        const postsTable = [];
        for (const key in post.comments) {
            postsTable.push({ ...post.comments[key], key });
        }
        post.comments = postsTable;

        database
            .ref(`/users/${post.owner}`)
            .once('value', snapshopt => {
                const owner = snapshopt.val();
                if (!owner) return;
                post.avatar = owner.avatar;
                post.nick = owner.nick;
            })
            .then(() => {
                if (!post.comments.length) {
                    return dispatch({
                        type: GET_SINGLE_POST,
                        payload: post,
                    });
                }
                for (let i = 0; i < post.comments.length; ++i) {
                    database
                        .ref(`/users/${post.comments[i].owner}`)
                        .once('value', snapshot => {
                            const owner = snapshot.val();
                            if (!owner) {
                                post.comments[i].nick =
                                    'Nieistniejący użytkownik';
                            }
                            post.comments[i].avatar = owner.avatar;
                            post.comments[i].nick = owner.nick;
                        })
                        .then(() => {
                            if (i === post.comments.length - 1) {
                                dispatch({
                                    type: GET_SINGLE_POST,
                                    payload: post,
                                });
                            }
                        });
                }
            });
    });
};

export const addComment = (postId, comment) => async (dispatch, getState) => {
    const user = auth.currentUser;
    const thisUser = getState().auth.user;
    if (!user) return;
    const date = new Date().getTime();
    const formData = {
        comment,
        owner: user.uid,
        date,
        points: 0,
    };

    try {
        const newPostKey = database.ref(`/posts/${postId}/comments`).push().key;
        await database
            .ref(`/posts/${postId}/comments/${newPostKey}`)
            .set(formData);

        await database
            .ref(`/users/${user.uid}/comments/${newPostKey}`)
            .set(formData);

        dispatch({
            type: ADD_COMMENT,
            payload: {
                ...formData,
                nick: thisUser.nick,
                avatar: thisUser.avatar,
            },
        });

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};
