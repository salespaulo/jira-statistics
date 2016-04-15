var require = require("request");

var url = '';

var login = {
  username: '',
  password: '',
};

var response_data = {};

function build_url(path) {
  return url + path;
};

function extract(req) {
  url = req.body.url;

	login = {
    username: req.body.user,
    password: req.body.passwd
  };
};

function doLogin(res, body) {
  console.log(res);
  console.log(body);
};

var login = function(req, res) {
	login = extract(req);
	require.post(build_url('/rest/auth/1/session'), login, function(err, res2, body) {
    if (err) res.send("ERROR: " + error);
    else if (res2.statusCode == 200) doLogin(res, body);
    else res.send(body);
  });
};

module.exports.login = login;