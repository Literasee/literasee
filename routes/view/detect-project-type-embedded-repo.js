const path = require('path');
const _ = require('lodash');

const getRepoContents = require('../common/get-repo-contents');

module.exports = function (req, res, next) {
  const owner = req.params.owner;
  const project = req.params.project;
  const token = req.cookies.token;

  getRepoContents(owner, project)
    .query(req.app.locals.authQuery)
    .set('Authorization', 'token ' + token)
    .end((err, result) => {
      if (err) {
        return res.status(err.status).json(err);
      }

      if (_.find(result.body, {name: 'report.md'})) {
        res.redirect(path.join(req.path, 'report?embedded=true'));
      } else if (_.find(result.body, {name: 'presentation.md'})) {
        res.redirect(path.join(req.path, 'presentation?embedded=true'));
      } else {
        res.status(404).send('No valid content found.');
      }
    })
}
