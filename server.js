/* jslint strict: true, node: true */
// server.js

// Generate a new instance of express server.
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('cozy.db');

var app = express();

// Database initialization
db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='bookmarks'",function(err, rows) {
  if(err !== null) {
    console.log(err);
  } else if(rows === undefined) {
    db.run('CREATE TABLE "bookmarks" ' +
           '("id" INTEGER PRIMARY KEY AUTOINCREMENT, ' +
           '"title" VARCHAR(255), ' +
           'url VARCHAR(255))', function(err) {
    if(err !== null) {
      console.log(err);
    } else {
      console.log("SQL Table 'bookmarks' initialized.");
    }
    });
  } else {
    console.log("SQL Table 'bookmarks' already initialized.");
  }
});

/* We add configure directive to tell express to use Jade to
   render templates */
app.set('views', __dirname + '/public');
app.engine('.html', require('jade').__express);
app.use(bodyParser.urlencoded({ extended: true }));

// We render the templates with the data
app.get('/', function(req, res, next) {

  db.all('SELECT * FROM bookmarks ORDER BY title', function(err, row) {
    if(err !== null) {
      // Express handles errors via its next function.
      // It will call the next operation layer (middleware),
      // which is by default one that handles errors.
      next(err);
    } else {
      console.log(row);
      res.render('index.jade', {bookmarks: row}, function(err, html) {
        res.status(200).send(html);
      });
    }
  });
});

// We define a new route that will handle bookmark creation
app.post('/add', function(req, res, next) {
  var title = req.body.title;
  var url = req.body.url;
  var sqlRequest = "INSERT INTO 'bookmarks' (title, url) " +
               "VALUES('" + title + "', '" + url + "')";
  db.run(sqlRequest, function(err) {
    if(err !== null) {
      next(err);
    } else {
      res.redirect('back');
    }
  });
});

// We define another route that will handle bookmark deletion
app.get('/delete/:id', function(req, res, next) {
  db.run("DELETE FROM bookmarks WHERE id='" + req.params.id + "'",
         function(err) {
    if(err !== null) {
      next(err);
    } else {
      res.redirect('back');
    }
  });
});

/* This will allow Cozy to run your app smoothly but
 it won't break other execution environment */
var port = process.env.PORT || 9250;
var host = process.env.HOST || "127.0.0.1";

// Starts the server itself
var server = http.createServer(app);
server.listen(port, host, function() {
  console.log("Server listening to %s:%d within %s environment",
              host, port, app.get('env'));
});
