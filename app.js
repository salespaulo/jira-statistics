var express = require('express');
var parser  = require('body-parser');
var api     = require('./client/api');

var app     = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/login', api.login);

app.listen((process.env.PORT || 3000), function () {
  console.log('Example app listening on port 3000!');
});
