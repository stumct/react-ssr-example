import React from 'react'
import ReactDOM from 'react-dom'
import { match, Router, browserHistory } from 'react-router'
import routes from './Routes'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import storeCreator from './Redux/Store'
const store = storeCreator(null, window.__INITIAL_STATE__ || null, false); //create the redux store, use the initial state loaded via SSR if it exists.

 const history = syncHistoryWithStore(browserHistory, store)

 //browserHistory.listen(OnRouteChange.bind(this, store));

// We render the parent Router component using the match function. This means that client and server are in sync.
// The redux store is imported and passed in to the Provider component.
// Changes here must also be made to the server version.
match({ history:history, routes }, (error, redirectLocation, renderProps) => {
  ReactDOM.render(<Provider store={store}><Router {...renderProps} history={browserHistory} /></Provider>, document.getElementById('app'))
})