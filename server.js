/* jslint strict: true, node: true */

var express = require('express');
var app = express();

app.get('/', function(req, res) {
  // res.setHeader('Content-Type', 'text/plain');
  // res.send('Vous êtes à l\'acceuil');
  res.render('index.ejs', {name: 'Nicolas'});
});

app.get('/sous-sol', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
});

app.get('/etage/1/chambre', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hé ho, c\'est privé ici !');
});

app.get('/etage/:etagenum/chambre', function(req, res) {
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('Vous êtes à la chambre de l\'étage n°' + req.params.etagenum);
    res.render('index.ejs', {etage: req.params.etagenum});
});

app.get('/compter/:nombre', function(req, res) {
    var noms = ['Robert', 'Jacques', 'David'];
    console.log('rendering');
    res.render('index.ejs', {compteur: req.params.nombre, noms: noms});
});

app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable');
});


var server = app.listen(8080, function(req, res) {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s',  host, port);
});

