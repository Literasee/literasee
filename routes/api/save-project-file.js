const request = require('superagent');
const requests = require('./requestFactory');
const data = require('../../persistence');

module.exports = function (req, res) {
  const type = req.body.type;
  const project = req.body.project;
  const user = req.body.user;
  const filename = type === 'keywords' ? type + '.txt' : type + '.md';

  const saveRepoFile = () => {
    requests
      .saveRepoFile(req, filename)
      .end((err, result) => {
        project.etag = result.headers.etag;
        project.avatar_url = user.avatar_url;
        project[type + '_sha'] = result.body.content.sha;
        data.saveProject(project).then((doc) => {
          res.json(doc);
        });
      });
  }

  const saveGistFile = () => {
    requests
      .saveGistFile(req, filename)
      .end((err, result) => {
        project.etag = result.headers.etag;
        project.avatar_url = user.avatar_url;
        data.saveProject(project).then((doc) => {
          res.json(doc);
        });
      });
  }

  if (project.isRepo) {
    saveRepoFile();
  } else {
    saveGistFile();
  }
}
