const requests = require('./requestFactory')
const data = require('../../persistence')

module.exports = function(req, res) {
  const project = req.body.project
  const filename = 'index.idl'

  const saveRepoFile = () => {
    requests.saveRepoFile(req, filename).end((err, result) => {
      project.etag = result.headers.etag
      project.source_sha = result.body.content.sha
      data.saveProject(project).then(doc => {
        res.json(doc)
      })
    })
  }

  saveRepoFile()
}
