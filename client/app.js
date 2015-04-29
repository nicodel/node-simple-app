/* jshint strict: true, node: true, browser: true */

;(function() {
  'use strict';
  var PouchDB = require('pouchdb');
  var db = new PouchDB('cozy-pouch-client');

  document.getElementById('btn-add').addEventListener('click', function(el) {
    console.log('add button clicked', el);
  });
  document.getElementById('add-form').onsubmit = function() {
    return false;
  };
})();
