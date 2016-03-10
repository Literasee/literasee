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

export function getUserGistsRequest (req) {
  const { owner } = req.params;
  const { username, token } = req.cookies;
  let url = `https://api.github.com/users/${owner}/gists`;

  // if getting the authorized user's projects we have to use a different url
  if (owner === username) url = 'https://api.github.com/gists';

  return standardizeRequest(request.get(url), token);
}

export function getUserReposRequest (req) {
  const { owner } = req.params;
  const { username, token } = req.cookies;
  let url = `https://api.github.com/users/${owner}/repos`;

  // if getting the authorized user's projects we have to use a different url
  if (owner === username) url = 'https://api.github.com/user/repos';

  return standardizeRequest(request.get(url), token)
    .query({
      type: 'all',
      sort: 'pushed'
    });
}

export function getGistRequest (req, etag = '') {
  const { project } = req.params;
  const { token } = req.cookies;
  const url = `https://api.github.com/gists/${project}`;

  return standardizeRequest(request.get(url), token)
    .set('If-None-Match', etag);
}

export function getRepoInfo (req, etag = '') {
  const { owner, project } = req.params;
  const { token } = req.cookies;
  const url = `https://api.github.com/repos/${owner}/${project}`;

  return standardizeRequest(request.get(url), token)
    .set('If-None-Match', etag);
}

export function getRepoFile (req, file, etag = '') {
  const { owner, project } = req.params;
  const { token } = req.cookies;
  const url = `https://api.github.com/repos/${owner}/${project}/contents/${file}`;

  return standardizeRequest(request.get(url), token)
    .set('If-None-Match', etag);
}
