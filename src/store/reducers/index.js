import { combineReducers } from 'redux';
import authReducer from './auth';
import postsReducer from './posts';
import profileReducer from './profile';

const rootReducer = combineReducers({
    auth: authReducer,
    posts: postsReducer,
    profile: profileReducer,
});

export default rootReducer;
