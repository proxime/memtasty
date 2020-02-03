import { SET_PROFILE_LOADING, GET_PROFILE, ADD_LIKE } from '../actions/types';

const initState = {
    profile: null,
    loading: false,
};

export default (state = initState, action) => {
    const { payload, type } = action;

    switch (type) {
        case SET_PROFILE_LOADING:
            return {
                ...state,
                loading: payload,
            };
        case GET_PROFILE:
            return {
                ...state,
                loading: false,
                profile: payload,
            };
        case ADD_LIKE:
            if (payload.place === 'profile') {
                const postIndex = state.profile.posts.findIndex(
                    post => post.key === payload.key
                );
                const newPosts = [...state.profile.posts];
                newPosts[postIndex].likes = payload.likes;
                return {
                    ...state,
                    profile: {
                        ...state.profile,
                        newPosts,
                    },
                };
            } else {
                return state;
            }
        default:
            return state;
    }
};
