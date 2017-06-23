const requests = require('./requestFactory')
const data = require('../../persistence')

module.exports = function(req, res) {
  const project = req.body

  requests.createTree(req, project).then(tree => {
    requests.createCommit(req, project, tree.body).then(commit => {
      project.lastCommit = commit.body
      requests.updateRef(req, project, commit.body).then(() => {
        requests.getRepoInfo(req).then(info => {
          project.etag = info.headers.etag
          data.saveProject(project).then(p => res.json(p))
        })
      })
    })
  })
}
