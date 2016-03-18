const request = require('superagent');
import * as requests from './requestFactory';
import * as data from '../../persistence';

module.exports = function (req, res) {
  const { project, title, subTitle } = req.body;
  const description = [title, subTitle].join('|');

  const updateRepoDescription = () => {
    requests
      .updateRepoDescription(req, description)
      .end((err, result) => {
        project.etag = result.headers.etag;
        project.description = description;
        data.saveProject(project).then((doc) => {
          res.json(doc);
        });
      });
  }

  const updateGistDescription = () => {
    requests
      .updateGistDescription(req, description)
      .end((err, result) => {
        project.etag = result.headers.etag;
        project.description = description;
        data.saveProject(project).then((doc) => {
          res.json(doc);
        });
      });
  }

  if (project.isRepo) {
    updateRepoDescription();
  } else {
    updateGistDescription();
  }
}
