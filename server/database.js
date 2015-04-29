/* jslint strict: true, node: true */
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('cozy-split.db');

var database = function() {
  // Database initialization
  // var init = function(callback) {
  var initdb = "SELECT name FROM sqlite_master WHERE type='table' AND name='bookmarks'";
    db.get(initdb, function(err, rows) {
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
  // };

  var all = function(callback) {
    db.all('SELECT * FROM bookmarks ORDER BY title', function(err, row) {
      if(err !== null) {
        console.log('error while getting all', err);
        callback(err, null);
      } else {
        console.log(row);
        callback(null, row);
      }
    });
  };

  var add = function(bookmark, callback) {
    console.log('database.add bookmark', bookmark);
    console.log('database.add callback', callback);
    var request = "INSERT INTO 'bookmarks' (title, url) " +
      "VALUES('" + bookmark.title + "', '" + bookmark.url + "')";
    db.run(request, callback);

/*    db.run(request, function(err) {
      console.log('db.run callback', callback);
      if (err !== null) {
        callback(err);
      } else {
        console.log('Database - add ', bookmark);
        callback();
      }
    }); */
  };

  return {
    all:  all,
    add:  add
  };

}();
module.exports = database;
