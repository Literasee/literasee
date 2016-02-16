var request = require('superagent');

module.exports = function (req, res, next) {
  var gistId = req.params.owner;

  request
    .get('https://api.github.com/gists/' + gistId)
    .set('Accept', 'application/vnd.github.v3')
    .end(function (err, result) {
      if (err) {
        res.send('<h1 style="color: red;">' + err + '</h1>');
        return;
      }
      res.redirect(req.originalUrl.split(gistId)[0] + result.body.owner.login + '/' + gistId);
    })
}
