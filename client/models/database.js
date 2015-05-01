/* jshint strict: true, node: true, browser: true */

var Database = function() {
  'use strict';
  var PouchDB = require('pouchdb');
  var db = new PouchDB('cozy-pouchdb-client');

  var all = function(callback) {
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

  var add = function(item, callback) {
    db.put(item, function(err, res) {
      if (err) {
        console.log('Error while adding to PouchDB', err);
        callback(err);
      } else {
        console.log('Successfully added to PouchDB', item._id);
        db.get(res.id, callback);
      }
    });
  };

  var remove = function(item, callback) {
    db.get(item.id, function(err, doc) {
      if (err) {
        console.log('error while retreiving', err);
      } else {
        db.remove(doc, function(err, res) {
          if (err) {
            console.log('error while removing', err);
          } else {
            console.log('success removing', res);
            callback();
          }
        });
      }
    });
  };
  var db_client = 'cozy-pouchdb-client';
  var db_server = 'http://localhost:9250/cozy-pouchdb-server';

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
  });


  return {
    all:    all,
    add:    add,
    remove: remove
  };

}();
module.exports = Database;
