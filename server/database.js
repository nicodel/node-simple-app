/* jshint strict: true, node: true */
var PouchDB = require('pouchdb');

var database = function() {
  'use strict';

  // Database initialization
  var db = new PouchDB('cozy-pouch-server');
  /*var initdb = "SELECT name FROM sqlite_master WHERE type='table' AND name='bookmarks'";
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
    });*/

  var all = function(callback) {
    db.allDocs({
      include_docs: true,
      attachments:true
    }, function(err, res) {
      if (err !== null) {
        callback(err, null);
      } else {
        console.log(res);
        callback(null, res.rows);
      }
    });
  };
/*  var all = function(callback) {
    db.all('SELECT * FROM bookmarks ORDER BY title', function(err, row) {
      if(err !== null) {
        console.log('error while getting all', err);
        callback(err, null);
      } else {
        console.log(row);
        callback(null, row);
      }
    });
  };*/

  var add = function(bookmark, callback) {
    db.put(bookmark, callback);
  };
/*  var add = function(bookmark, callback) {
    console.log('database.add callback', callback);
    var request = "INSERT INTO 'bookmarks' (title, url) " +
      "VALUES('" + bookmark.title + "', '" + bookmark.url + "')";
    db.run(request, callback);
  };*/

  var remove = function(id, callback) {
    db.get(id, function(err, doc) {
      if (err) {
        callback(err);
      } else {
        db.remove(doc, callback);
      }
    });
  };
/*  var remove = function(id, callback) {
    console.log('database.remove callback', callback);
    var request = "DELETE FROM bookmarks WHERE id='" + id + "'";
    db.run(request, callback);
  };*/

  return {
    all:    all,
    add:    add,
    remove: remove
  };

}();
module.exports = database;
