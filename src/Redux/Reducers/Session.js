import { combineReducers } from 'redux';
import {SESSION_LOGIN_STARTED, SESSION_LOGIN_SUCCESS, SESSION_LOGIN_ERROR} from '../Constants'

const isAuthenticated = (state = false, action) => {
    switch (action.type) {
        case SESSION_LOGIN_SUCCESS:
            return true
        case SESSION_LOGIN_ERROR:
            return false
        default:
            return state
    }
}


export const getSession = (state) => state.Session
export const getIsAuthenticated = (state) => state.Session.isAuthenticated

/* Combine the Reducers into a single Reducer and Export the Reducer Module */
export default combineReducers({
    isAuthenticated,
})