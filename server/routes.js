/* jshint strict: true, node: true */

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var Bookmark = require('./bookmark');
// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('cozy-split.db');

router.use(function(req, res, next) {
  'use strict';
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});
router.use(bodyParser.urlencoded({extended: true}));

router.get('/', function(req, res, next) {
  'use strict';
  res.render('index.jade', function(err, html) {
    res.status(200).send(html);
  });
/*  Bookmark.all(function(err, data) {
    if (err !== null) {
      next(err);
    } else {
      console.log('rendering', data);
      res.render('index.jade', {bookmarks: data}, function(err, html) {
        res.status(200).send(html);
      });
    }
  });*/
});

router.post('/add', function(req, res, next) {
  'use strict';
  var bookmark = {
    _id: req.body.title,
    url: req.body.url,
    title: req.body.title,
  };
  Bookmark.add(bookmark, function(err) {
    console.log('Router - add', bookmark);
    if (err !== null) {
      next(err);
    } else {
      res.redirect('back');
    }
  });
});

router.get('/delete/:id', function(req, res, next) {
  'use strict';
  var id = req.params.id;
  console.log('Router - removing', id);
  Bookmark.remove(id, function(err) {
    console.log('Router - remove %s - %s', id, err);
    if (err !== null) {
      next(err);
    } else {
      res.redirect('back');
    }
  });
});

module.exports = router;
