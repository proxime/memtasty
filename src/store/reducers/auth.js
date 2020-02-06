import {
    SET_USER,
    UNSET_USER,
    SET_SETTING_LOAING,
    CHANGE_PROFILE_DATA,
    SET_SETTING_PROGGRESS,
    CHANGE_ACCOUNT_DATA,
    TOGGLE_LOGIN_WINDOW,
} from '../actions/types';

const initState = {
    user: null,
    loading: true,
    settingsLoading: false,
    changeProggress: 0,
    openWinow: null,
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
                    admin: payload.admin,
                },
                loading: false,
            };
        case UNSET_USER:
            return {
                ...state,
                user: null,
                loading: false,
            };
        case SET_SETTING_LOAING:
            return {
                ...state,
                settingsLoading: payload,
            };
        case CHANGE_PROFILE_DATA:
            return {
                ...state,
                settingsLoading: false,
                user: {
                    ...state.user,
                    ...payload,
                },
                changeProggress: 0,
            };
        case CHANGE_ACCOUNT_DATA:
            return {
                ...state,
                settingsLoading: false,
                user: {
                    ...state.user,
                    email: payload,
                },
            };
        case SET_SETTING_PROGGRESS:
            return {
                ...state,
                changeProggress: payload,
            };
        case TOGGLE_LOGIN_WINDOW:
            return {
                ...state,
                openWinow: payload,
            };
        default:
            return state;
    }
};
