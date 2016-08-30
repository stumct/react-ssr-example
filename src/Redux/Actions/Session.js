import {SESSION_LOGIN_STARTED, SESSION_LOGIN_SUCCESS, SESSION_LOGIN_ERROR,
    SESSION_REGISTER_STARTED, SESSION_REGISTER_SUCCESS, SESSION_REGISTER_ERROR} from '../Constants'
import {_login, _register} from '../../API'

export const login = (email, password) => {
    const loginAsyncAction = (dispatch, getState) => {
        return _login(email, password)
            .then(response => {
                if (response.error) {
                    dispatch(loginError(response.error))
                    return;
                }
                if (response.data) {
                    dispatch(loginSuccess(response.data))
                    return;
                }
                return response
            })
            .catch(err => dispatch(loginError(err)))
    }
    loginAsyncAction.meta = {};
    loginAsyncAction.type = 'SESSION_LOGIN_ASYNC_ACTION';
    return loginAsyncAction
}
const loginStarted = () => {
    return {
        type: SESSION_LOGIN_STARTED,
        payload: null
    }
}
const loginSuccess = (data) => {
    return {
        type: SESSION_LOGIN_SUCCESS,
        payload: { data }
    }
}
const loginError = (error) => {
    return {
        type: SESSION_LOGIN_ERROR,
        payload: { error },
        error: true
    }
}

export const register = (email, password) => {
    const registerAsyncAction = (dispatch, getState) => {
        return _register(email, password)
            .then(response => {
                if (response.error) {
                    dispatch(registerError(response.error))
                    return;
                }
                if (response.data) {
                    dispatch(registerSuccess(response.data))
                    return;
                }
                return response
            })
            .catch(err => dispatch(registerError(err)))
    }
    registerAsyncAction.meta = {};
    registerAsyncAction.type = 'SESSION_REGISTER_ASYNC_ACTION';
    return registerAsyncAction
}
const registerStarted = () => {
    return {
        type: SESSION_REGISTER_STARTED,
        payload: null
    }
}
const registerSuccess = (data) => {
    return {
        type: SESSION_REGISTER_SUCCESS,
        payload: { data }
    }
}
const registerError = (error) => {
    return {
        type: SESSION_LOGIN_ERROR,
        payload: { error },
        error: true
    }
}
