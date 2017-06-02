const { join } = require('path');

module.exports = function (req, res, next) {
  // the presence or absence of a trailing slash in the URL
  // immediately following the type (report or presentation)
  // determines which parameter is the actual asset
  const asset = req.params.asset || 'index.html';
  const project  = res.locals.project;

  res.setHeader('Cache-Control', 'no-cache')
  res.sendFile(join(project.dir, asset))
}
