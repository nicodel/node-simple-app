/* jslint strict: true, node: true */
// server.js

// Generate a new instance of express server.
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var app = express();

/* This will allow Cozy to run your app smoothly but
 it won't break other execution environment */
var port = process.env.PORT || 9250;
var host = process.env.HOST || "127.0.0.1";

// Starts the server itself
var server = http.createServer(app).listen(port, host, function() {
  console.log("Server listening to %s:%d within %s environment",
              host, port, app.get('env'));
});

/* We add configure directive to tell express to use Jade to
   render templates */
app.set('views', __dirname + '/public');
app.engine('.html', require('jade').__express);
app.use(bodyParser.urlencoded({ extended: true }));

// Let's define some bookmarks
var bookmarks = [];
bookmarks.push({title: "Cozycloud", url: "https://cozycloud.cc"});
bookmarks.push({title: "Cozy.io", url: "http://cozy.io"});
bookmarks.push({title: "My Cozy", url: "http://localhost:9104/"});

// We render the templates with the data
app.get('/', function(req, res) {
  var params = {
    "bookmarks": bookmarks
  };
  res.render('index.jade', params, function(err, html) {
    res.send(html);
  });
});

// We define a new route that will handle bookmark creation
app.post('/add', function(req, res) {
  bookmarks.push(req.body);
  res.redirect('/');
});

// We define another route that will handle bookmark deletion
app.get('/delete/:id', function(req, res) {
  bookmarks.splice(req.params.id, 1);
  res.redirect('/');
});
