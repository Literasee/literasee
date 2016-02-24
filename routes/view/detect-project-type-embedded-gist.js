const path = require('path');
const _ = require('lodash');

const getGistContents = require('../common/get-gist-contents');

module.exports = function (req, res, next) {
  const project = req.params.project;
  const token = req.cookies['literasee-token'];

  // gist ids are 20 characters long
  if (project.length !== 20) {
    return next();
  }

  getGistContents(project)
    .query(req.app.locals.authQuery)
    .end((err, result) => {
      if (err) {
        if (err.status === 404) {
          // if not found we will try to load as a repo
          return next();
        }

        return res.status(500).json(err);
      }

      if (result.body.files['report.md']) {
        res.redirect(path.join(req.path, 'report?embedded=true'));
      } else if (result.body.files['presentation.md']) {
        res.redirect(path.join(req.path, 'presentation?embedded=true'));
      } else {
        res.status(404).send('No valid content found.');
      }
    })
}
