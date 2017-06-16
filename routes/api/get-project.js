const async = require('async')
const Promise = require('bluebird')
const db = require('../../persistence')
const requests = require('./requestFactory')

module.exports = (req, res) => {
  const { owner, name } = req.params

  // check for the project in the db
  db.getProject(owner, name).then(dbProject => {
    // conditionally fetch the project from GitHub
    requests.getRepoInfo(req, dbProject && dbProject.etag).then(
      // the repo has changed, fetch all files and save to the db
      result => {
        const repoInfo = result.body
        // better/faster to fetch repo contents and then
        // download the files using download_url?
        Promise.props({
          css: requests.getRepoFile(req, 'styles.css'),
          html: requests.getRepoFile(req, 'index.html'),
          js: requests.getRepoFile(req, 'index.js'),
          source: requests.getRepoFile(req, 'index.idl'),
        }).then(contents => {
          let output = {}
          Object.keys(contents).forEach(key => {
            output[key] = new Buffer(contents[key].body.content, 'base64').toString()
          })

          db
            .saveProject(
              Object.assign(output, {
                avatar_url: repoInfo.owner.avatar_url,
                owner,
                name,
                description: repoInfo.description,
                isFeatured: false,
                etag: result.headers.etag,
              }),
            )
            .then(project => res.json(project))
        })
      },
      err => {
        // 304 means the project hasn't changed
        if (err.status === 304) return res.json(dbProject)
        // unknown error, whoops
        res.status(500).json(err)
      },
    )
  })
}
