const request = require('superagent');

module.exports = function (owner, repo) {
  return request
    .get(`https://api.github.com/repos/${owner}/${repo}/contents`)
    .set('Accept', 'application/vnd.github.v3');
}
