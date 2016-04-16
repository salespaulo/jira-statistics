var request = require('request');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var login = function(url, auth_in, callback) {
	request.post({
    baseUrl: url,
    uri: '/rest/auth/latest/session',
    json: true,
    body: auth_in,
    agentOptions: {
      rejectUnauthorized: false
    }}, function(err, res, body) {
      if (res.statusCode == 200 && callback) callback({code:-1, message: err });
      else if (err && callback) callback(false, body);
      else if (callback) callback({code: res.statusCode, message: body});
    });
};

module.exports.login = login;
