const path = require('path');

module.exports = function (req, res, next) {
  // the embedded viewer is not handled by this file
  if (!!req.query.embedded) return next();

  const Project = req.app.locals.models.Project;

  const conditions = {
    owner: req.params.owner,
    project: req.params.project
  };

  Project.findOne(conditions, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (result.report) {
      res.redirect(path.join(req.url, 'report'));
    } else if (result.presentation) {
      res.redirect(path.join(req.url, 'presentation'));
    } else {
      res.status(404).send('No valid content found.');
    }
  });
}
