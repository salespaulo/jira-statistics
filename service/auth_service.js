var api = require('../api/jira');

var auth_data = {
  url: '',
  session: '',
  login: {
    count: 0
  },
  auth: {
    username: '',
    password: ''
  }
};

/* private */
function auth_in_api(req) {
  auth_data.url  = req.body.url;
  auth_data.auth = {
    username: req.body.username,
    password: req.body.password
  };

  return auth_data.auth;
};

/* public */
var login = function login(req, res) {
  res.render('pages/login', auth_data);
};

var auth = function(req, res) {
  var auth_in = auth_in_api(req);

  api.login(auth_data.url, auth_in, function(err, auth_out) {
    if (err) res.render('pages/error', err);
    else {
      auth_data.session = auth_data.session.name + '=' + auth_data.session.value;
      auth_data.login.count = auth_out.loginInfo.loginCount;
      res.render('pages/index', auth_data);
    }
  });
};

var filter = function(req, res) {
  res.render('pages/index', auth_data);
};

var about = function(req, res) {
  res.render('pages/about', auth_data);
}

module.exports.login  = login;
module.exports.auth   = auth;
module.exports.filter = filter;
module.exports.about  = about;
