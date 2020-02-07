import { SET_ALERT } from './types';

export const setAlert = (title, msg, func) => dispatch => {
    dispatch({
        type: SET_ALERT,
        payload: {
            title,
            msg,
            func,
        },
    });
};
