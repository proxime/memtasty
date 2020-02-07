import {
    SET_POST_LOADING,
    SET_POST_PROGGRESS,
    CREATE_POST,
    GET_POSTS,
    ADD_LIKE,
    ADD_USER_LIKES,
    GET_USER_POSTS,
    GET_SINGLE_POST,
    ADD_COMMENT,
    LIKE_COMMENT,
    GET_USER_LIKED_COMMENTS,
    DELETE_COMMENT,
    ADD_REPLY,
    LIKE_REPLY,
    DELETE_REPLY,
    ADD_POST_TO_MAIN,
} from './types';
import { toggleLoginWindow } from './auth';
import { setAlert } from './alert';
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
                    await database.ref(`/users/${uid}/posts/${imageId}`).set({
                        key: imageId,
                        date,
                        status: 'waiting',
                    });
                    dispatch({
                        type: CREATE_POST,
                    });
                    dispatch(
                        setAlert(
                            'Sukces!',
                            'Twój post został pomyślnie dodany. Możesz go znaleźć w poczekalni, jeśli spodoba się naszym użytkownikom trafi na stronę główną!'
                        )
                    );
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

export const getPosts = (page, from) => async dispatch => {
    dispatch({ type: SET_POST_LOADING, payload: true });
    database
        .ref(`/${from}/`)
        .orderByChild('date')
        .limitToLast(page * 7)
        .once('value', snapshot => {
            const posts = [];
            if (!snapshot.val()) {
                return dispatch({
                    type: GET_POSTS,
                    payload: {
                        posts: [],
                        pages: 1,
                    },
                });
            }
            snapshot.forEach(snap => {
                posts.push(snap);
            });
            const returnPosts = [];
            for (let i = 0; i < 7; ++i) {
                if (posts[i]) {
                    returnPosts[i] = posts[i].val();
                    returnPosts[i].key = posts[i].key;
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
                    })
                    .then(() => {
                        if (i === returnPosts.length - 1) {
                            fetch(
                                `https://memtasty.firebaseio.com/${from}.json?shallow=true`
                            )
                                .then(res => res.json())
                                .then(data => {
                                    let count = 0;
                                    for (const key in data) {
                                        count++;
                                    }
                                    const val = Number.isInteger(count / 7)
                                        ? 0
                                        : 1;
                                    const pages = Math.floor(count / 7) + val;
                                    let otherPosts = count - page * 7;
                                    if (otherPosts < 0 && count > 7) {
                                        otherPosts *= -1;
                                        returnPosts.splice(0, otherPosts);
                                    }

                                    dispatch({
                                        type: GET_POSTS,
                                        payload: {
                                            posts: returnPosts,
                                            pages,
                                        },
                                    });
                                });
                        }
                    });
            }
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

        let value;

        const from = status === 'waiting' ? 'posts' : 'mainPosts';

        if (type === 'increase') value = 1;
        else value = -1;

        const ref = database.ref(`/${from}/${postId}`);
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
                const from = post.status === 'waiting' ? 'posts' : 'mainPosts';
                database
                    .ref(`/${from}/${post.key}`)
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

export const getSinglePost = (id, from) => (dispatch, getState) => {
    dispatch({ type: SET_POST_LOADING, payload: true });
    const downloadedPosts = getState().posts.downloadedPosts;
    const singlePost = downloadedPosts.find(item => item.key === id);
    if (singlePost) {
        const postsTable = [];
        let index = 0;
        for (const key in singlePost.comments) {
            postsTable.push({ ...singlePost.comments[key], key, replies: [] });
            for (const id in singlePost.comments[key].replies) {
                postsTable[index].replies.push({
                    ...singlePost.comments[key].replies[id],
                    key: id,
                });
            }
            index++;
        }
        singlePost.comments = postsTable;

        dispatch(getPostComments(singlePost));
    } else {
        database.ref(`/${from}/${id}`).once('value', snapshopt => {
            const post = snapshopt.val();
            if (!post)
                return dispatch({ type: SET_POST_LOADING, payload: false });
            post.key = snapshopt.key;
            const postsTable = [];
            let index = 0;
            for (const key in post.comments) {
                postsTable.push({ ...post.comments[key], key, replies: [] });
                for (const id in post.comments[key].replies) {
                    postsTable[index].replies.push({
                        ...post.comments[key].replies[id],
                        key: id,
                    });
                }
                index++;
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
                    dispatch(getPostComments(post));
                });
        });
    }
};

export const getPostComments = post => dispatch => {
    const getData = async () => {
        for (let i = 0; i < post.comments.length; ++i) {
            for (let k = 0; k < post.comments[i].replies.length; ++k) {
                const reply = post.comments[i].replies[k];
                database
                    .ref(`/users/${reply.owner}`)
                    .once('value', snapshopt => {
                        const owner = snapshopt.val();
                        if (!owner) return;
                        post.comments[i].replies[k].avatar = owner.avatar;
                        post.comments[i].replies[k].nick = owner.nick;
                    });
            }
        }
    };

    getData().then(() => {
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
                        post.comments[i].nick = 'Nieistniejący użytkownik';
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
};

export const getUserLikedComments = () => dispatch => {
    const user = auth.currentUser;
    if (user) {
        const likedComments = {};
        database
            .ref(`/users/${user.uid}/commentLikes`)
            .once('value', res =>
                res.forEach(item => {
                    likedComments[item.key] = item.val();
                })
            )
            .then(() => {
                dispatch({
                    type: GET_USER_LIKED_COMMENTS,
                    payload: likedComments,
                });
            });
    } else {
        dispatch({
            type: GET_USER_LIKED_COMMENTS,
            payload: {},
        });
    }
};

export const addComment = (postId, comment, from) => async (
    dispatch,
    getState
) => {
    const user = auth.currentUser;
    const thisUser = getState().auth.user;
    if (!user) return;
    const date = new Date().getTime();
    const formData = {
        comment,
        owner: user.uid,
        date,
        points: 0,
        replies: [],
    };

    try {
        const newPostKey = database.ref(`/posts/${postId}/comments`).push().key;
        await database
            .ref(`/${from}/${postId}/comments/${newPostKey}`)
            .set(formData);

        await database
            .ref(`/users/${user.uid}/comments/${newPostKey}`)
            .set(formData);

        formData.key = newPostKey;
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

export const likeComment = (postId, commentId, value, from) => dispatch => {
    const user = auth.currentUser;
    if (!user) return dispatch(toggleLoginWindow('login'));
    database
        .ref(`/users/${user.uid}/commentLikes/${commentId}`)
        .once('value', res => {
            if (!res.val()) {
                database
                    .ref(`/${from}/${postId}/comments/${commentId}`)
                    .once('value', snapshot => {
                        const points = snapshot.val().points;
                        database
                            .ref(`/${from}/${postId}/comments/${commentId}`)
                            .update({
                                points: points + value,
                            });
                        database
                            .ref(`/users/${user.uid}/commentLikes/${commentId}`)
                            .set({
                                type: value === 1 ? 'increment' : 'decrement',
                            })
                            .then(() => {
                                dispatch({
                                    type: LIKE_COMMENT,
                                    payload: {
                                        commentId,
                                        points: points + value,
                                        type:
                                            value === 1
                                                ? 'increment'
                                                : 'decrement',
                                    },
                                });
                            });
                    });
            }
        });
};

export const deleteComment = (postId, commentId, from) => dispatch => {
    database
        .ref(`/${from}/${postId}/comments/${commentId}`)
        .remove()
        .then(() => {
            dispatch({
                type: DELETE_COMMENT,
                payload: commentId,
            });
            dispatch(
                setAlert('Sukces!', 'Twój komentarz został pomyslnie usunięty')
            );
        })
        .catch(err => {
            console.log(err);
        });
};

export const addReply = (postId, commentId, text, from) => async (
    dispatch,
    getState
) => {
    const user = auth.currentUser;
    const thisUser = getState().auth.user;
    if (!user) return;
    const date = new Date().getTime();
    const formData = {
        comment: text,
        owner: user.uid,
        date,
        points: 0,
    };

    try {
        const newPostKey = database
            .ref(`/${from}/${postId}/comments/${commentId}/replies`)
            .push().key;

        await database
            .ref(
                `/${from}/${postId}/comments/${commentId}/replies/${newPostKey}`
            )
            .set(formData);

        formData.key = newPostKey;
        dispatch({
            type: ADD_REPLY,
            payload: {
                data: {
                    ...formData,
                    nick: thisUser.nick,
                    avatar: thisUser.avatar,
                },
                commentId,
            },
        });

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const likeReply = (
    postId,
    commentId,
    replyId,
    value,
    from
) => dispatch => {
    const user = auth.currentUser;
    if (!user) return dispatch(toggleLoginWindow('login'));
    database
        .ref(`/users/${user.uid}/commentLikes/${replyId}`)
        .once('value', res => {
            if (!res.val()) {
                database
                    .ref(
                        `/${from}/${postId}/comments/${commentId}/replies/${replyId}`
                    )
                    .once('value', snapshot => {
                        const points = snapshot.val().points;
                        database
                            .ref(
                                `/${from}/${postId}/comments/${commentId}/replies/${replyId}`
                            )
                            .update({
                                points: points + value,
                            });
                        database
                            .ref(`/users/${user.uid}/commentLikes/${replyId}`)
                            .set({
                                type: value === 1 ? 'increment' : 'decrement',
                            })
                            .then(() => {
                                dispatch({
                                    type: LIKE_REPLY,
                                    payload: {
                                        replyId,
                                        commentId,
                                        points: points + value,
                                        type:
                                            value === 1
                                                ? 'increment'
                                                : 'decrement',
                                    },
                                });
                            });
                    });
            }
        });
};

export const deleteReply = (postId, commentId, replyId, from) => dispatch => {
    database
        .ref(`/${from}/${postId}/comments/${commentId}/replies/${replyId}`)
        .remove()
        .then(() => {
            dispatch({
                type: DELETE_REPLY,
                payload: {
                    commentId,
                    replyId,
                },
            });
            dispatch(
                setAlert(
                    'Sukces!',
                    'Twoja odpowiedź do komentarza została pomyslnie usunięta'
                )
            );
        })
        .catch(err => {
            console.log(err);
        });
};

export const addPostToMain = (postId, history) => dispatch => {
    database.ref(`/posts/${postId}`).once('value', snapshot => {
        const post = snapshot.val();
        if (!post) return;
        post.status = 'main';
        post.mainTime = new Date().getTime();
        database
            .ref(`/mainPosts/${postId}`)
            .set(post)
            .then(() => {
                database
                    .ref(`/posts/${postId}`)
                    .remove()
                    .then(() => {
                        dispatch({ type: ADD_POST_TO_MAIN });
                        dispatch(
                            setAlert(
                                'Sukces!',
                                'Post został pomyslnie dodany do strony głównej',
                                () => history.push(`/mainPost/${postId}`)
                            )
                        );
                    });

                database
                    .ref(`/users/${post.owner}/posts/${postId}`)
                    .update({ status: 'main' });
            });
    });
};

export const deletePost = (postId, place, history) => dispatch => {
    const from = place === 'post' ? 'posts' : 'mainPosts';
    const backTo = place === 'post' ? '/waiting' : '/';
    database
        .ref(`/${from}/${postId}`)
        .once('value', snapshot => {
            const post = snapshot.val();
            console.log(post);
            if (!post) return;
            database.ref(`/${from}/${postId}`).remove();
            database.ref(`/users/${post.owner}/posts/${postId}`).remove();
        })
        .then(() => {
            dispatch(
                setAlert('Sukces!', 'Post został pomyslnie usunięty', () => {
                    history.push(`${backTo}`);
                })
            );
            storage
                .ref(`/content/${postId}`)
                .delete()
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
};

export const getRandomPost = history => dispatch => {
    fetch(`https://memtasty.firebaseio.com/mainPosts.json?shallow=true`)
        .then(res => res.json())
        .then(data => {
            const dataArray = [];
            for (const key in data) {
                dataArray.push(key);
            }

            const randomNumber = Math.floor(Math.random() * dataArray.length);
            const randomKey = dataArray[randomNumber];

            history.push(`/mainPost/${randomKey}`);
        });
};
