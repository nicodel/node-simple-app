/* jshint strict: true, node: true */
var Database = require('./database');

var Bookmark = function() {
  'use strict';

  var all = function(callback) {
    // console.log('Bookmark.all callback', callback);
    Database.all(callback);
  };

  var add = function(bookmark, callback) {
    // console.log('Bookmark.add callback', callback);
    Database.add(bookmark, callback);
  };

  var remove = function(id, callback) {
    // console.log('Bookmark.remove callback', callback);
    Database.remove(id, callback);
  };

  return {
    all:    all,
    add:    add,
    remove: remove
  };

}();
module.exports = Bookmark;
