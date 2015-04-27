/* jslint strict: true, node: true*/

var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('hello express world');
});

var server = app.listen(8080, function(req, res) {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s',  host, port);
});
