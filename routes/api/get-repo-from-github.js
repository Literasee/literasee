const async = require('async');
const _ = require('lodash');
const requests = require('./requestFactory');
const data = require('../../persistence');
const getImageSize = require('./get-image-size');

function repoToProject (p, report, preso, keywords) {
  return {
    isRepo: true,
    owner: p.owner.login,
    project: p.name,
    description: p.description,
    report: report.content,
    report_sha: report.sha,
    presentation: preso.content,
    presentation_sha: preso.sha,
    keywords: keywords ? keywords.content.split('\n') : [],
    keywords_sha: keywords ? keywords.sha : null,
    thumbnail: null
  }
}

function getContents (obj) {
  if (!obj) return null;
  return {
    content: new Buffer(obj.body.content, 'base64').toString(),
    sha: obj.body.sha
  };
}

module.exports = function (req, res, next) {
  const project = req.params.project;

  if (!res.locals.isRepo) {
    return next();
  }

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
    contents: fetchRepoFile(),
    report: fetchRepoFile('report.md'),
    presentation: fetchRepoFile('presentation.md'),
    keywords: fetchRepoFile('keywords.txt')
  }, (err, result) => {
    if (err) {
      if (err && err.status === 304) return next();

      return res.status(err.status).json({err, req});
    }

    const info = result.info.body;
    const report = getContents(result.report);
    const presentation = getContents(result.presentation);
    const keywords = getContents(result.keywords);
    const thumbnail = _.find(result.contents.body, {name: 'thumbnail.png'});
    const parallax = _.find(result.contents.body, function (file) {
      return file.name.indexOf('parallax') === 0;
    });

    const p = repoToProject(info, report, presentation, keywords);
    p.etag = result.info.headers.etag;
    p.thumbnail = thumbnail ? thumbnail.download_url : null;

    const saveAndContinue = () => {
      data.saveProject(p).then((doc) => {
        res.locals.project = doc;
        next();
      });
    }

    if (parallax) {
      p.parallax_url = parallax.download_url;
      getImageSize(p.parallax_url, (err, dimensions) => {
        p.parallax_size = `${dimensions.width}px ${dimensions.height}px`;
        saveAndContinue();
      })
    } else {
      saveAndContinue();
    }

  })
};
