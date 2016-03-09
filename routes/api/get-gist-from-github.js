import * as requests from './requestFactory';
import * as data from '../../persistence';

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
      if (err && err.status === 304) return res.send(res.locals.project);

      if (err) {
        // 404 means the project is probably a repo
        if (err.status === 404) {
          return next();
        }

        return res.status(err.status).json(err);
      }

      if (result.status === 304) {
        res.send(res.locals.project);
      } else {
        const p = gistToProject(result.body);
        p.etag = result.headers.etag;
        data.saveProject(p).then(() => {
          res.json(p);
        })
      }
    })
};
