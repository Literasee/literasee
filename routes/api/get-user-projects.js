const Promise = require('bluebird')
const db = require('../../persistence')
const requests = require('./requestFactory')

const mergeUserProjects = user => {
  // any repos the user has access to that have 'literasee' as a topic
  const taggedRepos = JSON.parse(user.repos).filter(repo => repo.topics.includes('literasee'))

  // db.getProjectsByOwner() will return any repo the user has opened in the app
  // regardless of topics
  return db.getProjectsByOwner(user.username).then(projects => {
    // TODO: return description, thumbnail, etc.
    return projects.concat(taggedRepos).map(p => p.name)
  })
}

module.exports = (req, res) => {
  const { username } = req.params
  const json = res.json.bind(res)

  // check for the user in the db
  db.getUser(username).then(dbUser => {
    // fetch the user's repos from GitHub if they've changed
    requests.getUserRepos(req, dbUser && dbUser.etag).then(
      // new content was available, save it to the db
      result => {
        db
          .saveUser({
            etag: result.header.etag,
            repos: JSON.stringify(result.body),
            username,
          })
          .then(mergeUserProjects)
          .then(json)
      },
      err => {
        // 304 means the user's repos haven't changed
        if (err.status === 304) {
          mergeUserProjects(dbUser).then(json)
        } else {
          // unknown error, whoops
          res.status(500).json(err)
        }
      },
    )
  })
}
