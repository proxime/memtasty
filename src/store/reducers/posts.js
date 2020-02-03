import {
    SET_POST_LOADING,
    SET_POST_PROGGRESS,
    CREATE_POST,
    GET_WAITING_POSTS,
    ADD_LIKE,
    ADD_USER_LIKES,
    GET_USER_LIKES,
    UNSET_USER,
    GET_USER_POSTS,
    GET_SINGLE_POST,
    ADD_COMMENT,
} from '../actions/types';

const initState = {
    loading: false,
    changeProggress: 0,
    userPosts: [],
    waitingPosts: [],
    myLikes: [],
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
        case GET_WAITING_POSTS:
            return {
                ...state,
                waitingPosts: payload.posts,
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
            } else if (payload.place === 'waitingRoom') {
                const postIndex = state.waitingPosts.findIndex(
                    post => post.key === payload.key
                );
                const newPosts = [...state.waitingPosts];
                newPosts[postIndex].likes = payload.likes;
                return {
                    ...state,
                    waitingPosts: newPosts,
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
            const postComments = [...state.singlePost.comments, payload];
            console.log(postComments);
            return {
                ...state,
                singlePost: {
                    ...state.singlePost,
                    comments: postComments,
                },
            };
        default:
            return state;
    }
};
