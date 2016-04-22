var express = require('express');
var parser  = require('body-parser');
var auth_service = require('./service/auth_service');
var stats_service = require('./service/stats_service');

var port = (process.env.PORT || 3000);

var app  = express();

// To manipulate data in html and template stuffs
app.set('view engine', 'ejs');

// To parse request params in req.body json format
app.use(parser.json());
app.use(parser.urlencoded({
 extended: true
}));

// Static routes
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap-datepicker/dist/js'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap-datepicker/dist/css'));
app.use('/fonts', express.static(__dirname + '/node_modules/bootstrap/dist/fonts'));
app.use('/locales', express.static(__dirname + '/node_modules/bootstrap-datepicker/dist/locales'));

// Dynamic routes
app.get('/', auth_service.login);
app.post('/auth', auth_service.auth);
app.post('/stats/filter', stats_service.statusIssues);
app.get('/about', function(res) {
  res.render('About!!! :D :D :D :D');
});

// Starting server
app.listen(port, function () {
  console.log('Jira Statistics listening on ' + port + '!');
});
