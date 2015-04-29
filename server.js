/* jshint strict: true, node: true */

// Generate a new instance of express server.
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var app = express();
var routes = require('./server/routes');

app.use('/', routes);

/* We add configure directive to tell express to use Jade to
   render templates */
app.set('views', __dirname + '/server/views');
app.engine('.html', require('jade').__express);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


/* This will allow Cozy to run your app smoothly but
 it won't break other execution environment */
var port = process.env.PORT || 9250;
var host = process.env.HOST || "127.0.0.1";

// Starts the server itself
var server = http.createServer(app);
server.listen(port, host, function() {
  'use strict';
  console.log("Server listening to %s:%d within %s environment",
              host, port, app.get('env'));
});
