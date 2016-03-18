const marked = require('marked');

module.exports = function (req, res, next) {
  // the presence or absence of a trailing slash in the URL
  // immediately following the type (report or presentation)
  // determines which parameter is the actual asset
  const asset = req.params.asset || req.params.type;
  const project  = res.locals.project;

  if (asset === 'presentation.md') {
    return res.send(project.presentation);
  }
}
