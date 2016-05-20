const request = require('superagent');

const ENABLE_CHARLES_PROXY = false;

if (ENABLE_CHARLES_PROXY) require('superagent-proxy')(request);

function standardizeRequest (req, token) {
  if (ENABLE_CHARLES_PROXY) req.proxy('http://localhost:8888');
  if (token) req.set('Authorization', 'token ' + token);
  req.set('Accept', 'application/vnd.github.v3');
  req.query({
    client_id: process.env.GH_CLIENT_ID,
    client_secret: process.env.GH_CLIENT_SECRET
  });
  return req;
}

exports.getUserGistsRequest = function (req) {
  const owner = req.params.owner;
  const username = req.cookies.username;
  const token = req.cookies.token;
  var url = `https://api.github.com/users/${owner}/gists`;

  // if getting the authorized user's projects we have to use a different url
  if (owner === username) url = 'https://api.github.com/gists';

  return standardizeRequest(request.get(url), token);
}

exports.getUserReposRequest = function (req) {
  const owner = req.params.owner;
  const username = req.cookies.username;
  const token = req.cookies.token;
  var url = `https://api.github.com/users/${owner}/repos`;

  // if getting the authorized user's projects we have to use a different url
  if (owner === username) url = 'https://api.github.com/user/repos';

  return standardizeRequest(request.get(url), token)
    .query({
      type: 'all',
      sort: 'pushed'
    });
}

exports.getGistRequest = function (req, etag) {
  const project = req.params.project;
  const token = req.cookies.token;
  const url = `https://api.github.com/gists/${project}`;

  return standardizeRequest(request.get(url), token)
    .set('If-None-Match', etag || '');
}

exports.getRepoInfo = function (req, etag) {
  const owner = req.params.owner;
  const project = req.params.project;
  const token = req.cookies.token;
  const url = `https://api.github.com/repos/${owner}/${project}`;

  return standardizeRequest(request.get(url), token)
    .set('If-None-Match', etag || '');
}

exports.getRepoFile = function (req, filename, etag) {
  const owner = req.params.owner;
  const project = req.params.project;
  const token = req.cookies.token;
  const url = `https://api.github.com/repos/${owner}/${project}/contents/${filename || ''}`;

  return standardizeRequest(request.get(url), token)
    .set('If-None-Match', etag || '');
}

exports.saveRepoFile = function (req, filename) {
  const owner = req.params.owner;
  const project = req.params.project;
  const token = req.cookies.token;
  const url = `https://api.github.com/repos/${owner}/${project}/contents/${filename}`;

  var content = req.body.project[req.body.type];
  if (Array.isArray(content)) {
    content = content.filter(w => w.length).join('\n');
  }

  return standardizeRequest(request.put(url), token)
    .send({
      path: filename,
      message: 'Updating ' + filename,
      content: new Buffer(content).toString('base64'),
      sha: req.body.project[req.body.type + '_sha']
    });
}

exports.updateRepoDescription = function (req, description) {
  const owner = req.params.owner;
  const project = req.params.project;
  const token = req.cookies.token;
  const url = `https://api.github.com/repos/${owner}/${project}`;

  return standardizeRequest(request.patch(url), token)
    .send({
      name: project,
      description
    });
}

exports.saveGistFile = function (req, filename) {
  const owner = req.params.owner;
  const project = req.params.project;
  const token = req.cookies.token;
  const url = `https://api.github.com/gists/${project}`;

  return standardizeRequest(request.patch(url), token)
    .send({
      files: {
        [filename]: {
          content: req.body.project[req.body.type]
        }
      }
    });
}

exports.updateGistDescription = function (req, description) {
  const owner = req.params.owner;
  const project = req.params.project;
  const token = req.cookies.token;
  const url = `https://api.github.com/gists/${project}`;

  return standardizeRequest(request.patch(url), token)
    .send({
      description
    });
}
