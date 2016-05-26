import React from 'react';
import ReactDOM from 'react-dom';
import {match,  Router, browserHistory} from 'react-router'
import routes from './Routes/RootRoute'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './Redux/reducers'

let initialState = window.__INITIAL_STATE__ || {test:[]}
let store = createStore(reducer, initialState)


// We render the parent Router component using the match function. This means that client and server are in sync
match({ history:browserHistory, routes }, (error, redirectLocation, renderProps) => {
  ReactDOM.render(<Provider store={store}><Router {...renderProps} /></Provider>, document.getElementById('app'))
})