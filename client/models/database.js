/* jshint strict: true, node: true, browser: true */

var Database = function() {
  'use strict';
  var PouchDB = require('pouchdb');
  var localDB = new PouchDB('cozy-pouchdb-client');

  var all = function(callback) {
    localDB.allDocs({
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
    localDB.put(item, function(err, res) {
      if (err) {
        console.log('Error while adding to PouchDB', err);
      } else {
        console.log('Successfully added to PouchDB', item._id);
        localDB.get(res.id);
        callback();
      }
    });
    replicate();
  };

  var remove = function(item, callback) {
    localDB.get(item.id, function(err, doc) {
      if (err) {
        console.log('error while retreiving', err);
      } else {
        localDB.remove(doc, function(err, res) {
          if (err) {
            console.log('error while removing', err);
          } else {
            console.log('success removing', res);
            callback();
          }
        });
      }
    });
    replicate();
  };

  var replicate = function() {
    console.log('REPLICATE');
    localDB.replicate.to(remoteDB, {
      retry:false
    }).on('complete', function(info) {
      console.log('replicate complete', info);
    }).on('error', function(err) {
      console.log('replicate error', err);
    });
  };

  var remoteDB = new PouchDB('http://localhost:9250/db/cozy-pouchdb');

/*  localDB.sync(remoteDB, {
    live: true,
    retry: true
  }).on('complete', function() {
    console.log('replicate complete');
  }).on('error', function(err) {
    console.log('replicate error', err);
  });*/

  var rep = localDB.sync(remoteDB, {
    live: false,
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
    all:        all,
    add:        add,
    remove:     remove,
    replicate:  replicate
  };

}();
module.exports = Database;
