/* jshint strict: true, node: true */

var PouchDB = require('pouchdb');

var Database = function() {
  'use strict';
  var db = new PouchDB('cozy-pouchdb-server');

/*  var db_server = 'cozy-pouchdb-server';
  var db_client = 'http://localhost:9250/cozy-pouchdb-client';

  var rep = PouchDB.replicate(db_server, db_client, {
    live: true,
    retry: true
  });

  rep.on('change', function(info) {
    console.log('replication changed', info);
  });
  rep.on('paused', function() {
    console.log('replication paused');
  });
  rep.on('active', function() {
    console.log('replication active');
  });
  rep.on('denied', function(info) {
    console.log('replication denied', info);
  });
  rep.on('complete', function(info) {
    console.log('replication complete', info);
  });
  rep.on('error', function(err) {
    console.log('replication error', err);
  });*/


}();
module.exports = Database;
