/* jshint strict: true, node: true */
var PouchDB = require('pouchdb');

var database = function() {
  'use strict';

  // Database initialization
  var db = new PouchDB('cozy-pouch-server');

  var all = function(callback) {
    db.allDocs({
      include_docs: true,
      attachments:true
    }, function(err, res) {
      if (err !== null) {
        callback(err, null);
      } else {
        console.log(res);
        callback(null, res.rows);
      }
    });
  };

  var add = function(bookmark, callback) {
    db.put(bookmark, callback);
  };

  var remove = function(id, callback) {
    db.get(id, function(err, doc) {
      if (err) {
        callback(err);
      } else {
        db.remove(doc, callback);
      }
    });
  };

  return {
    all:    all,
    add:    add,
    remove: remove
  };

}();
module.exports = database;
