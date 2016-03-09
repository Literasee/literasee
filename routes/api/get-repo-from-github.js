const async = require('async');
import * as requests from './requestFactory';
import * as data from '../../persistence';

function repoToProject (p, report, preso, keywords) {
  return {
    isRepo: true,
    owner: p.owner.login,
    project: p.name,
    description: p.description,
    report: report,
    presentation: preso,
    keywords: keywords ? keywords.split('\n') : [],
    thumbnail: null
  }
}

function getContents (obj) {
  if (!obj) return null;
  return new Buffer(obj.body.content, 'base64').toString();
}

module.exports = function (req, res, next) {
  const { project } = req.params;

  const fetchRepoInfo = (cb) => {
    requests.getRepoInfo(req, res.locals.etag).end(cb);
  }

  const fetchRepoFile = (file) => (cb) => {
    requests
      .getRepoFile(req, file, res.locals.etag)
      .end((err, result) => {
        if (err && file === 'keywords.txt') {
          cb(null, '');
        } else {
          cb(err, result);
        }
      });
  }

  async.parallel({
    info: fetchRepoInfo,
    report: fetchRepoFile('report.md'),
    presentation: fetchRepoFile('presentation.md'),
    keywords: fetchRepoFile('keywords.txt')
  }, (err, result) => {
    if (err) {
      if (err && err.status === 304) return res.send(res.locals.project);

      return res.status(err.status).json(err);
    }

    const info = result.info.body;
    const report = getContents(result.report);
    const presentation = getContents(result.presentation);
    const keywords = getContents(result.keywords);

    const p = repoToProject(info, report, presentation, keywords);
    p.etag = result.info.headers.etag;
    data.saveProject(p).then(() => {
      res.json(p);
    })
  })
};
