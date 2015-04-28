/* jslint strict: true, node: true */

var Bookmark = require('../models/bookmark');

module.exports.list = function(req, res, next) {
  Bookmark.all(function(err, bookmarks) {
    if (err !== null) {
      next(err);
    } else {
      var data = {'bookmarks': bookmarks};
      res.render('index.jade', data, function(err, html) {
        res.send(html);
      });
    }
  });
};

// We define a new route taht will handle bookmark creation
module.exports.add = function(req, res, next) {
  Bookmark.create(req.body, function(err, bookmark) {
    if (err !== null) {
      next(err);
    } else {
      res.redirect('back');
    }
  });
};

// We define another route tat will handle bookmark deletion
module.exports.delete = function(req, res, next) {
  Bookmark.find(req.params.id,function(err, bookmark) {
    if (err !== null) {
      next(err);
    } else if (bookmark === null) {
      res.status(404).send('Bookmark not found');
    } else {
      bookmark.destroy(function(err) {
        if (err !== null) {
          next(err);
        } else {
          res.redirect('back');
        }
      });
    }
  });
};
