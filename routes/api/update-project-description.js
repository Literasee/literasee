const request = require('superagent')
const requests = require('./requestFactory')
const data = require('../../persistence')

module.exports = function(req, res) {
  const project = req.body.project
  const title = req.body.title
  const subTitle = req.body.subTitle
  const description = [title, subTitle].join('|')

  const updateRepoDescription = () => {
    requests.updateRepoDescription(req, description).end((err, result) => {
      project.etag = result.headers.etag
      project.description = description
      data.saveProject(project).then(doc => {
        res.json(doc)
      })
    })
  }

  updateRepoDescription()
}
