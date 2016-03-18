const async = require('async');
const _ = require('lodash');
const requests = require('./requestFactory');
const data = require('../../persistence');

module.exports = function (req, res) {
  const fetchGists = (cb) => {
    requests.getUserGistsRequest(req).end(cb);
  }

  const fetchRepos = (cb) => {
    requests.getUserReposRequest(req).end(cb);
  }

  const getProjectsFromDb = (cb) => {
    data.getProjectsByOwner(req.params).then((docs) => {
      cb(null, docs);
    });
  }

  async.parallel({
    gists: fetchGists,
    repos: fetchRepos,
    dbProjects: getProjectsFromDb
  }, (err, results) => {
    if (err) return res.status(500).json(err);

    const projects = results.gists.body
      .concat(results.repos.body)
      .sort(function (a, b) {
        return Date.parse(b.updated_at) - Date.parse(a.updated_at);
      })
      .map((p) => {
        if (p.files) {
          return gistToProject(p);
        } else {
          var project = repoToProject(p);
          const dbProject = _.find(results.dbProjects, {
            owner: project.owner,
            project: project.project
          });
          if (dbProject) project.thumbnail = dbProject.thumbnail;
          return project;
        }
      });

    res.json(projects);
  })
};

function gistToProject (p) {
  const thumbnail = p.files['thumbnail.png'] ? p.files['thumbnail.png'].raw_url : null;

  return {
    isRepo: false,
    owner: p.owner.login,
    project: p.id,
    description: p.description,
    thumbnail
  }
}

function repoToProject (p) {
  return {
    isRepo: true,
    owner: p.owner.login,
    project: p.name,
    description: p.description
  }
}
