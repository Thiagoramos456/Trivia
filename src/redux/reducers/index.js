import { combineReducers } from 'redux';
import login from './loginReducer';
import tokenReducer from './tokenReducer';
import gameData from './gameDataReducer';

const rootReducer = combineReducers({ login, tokenReducer, gameData });

export default rootReducer;
