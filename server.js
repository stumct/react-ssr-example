// Load babel to transpile our ES6 server code and then import the server code.
require('babel-core/register');
require('./server/server.js');