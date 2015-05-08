/* jshint strict: true, node: true */

var offline = require('./lib/offline');
var View = require('./views/main');
var Bookmark = require('./models/bookmarks');
var Database = require('./models/database');

var Routes = function() {
  'use strict';

  offline.on('up', function() {
    View.setStatus('up');
  });

  offline.on('confirmed-up', function() {
    View.setStatus('confirmed-up');
    Database.replicate();
  });

  offline.on('down', function() {
    View.setStatus('down');
  });

  offline.on('confirmed-down', function() {
    View.setStatus('confirmed-down');
  });

  Database.error_event.attach(function(sender, args) {
    console.log('Database error', args.error);
    offline.check();
  });

  View.add_event.attach(function(sender, args) {
    Bookmark.add(args.bookmark);
    // Bookmark.all();
  });
  View.remove_event.attach(function(sender, args) {
    Bookmark.remove(args.bookmark);
    // Bookmark.all();
  });

  Bookmark.got_all_event.attach(function(sender, args) {
    console.log('routes - bookmarks', args.bookmarks);
    View.reinitBookmarkList(args.bookmarks);
  });

  console.log('routes');

}();
module.exports = Routes;
