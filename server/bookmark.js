/* jshint strict: true, node: true */
var Database = require('./database');

var Bookmark = function() {
  'use strict';

  var all = function(callback) {
    console.log('Bookmark.all callback', callback);
    Database.all(callback);
  };
  var add = function(bookmark, callback) {
    console.log('Bookmark.add callback', callback);
    Database.add(bookmark, callback);
  };

  return {
    all:  all,
    add:  add
  };

}();
module.exports = Bookmark;
