import {
    SET_POST_LOADING,
    SET_POST_PROGGRESS,
    CREATE_POST,
    GET_POSTS,
    ADD_LIKE,
    ADD_USER_LIKES,
    GET_USER_LIKES,
    UNSET_USER,
    GET_USER_POSTS,
    GET_SINGLE_POST,
    ADD_COMMENT,
    LIKE_COMMENT,
    GET_USER_LIKED_COMMENTS,
    DELETE_COMMENT,
    LIKE_REPLY,
    ADD_REPLY,
    DELETE_REPLY,
    ADD_POST_TO_MAIN,
} from '../actions/types';

const initState = {
    loading: false,
    changeProggress: 0,
    userPosts: [],
    downloadedPosts: [],
    myLikes: [],
    myCommentLikes: {},
    pages: 0,
    singlePost: null,
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_POST_LOADING:
            return {
                ...state,
                loading: payload,
            };
        case SET_POST_PROGGRESS:
            return {
                ...state,
                changeProggress: payload,
            };
        case CREATE_POST:
            return {
                ...state,
                loading: false,
                changeProggress: 0,
            };
        case GET_POSTS:
            return {
                ...state,
                downloadedPosts: payload.posts,
                pages: payload.pages,
                loading: false,
            };
        case ADD_LIKE:
            if (payload.place === 'user') {
                const postIndex = state.userPosts.findIndex(
                    post => post.key === payload.key
                );
                const newPosts = [...state.userPosts];
                newPosts[postIndex].likes = payload.likes;
                return {
                    ...state,
                    userPosts: newPosts,
                };
            } else if (
                payload.place === 'waitingRoom' ||
                payload.place === 'home'
            ) {
                const postIndex = state.downloadedPosts.findIndex(
                    post => post.key === payload.key
                );
                const newPosts = [...state.downloadedPosts];
                newPosts[postIndex].likes = payload.likes;
                return {
                    ...state,
                    downloadedPosts: newPosts,
                };
            } else if (payload.place === 'single') {
                return {
                    ...state,
                    singlePost: {
                        ...state.singlePost,
                        likes: payload.likes,
                    },
                };
            } else {
                return state;
            }
        case GET_USER_LIKES:
            return {
                ...state,
                myLikes: payload,
            };
        case ADD_USER_LIKES:
            return {
                ...state,
                myLikes: [...state.myLikes, payload],
            };
        case UNSET_USER:
            return {
                ...state,
                myLikes: [],
                userPosts: [],
            };
        case GET_USER_POSTS:
            return {
                ...state,
                userPosts: payload,
                loading: false,
            };
        case GET_SINGLE_POST:
            return {
                ...state,
                singlePost: payload,
                loading: false,
            };
        case ADD_COMMENT:
            const postComments = [payload, ...state.singlePost.comments];
            return {
                ...state,
                singlePost: {
                    ...state.singlePost,
                    comments: postComments,
                },
            };
        case ADD_REPLY:
            const newPostComments = [...state.singlePost.comments].map(item => {
                if (item.key === payload.commentId) {
                    item.replies.push(payload.data);
                }
                return item;
            });
            return {
                ...state,
                singlePost: {
                    ...state.singlePost,
                    comments: newPostComments,
                },
            };
        case LIKE_COMMENT:
            const newComments = [...state.singlePost.comments].map(item => {
                if (item.key === payload.commentId)
                    item.points = payload.points;
                return item;
            });
            return {
                ...state,
                singlePost: {
                    ...state.singlePost,
                    comments: newComments,
                },
                myCommentLikes: {
                    ...state.myCommentLikes,
                    [payload.commentId]: { type: payload.type },
                },
            };
        case LIKE_REPLY:
            const newReplies = [...state.singlePost.comments].map(item => {
                if (item.key === payload.commentId) {
                    item.replies.map(reply => {
                        if (reply.key === payload.replyId) {
                            reply.points = payload.points;
                        }
                        return reply;
                    });
                }
                return item;
            });
            return {
                ...state,
                singlePost: {
                    ...state.singlePost,
                    comments: newReplies,
                },
                myCommentLikes: {
                    ...state.myCommentLikes,
                    [payload.replyId]: { type: payload.type },
                },
            };
        case GET_USER_LIKED_COMMENTS:
            return {
                ...state,
                myCommentLikes: payload,
            };
        case DELETE_COMMENT:
            const deleteComments = [...state.singlePost.comments].filter(
                comment => comment.key !== payload
            );
            return {
                ...state,
                singlePost: {
                    ...state.singlePost,
                    comments: deleteComments,
                },
            };
        case DELETE_REPLY:
            const deleteReplies = [...state.singlePost.comments].map(
                comment => {
                    if (comment.key === payload.commentId) {
                        comment.replies = comment.replies.filter(
                            reply => reply.key !== payload.replyId
                        );
                    }
                    return comment;
                }
            );
            return {
                ...state,
                singlePost: {
                    ...state.singlePost,
                    comments: deleteReplies,
                },
            };
        case ADD_POST_TO_MAIN:
            const singlePostId = state.singlePost.key;
            const updatedDownloadedPosts = [...state.downloadedPosts].map(
                item => {
                    if (item.key === singlePostId) {
                        item.status = 'main';
                    }
                    return item;
                }
            );
            return {
                ...state,
                downloadedPosts: updatedDownloadedPosts,
            };
        default:
            return state;
    }
};
