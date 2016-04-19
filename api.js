var request = require('request');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

function callbackfunc(err, res, body, callback) {
  if (err && callback) 
    callback({code:-1, message: err });
  else if (res.statusCode == 200 && callback) 
    callback(false, body);
  else if (callback) 
    callback({code: res.statusCode, message: body});
};

var login = function(url, auth_in, callback) {
	request.post({
    baseUrl: url,
    uri: '/rest/auth/latest/session',
    json: true,
    body: auth_in,
    agentOptions: {
      rejectUnauthorized: false
    }
  }, function(err, res, body) {
      callbackfunc(err, res, body, callback);
    });
};

var issues = function(url, filter, callback) {
  request.get({
    baseUrl: url,
    uri: '/rest/api/2/search?jql=' + querystring.escape(filter) + '&expand=changelog',
    json: true,
    agentOptions: {
      rejectUnauthorized: false
    }}, function(err, res, body) {
      callbackfunc(err, res, body, callback);
    });
};

var issue = function(url, id, callback) {
  request.get({
    baseUrl: url,
    uri: '/rest/api/2/issue/' + id + '?expand=changelog',
    json: true,
    agentOptions: {
      rejectUnauthorized: false
    }}, function(err, res, body) {
      callbackfunc(err, res, body, callback);
    });
};

module.exports.login = login;
