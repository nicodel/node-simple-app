/* jshint strict: true, node: true, browser: true */

;(function() {
  'use strict';

  var Routes = require('./routes');
  var Bookmarks = require('./models/bookmarks');
  Bookmarks.all(/*MainView.reinitBookmarkList*/);
  var offline = require('./lib/offline');
  offline.init();
  // var timeoutID = window.setTimeout(offline.check, 1000);

})();
