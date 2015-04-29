/* jshint strict: true, node: true, browser: true */

;(function() {
  'use strict';
  var PouchDB = require('pouchdb');
  var db = new PouchDB('cozy-pouch-client');

  document.getElementById('add-form').onsubmit = function(el) {
    console.log('form submitted', el);
    addBookmark({
      _id: '',
      title: document.getElementById('title').value,
      url: document.getElementById('url').value
    });

    return false;
  };

  var addBookmark = function(bookmark) {
    console.log('add', bookmark);
    db.put(bookmark, function(err) {
      if (err) {
        console.log('error while adding %s to PouchDB', bookmark.id);
      } else {
        console.log('%s successfully aded to PouchDB', bookmark.id);
      }
    });
  };

  var allBookmark = function(callback) {
    db.allDocs({
      include_docs: true,
      attachments: true
    }, function(err, res) {
      if (err) {
        callback(err);
      }
      else {
        callback(null, res.rows);
      }
    });
  };


  allBookmark(function(err, res) {
    if (err !== null) {
      console.log('error', err);
    }
    else {
      console.log('new list of bookmarks', res);
    }
  });

})();
