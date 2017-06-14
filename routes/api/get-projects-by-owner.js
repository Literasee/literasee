const async = require('async')
const _ = require('lodash')
const Promise = require('bluebird')
const requests = require('./requestFactory')
const data = require('../../persistence')

module.exports = function(req, res) {
  const username = req.params.owner

  const getProjectsFromGitHub = dbData => {
    dbData = dbData || {}

    return Promise.props({
      dbData: Promise.resolve(dbData),
      reposPromise: Promise.resolve(
        requests.getUserReposRequest(req, dbData.repos_etag),
      ).reflect(),
    })
  }

  return data
    .getProjectsByOwner(username)
    .then(getProjectsFromGitHub)
    .then(result => {
      const dbData = result.dbData
      const reposPromise = result.reposPromise

      const reposChanged = reposPromise.isFulfilled()
      const reposData = reposChanged
        ? reposPromise.value()
        : reposPromise.reason()
      const repos = reposData.text || dbData.repos
      const repos_etag = reposChanged
        ? reposData.header.etag
        : dbData.repos_etag

      var userData = {
        username,
        repos,
        repos_etag,
        ignored: dbData.ignored || [],
      }

      if (reposChanged) {
        return data.saveUserProjects(userData)
      } else {
        return userData
      }
    })
    .then(userData => {
      const projects = JSON.parse(userData.repos)
        .filter(p => p.topics.includes('literasee'))
        .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at))
        .map(p => {
          return {
            id: p.id.toString(),
            owner: p.owner.login,
            project: p.name || p.id,
            description: p.description,
            topics: p.topics,
          }
        })

      res.json(projects)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json(err)
    })
}
