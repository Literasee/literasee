const requests = require('./requestFactory')
const data = require('../../persistence')

module.exports = function(req, res) {
  const project = req.body

  requests
    .createTree(req, project)
    .then(tree => {
      return requests.createCommit(req, project, tree.body)
    })
    .then(commit => {
      project.lastCommit = commit.body
      return requests.updateRef(req, project, commit.body)
    })
    .then(() => {
      return requests.getRepoInfo(req)
    })
    .then(info => {
      project.etag = info.headers.etag
      return data.saveProject(project)
    })
    .then(p => res.json(p))
    .catch(e => {
      res.status(500).json(e)
    })
}
