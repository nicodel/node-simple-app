/* jslint strict: true, node: true */

var cozydb = require('cozydb');

var Bookmark = cozydb.getModel('bookmarks', {
  'id': String,
  'title': String,
  'url': {'type': String, 'default': ''}
});

Bookmark.all = function(callback) {
  Bookmark.request('all', {}, function(err, bookmarks) {
    if (err) {
      callback(err);
    } else {
      callback(null, bookmarks);
    }
  });
};
module.exports = Bookmark;
