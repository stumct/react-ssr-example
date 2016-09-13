import { createStore, applyMiddleware } from 'redux';
import { browserHistory, createMemoryHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import reducer from '../Reducers';
import loggerMiddleware from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../Sagas'

export const sagaMiddleware = createSagaMiddleware()

// setup the redux middleware array
const middleware = [];

export default (r, i, isServer) => {
    if (isServer) {
        middleware.push(routerMiddleware(createMemoryHistory()));
    } else {
        console.log(i)
        // apply dev only middleware
        if (process.env.NODE_ENV !== 'production') {
            // create the logger with default config (https://github.com/evgenyrodionov/redux-logger)
            middleware.push(loggerMiddleware());
        }
        middleware.push(routerMiddleware(browserHistory));
    }
    // apply redux-promise middleware to support promises on dispatch() (https://github.com/acdlite/redux-promise)
    middleware.push(promiseMiddleware, thunk, sagaMiddleware);


    const store = createStore(
        r ? r : reducer,
        i ? i : initialState,
        applyMiddleware(...middleware)
    );

    sagaMiddleware.run(rootSaga)

    return store
};