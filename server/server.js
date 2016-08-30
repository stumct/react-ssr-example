import path from 'path';
import express from 'express';
const app = express();
import compression from 'compression';
import configureDevServer from './webpack-dev-server';
import passportSetup from './passport'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import passport from 'passport';
import flash from 'connect-flash';
import authRoutes from './routes/auth';
//import apiRoutes from './routes/api';
import appRoutes from './routes/app';
import mongoose from 'mongoose'
import session from 'express-session';
const MongoStore = require('connect-mongo')(session);
// Connect to MongoDB
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'development') {
    mongoose.connect('mongodb://dbuser:dbpassword@ds017886.mlab.com:17886/testdb0001', err => { if (err) { throw err } });
} else if (process.env.NODE_ENV === 'production') {
    mongoose.connect('mongodb://dbuser:dbpassword@ds017886.mlab.com:17886/testdb0001', err => { if (err) { throw err } });
}

// Configure Express middlewares
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: false })); // get information from html forms
app.use(cookieParser())
app.use(session({
    store: new MongoStore({ mongooseConnection: mongoose.connection, ttl: 1200 }),
    secret: 'supersecretsupersecret',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize()); // initialize passport to handle authentication
app.use(passport.session()); // enable passport for persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
passportSetup(passport); // setup passport

// Setup any public paths
if (process.env.NODE_ENV === 'development') {
    configureDevServer(app);
    // serve the static files for the dev environment
    //app.use('/assets', express.static(path.resolve('./src/Assets')));
    //app.use('/images', express.static(path.resolve('./src/Assets/images')));
    //app.use('/dist/assets', express.static(path.resolve('./src/Assets/')));
} else if (process.env.NODE_ENV === 'production') {
    // use compression
    app.use(compression());
    // serve our static files
    //app.use('/dist', express.static(path.resolve('./dist')));
    //app.use('/images', express.static(path.resolve('./src/Assets/images')));
    //app.use('/dist/assets', express.static(path.resolve('./src/Assets/')));
}

// set the path to the views folder and set the view engine to ejs
app.set('views', path.resolve('./server/views'));
app.set('view engine', 'ejs');

// configure the server routes
authRoutes(app, express.Router(), passport);
//apiRoutes(app, express.Router());
appRoutes(app, express.Router());





// Start the server using the env port or 8080
app.listen(process.env.PORT || 8080, (err) => {
    console.log('server started.');
});