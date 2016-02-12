const request = require('superagent');

module.exports = function (req, res) {
  const authHeader = req.headers.authorization;
  const username = req.params.owner;
  const projectId = req.params.project;
  const file = req.body.file;

  // saving a repo file requires two calls because the PUT call
  // must pass the existing sha of the file
  const saveRepoFile = () => {
    const url = [
      'https://api.github.com/repos',
      username,
      projectId,
      'contents',
      file.filename
    ].join('/');

    request
      .get(url + req.app.locals.authQueryString)
      .set('Authorization', authHeader)
      .end((err, fileInfo) => {
        request
          .put(url + req.app.locals.authQueryString)
          .set('Authorization', authHeader)
          .send({
            path: file.filename,
            message: 'Updating ' + file.filename,
            content: new Buffer(file.content).toString('base64'),
            sha: fileInfo.body.sha
          })
          .end((err, results) => {
            res.send(results);
          });
      });
  }

  const saveGistFile = () => {
    request
      .patch('https://api.github.com/gists/' + projectId + req.app.locals.authQueryString)
      .set('Authorization', authHeader)
      .send({
        files: {
          [file.filename]: file
        }
      })
      .end((err, results) => {
        res.send(results);
      });
  }

  if (req.body.isRepo) {
    saveRepoFile();
  } else {
    saveGistFile();
  }
}
