// Entry file for the server
// This is used to pull in babel for ES6 code then call the main server.js
// We cannot use ES6 imports in the same file that babel is called.
require('babel-core/register');
require('./src/server')