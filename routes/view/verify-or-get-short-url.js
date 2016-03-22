const request = require('superagent');
const data = require('../../persistence');

module.exports = function (req, res, next) {
  const type = req.params.type;
  const project = res.locals.project;

  if (type !== 'report' && type !== 'presentation') {
    return next();
  }

  if (type === 'report' && project.report_short_url) {
    return next();
  }

  if (type === 'presentation' && project.presentation_short_url) {
    return next();
  }

  const urlProp = type === 'report' ? 'report_short_url' : 'presentation_short_url';

  request
    .get('https://api-ssl.bitly.com/v3/shorten/')
    .query({
      access_token: '7c951cd63ea9ee1e908baf2dda5b19ce7f629483',
      longUrl: req.protocol + '://' + req.hostname + req.originalUrl
    })
    .end((err, result) => {
      res.locals.project[urlProp] = result.body.data.url;
      data.saveProject(res.locals.project).then(() => next());
    });

}
