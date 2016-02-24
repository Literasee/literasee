const request = require('superagent');

module.exports = function (repo) {
  return request
    .get(`https://api.github.com/gists/${repo}`)
    .set('Accept', 'application/vnd.github.v3.base64+json');
}
