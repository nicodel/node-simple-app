/* jslint strict: true, node: true */
// server.js

var americano = require ('americano');

var port = process.env.PORT || 9250;
americano.start({name: 'node-simple-app', port: port});
