const request = require('superagent');

module.exports = function (req, res) {
  const authHeader = req.headers.authorization;
  const project = req.body;
  const description = project.description;

  const saveRepoFile = () => {
    const url = [
      'https://api.github.com/repos',
      project.owner.login,
      project.id
    ].join('/');

    request
      .patch(url)
      .query(req.app.locals.authQuery)
      .set('Authorization', authHeader)
      .set('Accept', 'application/vnd.github.v3')
      .send({
        name: project.id,
        description
      })
      .end((err, results) => {
        res.send(results.body);
      });
  }

  const saveGistFile = () => {
    request
      .patch('https://api.github.com/gists/' + project.id)
      .query(req.app.locals.authQuery)
      .set('Authorization', authHeader)
      .set('Accept', 'application/vnd.github.v3')
      .send({ description })
      .end((err, results) => {
        res.send(results.body);
      });
  }

  if (project.isRepo) {
    saveRepoFile();
  } else {
    saveGistFile();
  }
}
