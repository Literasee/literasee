const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const express = require('express');
const request = require('superagent');
const async = require('async');

const qs = querystring.stringify({
  client_id: process.env.GH_CLIENT_ID,
  client_secret: process.env.GH_CLIENT_SECRET
});

const router = express.Router();

router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization');
  next();
});

router.get('/projects', function (req, res) {
  const fetchGists = (cb) => {
    request
      .get('https://api.github.com/gists?' + qs)
      .set('Authorization', req.headers.authorization)
      .end(cb);
  }

  const fetchRepos = (cb) => {
    request
      .get('https://api.github.com/user/repos?' + qs)
      .set('Authorization', req.headers.authorization)
      .end(cb);
  }

  async.parallel({
    gists: fetchGists,
    repos: fetchRepos
  }, (err, results) => {
    const projects = results.gists.body.concat(results.repos.body);
    res.json(projects.sort(function (a, b) {
      return Date.parse(b.updated_at) - Date.parse(a.updated_at);
    }));
  })
});

module.exports = router;
