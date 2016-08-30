import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import Test from './Test';
import Session from './Session';

/* Combine the Reducers into a single Reducer and Export the Reducer Module */
module.exports = combineReducers({
  Test,
  Session,
  routing: routerReducer
});