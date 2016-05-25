import React from 'react';
import ReactDOM from 'react-dom';
import {match,  Router, browserHistory} from 'react-router'
import routes from './Routes/RootRoute'

// We render the parent Router component using the match function. This means that client and server are in sync
match({ history:browserHistory, routes }, (error, redirectLocation, renderProps) => {
  ReactDOM.render(<Router {...renderProps} />, document.getElementById('app'))
})