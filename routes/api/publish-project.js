const request = require('superagent');
const _ = require('lodash');

module.exports = function (req, res) {
  const ProjectModel = req.app.locals.models.Project;
  const p = req.body;
  const report = _.find(p.files, {filename: 'report.md'}) || {};
  const presentation = _.find(p.files, {filename: 'presentation.md'}) || {};
  const thumbnail = _.find(p.files, {filename: 'thumbnail.png'}) || {};
  const keywords = _.find(p.files, {filename: 'keywords.txt'});

  const conditions = {
    owner: p.owner.login,
    project: p.id
  };

  const update = {
    owner: p.owner.login,
    project: p.id,
    isPublished: true,
    isRepo: p.issues_url !== undefined,
    report: report.content,
    presentation: presentation.content,
    thumbnail: thumbnail.raw_url,
    keywords: keywords ? keywords.content.split('\n') : []
  };

  const options = {
    new: true,
    upsert: true
  };

  const callback = (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.send(result);
  };

  ProjectModel.findOneAndUpdate(conditions, update, options, callback);
}
