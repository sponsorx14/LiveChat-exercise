import { combineReducers } from 'redux';
import usersReducer from './reducer_users';

const rootReducer = combineReducers({
  users: usersReducer
});

export default rootReducer;
