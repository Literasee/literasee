const _ = require('lodash');
import * as requests from './requestFactory';
import * as data from '../../persistence';
import getImageSize from './get-image-size';

function gistToProject (p) {
  return {
    isRepo: false,
    owner: p.owner.login,
    project: p.id,
    description: p.description,
    report: p.files['report.md'].content,
    presentation: p.files['presentation.md'].content,
    thumbnail: null,
    keywords: p.files['keywords.txt'] && p.files['keywords.txt'].content.split('\n')
  }
}

module.exports = function (req, res, next) {
  const { project } = req.params;

  // gist ids are 20 characters long
  if (res.locals.isRepo || project.length !== 20) {
    res.locals.isRepo = true;
    return next();
  }

  requests
    .getGistRequest(req, res.locals.etag)
    .end((err, result) => {

      if (err) {
        // 304 means we already have the latest version of the project in the db
        // 404 hopefully means a corresponding gist was not found
        // hopefully this just means the project is a repo
        if (err.status === 304 || err.status === 404) {
          return next();
        }

        return res.status(err.status).json(err);
      }

      const p = gistToProject(result.body);
      p.etag = result.headers.etag;
      const parallax = _.find(result.body.files, function (val, key) {
        return key.indexOf('parallax') === 0;
      });

      const saveAndContinue = () => {
        data.saveProject(p).then((doc) => {
          res.locals.project = doc;
          next();
        });
      }

      if (parallax) {
        p.parallax_url = parallax.raw_url;
        getImageSize(p.parallax_url, (err, {width, height}) => {
          p.parallax_size = `${width}px ${height}px`;
          saveAndContinue();
        })
      } else {
        saveAndContinue();
      }
    })
};
