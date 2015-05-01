/* jshint strict: true, node: true, browser: true */

;(function() {
  'use strict';
  var PouchDB = require('pouchdb');
  var db = new PouchDB('cozy-pouch-client');

  document.getElementById('add-form').onsubmit = function(el) {
    console.log('form submitted', el);
    addBookmark({
      _id: Date.now().toString(),
      title: document.getElementById('title').value,
      url: document.getElementById('url').value
    }, function(err) {
      if (err) {
        console.log('error', err);
      } else {
        allBookmark(function(err, res) {
          if (err !== null) {
            console.log('error', err);
          } else {
            console.log('new list of bookmarks', res);
            displayBookmarkList(res);
          }
        });
      }
    });

    return false;
  };

  var addBookmark = function(bookmark, callback) {
    console.log('add', bookmark);
    db.put(bookmark, function(err) {
      if (err) {
        console.log('Error while adding to PouchDB', err);
        callback(err);
      } else {
        console.log('Successfully added to PouchDB', bookmark.id);
        callback(false);
      }
    });
  };

  var allBookmark = function(callback) {
    db.allDocs({
      include_docs: true,
      attachments: true
    }, function(err, res) {
      if (err) {
        callback(err, null);
      }
      else {
        console.log('got', res);
        callback(null, res.rows);
      }
    });
  };

  var displayBookmarkList = function(bookmarks) {
    var ul = document.getElementById('bookmarks-list');
    ul.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
      var bookmark = bookmarks[i].doc;
      console.log('bookmark', bookmark);
      var li = document.createElement('li');
      var a_title = document.createElement('a');
      a_title.href = bookmark.url;
      a_title.innerHTML = bookmark.title;
      li.appendChild(a_title);
      var span1 = document.createElement('span');
      span1.innerHTML = ' - ( ';
      li.appendChild(span1);
      var a_delete = document.createElement('a');
      a_delete.href = 'delete/' + bookmark._id;
      a_delete.innerHTML = 'delete';
      li.appendChild(a_delete);
      var span2 = document.createElement('span');
      span2.innerHTML = ' )';
      li.appendChild(span2);
      ul.appendChild(li);
    }
  };

  allBookmark(function(err, res) {
    if (err !== null) {
      console.log('error', err);
    }
    else {
      console.log('new list of bookmarks', res);
      displayBookmarkList(res);
    }
  });

})();
