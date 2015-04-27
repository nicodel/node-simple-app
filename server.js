/* jslint strict: true, node: true*/

var http = require('http');
var url = require('url');
var fs = require('fs');

/* OpenClassRoom example
 */
/*var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Salut tout le monde');
});
server.listen(8080);*/

/* Mixu node.js book
 */
http.createServer(function(req, res) {
  fs.readFile('./index.html', function(err, data) {
    res.end(data);
  });
  // res.end('hello world');
}).listen(8080, 'localhost');
console.log('Server running');
