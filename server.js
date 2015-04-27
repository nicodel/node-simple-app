/* jslint strict: true, node: true*/

// var http = require('http');
// var url = require('url');
// var fs = require('fs');

/* OpenClassRoom example
 */
/*var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Salut tout le monde');
});
server.listen(8080);*/

/* Mixu node.js book
 */
/*http.createServer(function(req, res) {
  fs.readFile('./index.html', function(err, data) {
    res.end(data);
  });
  // res.end('hello world');
}).listen(8080, 'localhost');
console.log('Server running');*/

/* Espress Hello world example
 */
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
