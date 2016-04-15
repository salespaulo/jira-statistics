var require = require("request");

var url = '';

var login = {
  username: '',
  password: '',
};

function extract(req) {
  url = req.body.url;

	login = {
    username: req.body.user,
    password: req.body.passwd
  };
};

function build_url(path) {
  return url + path;
}

var login = function(req, res) {
	login = extract(req);
	require.post(build_url('/rest/auth/1/session')).form(login);
};

module.exports.login = login;