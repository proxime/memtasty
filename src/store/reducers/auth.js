import { SET_USER, UNSET_USER } from '../actions/types';

const initState = {
    user: null,
    loading: true,
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_USER:
            return {
                ...state,
                user: {
                    id: payload.id,
                    email: payload.email,
                    nick: payload.nick,
                    avatar: payload.avatar,
                    emailVerified: payload.emailVerified,
                    desc: payload.desc,
                },
                loading: false,
            };
        case UNSET_USER:
            return {
                ...state,
                user: null,
                loading: false,
            };
        default:
            return state;
    }
};
