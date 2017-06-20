const requests = require('./requestFactory')
const data = require('../../persistence')

module.exports = function(req, res) {
  const project = req.body.project

  requests.createTree(req, project).then(tree => {
    requests.createCommit(req, project, tree.body).then(commit => {
      requests.updateRef(req, project, commit.body).then(
        ref => {
          res.json(ref)
        },
        err => {
          res.json(err)
        },
      )
    })
  })
}
