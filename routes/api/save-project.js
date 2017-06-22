const requests = require('./requestFactory')
const data = require('../../persistence')

module.exports = function(req, res) {
  const project = req.body

  requests.createTree(req, project).then(tree => {
    requests.createCommit(req, project, tree.body).then(commit => {
      requests.updateRef(req, project, commit.body).then(
        ref => {
          project.lastCommit = commit.body
          project.etag = ref.headers.etag
          data.saveProject(project).then(p => res.json(p))
        },
        err => {
          res.json(err)
        },
      )
    })
  })
}
