var quiche = require('quiche');
var api = require('../api/jira');

function to_auth(req) {
  return {

  };
}

function to_filter(req) {
  return {

  };
}

function throughput_query(project, status, start, end) {
  return 'project = ' + project + 
          ' AND issuetype != Epic AND status WAS IN (' + status + ') DURING("' + start + '", "' + end + '")';
}

function wip_query(project, type, status, start, end) {
  return 'project = ' + + ' AND issuetype = ' + + ' AND status WAS IN (' + status + ') ' + 'DURING("' + start + '", "' + end + '")'
}

var query = function(req, res) {
  var url = req.body.url;
  api.issues(url, req.body.query, function(err, issues) {
    if (err) res.render('pages/error', err);
    else {
      //issues.forEach
      //...
      //...
    }

  });
};

var throughput = function(req, res) {
  var auth   = to_auth(req);
  var filter = to_filter(req);
  var throughput_total = 0;

  api.issues(url, throughput_query(filter.project, 'RESOLVED', filter.start, filter.end),
    function(err, result) {
      if (err) res.render('pages/error', err);
      else {
        throughput_total = result.total;
      }
    });

  api.issues(url, wip_query(filter.project, filter.wip_status, filter.start, filter.end),
    function(err, result) {
      if (err) res.render('pages/error', err);
      else {
        var wip_stats = {};

        result.issues.forEach(function(issue) {
          var lastDayLikeWip = false;

          issue.changelog.histories.forEach(function(history) {
            var startHistoryIn = history.created;

            history.items.forEach(function(item) {
              if (item.field != 'status') {
                return;
              }

              
            });
          });
        });
      }
    });
};