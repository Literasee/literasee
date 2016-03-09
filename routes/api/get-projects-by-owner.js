const async = require('async');
import * as requests from './requestFactory';

module.exports = function (req, res) {
  const { owner } = req.params;
  const { username, token } = req.cookies;

  const fetchGists = (cb) => {
    requests.getUserGistsRequest(req).end(cb);
  }

  const fetchRepos = (cb) => {
    requests.getUserReposRequest(req).end(cb);
  }

  async.parallel({
    gists: fetchGists,
    repos: fetchRepos
  }, (err, results) => {
    if (err) return res.status(500).json(err);

    const projects = results.gists.body.concat(results.repos.body);

    res.json(projects.sort(function (a, b) {
      return Date.parse(b.updated_at) - Date.parse(a.updated_at);
    }));
  })
};
