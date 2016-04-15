var express = require('express');
var parser  = require('body-parser');
var api     = require('./client/api');

var app     = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use('/', express.static(__dirname + '/public'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.post('/api/login', api.login);

app.listen((process.env.PORT || 3000), function () {
  console.log('Example app listening on port 3000!');
});
