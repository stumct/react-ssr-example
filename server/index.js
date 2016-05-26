import path from 'path'
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import routes from '../src/routes/RootRoute'
import reducer from '../src/Redux/reducers'

const app = express();
// set the path to the views folder and set the view engine to ejs
app.set('views', path.resolve('./server/views'));
app.set('view engine', 'ejs');

// serve our static files
app.use('/dist', express.static(path.resolve('./dist')));
let initialState = {test:[]}
generateData()
// create an express router and define a catch all route
const router = express.Router();
router.get('*', (req, res) => {
    // user react-router's match function to match the incoming route and render based on the application routes
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error)
            res.send('ERROR!', res) // handle an error
        else if (redirectLocation)
            res.redirect(301, redirectLocation) // handle a redirect
        else if (renderProps) {
            
            let store = createStore(reducer, initialState)
            res.render('pages/index',{initialState: JSON.stringify(initialState), app:renderToString(<Provider store={store}><RouterContext {...renderProps}/></Provider>)}) // render our html page (using ejs template)
        } else
            res.send('not found!') // handle any other condition
    })
})


function generateData(){
    initialState = {test:[Math.round(Math.random()*10),Math.round(Math.random()*10),Math.round(Math.random()*10),Math.round(Math.random()*10),Math.round(Math.random()*10),]}
    console.log(initialState)
}


// attach our router to the root route, and start the server.
app.use('/', router);
app.listen(process.env.PORT || 8080, (err) => {
    console.log('server started.')
    setInterval(generateData, 5*1000);
});

