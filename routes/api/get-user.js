const db = require('../../persistence')
const requests = require('./requestFactory')

module.exports = (req, res) => {
  const { username } = req.params

  // check for the user in the db
  db.getUser(username).then(dbUser => {
    // conditionally fetch the user's repos from GitHub
    requests.getUserRepos(req, dbUser && dbUser.etag).then(
      // new content was available, save it to the db
      result => {
        db
          .saveUser({
            etag: result.header.etag,
            repos: JSON.stringify(result.body),
            username,
          })
          .then(user => res.json(user))
      },
      err => {
        // 304 means the user's repos haven't changed
        if (err.status === 304) return res.json(dbUser)
        // unknown error, whoops
        res.status(500).json(err)
      },
    )
  })
}
