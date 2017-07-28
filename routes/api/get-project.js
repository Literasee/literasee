const Promise = require('bluebird')
const db = require('../../persistence')
const requests = require('./requestFactory')

const getProjectFromDB = (owner, name) => {
  return db.getProject(owner, name)
}

const getRepoInfo = (req, dbProject) => {
  // return requests.getRepoInfo(req, dbProject && dbProject.etag)
  // turning off conditional requests for now
  // relying on etag doesn't account for scenarios where we
  // don't have a primed cache, like after an app deploy
  return requests.getRepoInfo(req)
}

const getLastCommit = (req, repo) => {
  return requests.getCommits(req, repo.commits_url).then(res => {
    const lastCommit = res.body[0]
    // the get commits endpoint returns a different structure
    // than the create commit endpoint, which is what most of our code uses
    lastCommit.tree = lastCommit.commit.tree
    delete lastCommit.commit
    return lastCommit
  })
}

const getRepoArchive = req => {
  return requests.getRepoArchive(req)
}

module.exports = (req, res, next) => {
  const { owner, name } = req.params
  let dbProject, ghRepoInfo, repoEtag, lastCommit, contents

  getProjectFromDB(owner, name)
    .then(project => {
      dbProject = project
      return getRepoInfo(req, dbProject)
    })
    .then(repo => {
      console.log('fetching everything from github')
      ghRepoInfo = repo.body
      repoEtag = repo.headers.etag
      return getLastCommit(req, ghRepoInfo)
    })
    .then(commit => {
      lastCommit = commit
      return getRepoArchive(req)
    })
    .then(repoContents => {
      contents = repoContents
    })
    .then(result => {
      return db.saveProject({
        avatar_url: ghRepoInfo.owner.avatar_url,
        owner: ghRepoInfo.owner.login,
        name: ghRepoInfo.name,
        description: ghRepoInfo.description,
        homepage: ghRepoInfo.homepage,
        isFeatured: false,
        css: contents.css,
        html: contents.html,
        js: contents.js,
        source: contents.source,
        etag: repoEtag,
        lastCommit: lastCommit,
      })
    })
    .then(project => res.json(project))
    .catch(err => {
      if (err.status === 304) {
        console.log('loading from db cache')
        res.json(dbProject)
      } else {
        res.status(500).json(err)
      }
    })
}
