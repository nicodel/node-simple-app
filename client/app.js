/* jshint strict: true, node: true, browser: true */

;(function() {
  'use strict';

  var MainView = require('./views/main');
  var Bookmarks = require('./models/bookmarks');
  Bookmarks.all(MainView.reinitBookmarkList);

})();
