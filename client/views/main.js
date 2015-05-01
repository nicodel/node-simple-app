/* jshint strict: true, node: true, browser: true */

var Bookmarks = require('../models/bookmarks');

var MainView = function() {
  'use strict';

  document.getElementById('add-form').onsubmit = function(el) {
    console.log('form submitted', el);
    Bookmarks.add({
      _id: Date.now().toString(),
      title: document.getElementById('title').value,
      url: document.getElementById('url').value
    }, function(err) {
      if (err) {
        console.log('error', err);
      } else {
        reinitBookmarkList();
      }
    });
    return false;
  };

  var reinitBookmarkList = function() {
    console.log('loading bookmarks list');
    Bookmarks.all(function(bookmarks) {
      console.log('new list of bookmarks', bookmarks);
      __displayBookmarkList(bookmarks);
    });
  };

  var __displayBookmarkList = function(bookmarks) {
    console.log('bookmarks to be displayed', bookmarks);
    var ul = document.getElementById('bookmarks-list');
    ul.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
      var bookmark = bookmarks[i].doc;
      var li = document.createElement('li');
      var a_title = document.createElement('a');
      a_title.href = bookmark.url;
      a_title.innerHTML = bookmark.title;
      a_title.id= bookmark._id;
      a_title.className = 'title';
      li.appendChild(a_title);
      var span1 = document.createElement('span');
      span1.innerHTML = ' - ( ';
      li.appendChild(span1);
      var a_delete = document.createElement('a');
      a_delete.href = '#';
      a_delete.innerHTML = 'delete';
      a_delete.addEventListener('click', __deleteBookmark);
      li.appendChild(a_delete);
      var span2 = document.createElement('span');
      span2.innerHTML = ' )';
      li.appendChild(span2);
      ul.appendChild(li);
    }
  };

  var __deleteBookmark = function(element) {
    var bookmark = element.target.parentElement.getElementsByClassName('title')[0];
    console.log('bookmark to delete', bookmark);
    Bookmarks.remove(bookmark, reinitBookmarkList);
  };

  return {
    reinitBookmarkList: reinitBookmarkList
  };
}();
module.exports = MainView;
