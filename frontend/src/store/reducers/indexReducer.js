// reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReducer from './postReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer
});

export default rootReducer;
