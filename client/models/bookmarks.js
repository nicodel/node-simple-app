/* jshint strict: true, node: true */
var db = require('./database');
var Ev = require('../lib/event');

var Bookmarks = function() {
  'use strict';

  var got_all_event = new Ev(this);

  var all = function() {
    db.all(function(err, bookmarks) {
      if (err !== null) {
        console.og('error', err);
      } else {
        console.log('models - bookmarks', bookmarks);
        got_all_event.notify({bookmarks: bookmarks});
      }
    });
  };

  var add = function(bookmark) {
    db.add(bookmark, all);
  };

  var remove = function(bookmark) {
    db.remove(bookmark, all);
  };

  return {
    got_all_event:  got_all_event,
    all:    all,
    add:    add,
    remove: remove
  };
}();

module.exports = Bookmarks;
