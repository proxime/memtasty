import {
    SET_POST_LOADING,
    SET_POST_PROGGRESS,
    CREATE_POST,
    GET_WAITING_POSTS,
} from './types';
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
                        payload: imageId,
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

export const getWaitingPosts = page => dispatch => {
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
            fetch('https://memtasty.firebaseio.com/posts.json?shallow=true')
                .then(res => res.json())
                .then(data => {
                    let count = 0;
                    for (const key in data) {
                        count++;
                    }

                    const pages = Math.floor(count / 7) + 1;

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
