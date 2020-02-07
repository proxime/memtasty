import { combineReducers } from 'redux';
import authReducer from './auth';
import postsReducer from './posts';
import profileReducer from './profile';
import alertReducer from './alert';

const rootReducer = combineReducers({
    auth: authReducer,
    posts: postsReducer,
    profile: profileReducer,
    alert: alertReducer,
});

export default rootReducer;
