const request = require('superagent');

module.exports = function (req, res) {
  const authHeader = req.headers.authorization;
  const username = req.params.owner;
  const projectId = req.params.project;
  const file = req.body.file;

  const saveRepoFile = () => {
    const url = [
      'https://api.github.com/repos',
      username,
      projectId,
      'contents',
      file.filename
    ].join('/');

    request
      .put(url + req.app.locals.authQueryString)
      .set('Authorization', authHeader)
      .set('Accept', 'application/vnd.github.v3')
      .send({
        path: file.filename,
        message: 'Updating ' + file.filename,
        content: new Buffer(file.content).toString('base64'),
        sha: file.sha
      })
      .end((err, results) => {
        res.send(results.body.content);
      });
  }

  const saveGistFile = () => {
    request
      .patch('https://api.github.com/gists/' + projectId + req.app.locals.authQueryString)
      .set('Authorization', authHeader)
      .set('Accept', 'application/vnd.github.v3')
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
