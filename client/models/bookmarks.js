/* jshint strict: true, node: true */
var db = require('./database');

var Bookmarks = function() {
  'use strict';

  var all = function(callback) {
    db.all(function(err, bookmarks) {
      if (err !== null) {
        console.og('error', err);
      } else {
        console.log('bookmarks', bookmarks);
        callback(bookmarks);
      }
    });
  };

  var add = function(bookmark, callback) {
    db.add(bookmark, callback);
  };

  var remove = function(bookmark, callback) {
  db.remove(bookmark, callback);
  };

  return {
    all:    all,
    add:    add,
    remove: remove
  };
}();

module.exports = Bookmarks;
