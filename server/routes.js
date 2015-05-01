/* jshint strict: true, node: true */

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.use(function(req, res, next) {
  'use strict';
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});
router.use(bodyParser.urlencoded({extended: true}));

router.get('/', function(req, res) {
  'use strict';
  res.render('index.jade', function(err, html) {
    res.status(200).send(html);
  });
});
module.exports = router;
