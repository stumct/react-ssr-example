import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../../../src/Routes';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../../src/Redux/Reducers';
import storeCreator from '../../../src/Redux/Store';
import initialState from '../../../src/Redux/Store/initialState';
import App from '../../../src/Components/App'

export default (app, router) => {

    router.get('*', (req, res) => {

        const store = storeCreator(null, initialState, true);
        // use react-router's match function to match the incoming route and render based on the application routes
        match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
            if (error)
                res.send('ERROR!', res); // handle an error
            else if (redirectLocation)
                res.redirect(301, redirectLocation.pathname); // handle a redirect
            else if (renderProps) {
                // render our html page (using ejs template)
                res.render('pages/index', {
                    initialState: JSON.stringify(store.getState()),
                    app: renderToString(<Provider store={store}><RouterContext {...renderProps} /></Provider>)
                });
            }
            else
                res.send('not found!'); // handle any other condition
        });
    });

    app.use('/', router);
}