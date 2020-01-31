import {
    SET_POST_LOADING,
    SET_POST_PROGGRESS,
    CREATE_POST,
    GET_WAITING_POSTS,
} from '../actions/types';

const initState = {
    loading: false,
    changeProggress: 0,
    userPosts: [],
    waitingPosts: [],
    pages: 0,
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
                userPosts: [payload, ...state.userPosts],
            };
        case GET_WAITING_POSTS:
            return {
                ...state,
                waitingPosts: payload.posts,
                pages: payload.pages,
                loading: false,
            };
        default:
            return state;
    }
};
