const async = require('async');
const _ = require('lodash');
const Promise = require('bluebird');
const requests = require('./requestFactory');
const data = require('../../persistence');

module.exports = function (req, res) {

  const username = req.params.owner;

  const getProjectsFromGitHub = (dbData) => {
    dbData = dbData || {};

    return Promise.props({
      dbData: Promise.resolve(dbData),
      gistsPromise: Promise.resolve(requests.getUserGistsRequest(req, dbData.gists_etag)).reflect(),
      reposPromise: Promise.resolve(requests.getUserReposRequest(req, dbData.repos_etag)).reflect()
    });
  }

  return data
    .getProjectsByOwner(username)
    .then(getProjectsFromGitHub)
    .then(result => {
      const dbData = result.dbData;
      const gistsPromise = result.gistsPromise;
      const reposPromise = result.reposPromise;

      const gistsChanged = gistsPromise.isFulfilled();
      const gistsData = gistsChanged ? gistsPromise.value() : gistsPromise.reason();
      const gists = gistsData.text || dbData.gists;
      const gists_etag = gistsChanged ? gistsData.header.etag : dbData.gists_etag;

      const reposChanged = reposPromise.isFulfilled();
      const reposData = reposChanged ? reposPromise.value() : reposPromise.reason();
      const repos = reposData.text || dbData.repos;
      const repos_etag = reposChanged ? reposData.header.etag : dbData.repos_etag;

      var userData = {
        username,
        gists,
        gists_etag,
        repos,
        repos_etag,
        ignored: dbData.ignored || []
      }

      if (gistsChanged || reposChanged) {
        return data.saveUserProjects(userData);
      } else {
        return userData;
      }

    })
    .then((userData) => {
      const projects = JSON.parse(userData.gists)
        .filter((gist) => gist.files['report.md'] || gist.files['presentation.md'])
        .concat(JSON.parse(userData.repos))
        .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at))
        .map((p) => {
          return {
            id: p.id.toString(),
            isIgnored: userData.ignored.indexOf(p.id) > -1,
            isRepo: !p.files,
            owner: p.owner.login,
            project: p.name || p.id,
            description: p.description
          };
        });

      res.json(projects);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });

};
