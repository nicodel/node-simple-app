/* jshint strict: true, node: true */

var View = require('./views/main');
var Bookmark = require('./models/bookmarks');

var Routes = function() {
  'use strict';

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
