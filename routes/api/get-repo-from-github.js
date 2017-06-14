const async = require('async')
const _ = require('lodash')
const requests = require('./requestFactory')
const data = require('../../persistence')
const getImageSize = require('./get-image-size')

function repoToProject(p, source) {
  return {
    owner: p.owner.login,
    project: p.name,
    description: p.description,
    source: source && source.content,
    source_sha: source && source.sha,
    thumbnail: null,
    avatar_url: p.owner.avatar_url,
  }
}

function getContents(obj) {
  if (!obj || !obj.body) return null

  return {
    content: new Buffer(obj.body.content, 'base64').toString(),
    sha: obj.body.sha,
  }
}

module.exports = function(req, res, next) {
  const project = req.params.project

  const fetchRepoInfo = cb => {
    requests.getRepoInfo(req, res.locals.etag).end(cb)
  }

  const fetchRepoFile = file => cb => {
    requests.getRepoFile(req, file, res.locals.etag).end((err, result) => {
      // 404s (should) just mean that a repo doesn't have all possible files
      if (err && err.status === 404) {
        cb(null, [])
      } else {
        cb(err, result)
      }
    })
  }

  async.parallel(
    {
      info: fetchRepoInfo,
      contents: fetchRepoFile(),
      source: fetchRepoFile('index.idl'),
    },
    (err, result) => {
      if (err) {
        if (err && err.status === 304) return next()

        return res.status(err.status).json(err)
      }

      const info = result.info.body
      const source = getContents(result.source)
      const thumbnail = _.find(result.contents.body, { name: 'thumbnail.png' })
      const parallax = _.find(result.contents.body, function(file) {
        return file.name.indexOf('parallax') === 0
      })

      const p = repoToProject(info, source)
      p.etag = result.info.headers.etag
      p.thumbnail = thumbnail ? thumbnail.download_url : null

      const saveAndContinue = () => {
        data.saveProject(p).then(doc => {
          res.locals.project = doc
          next()
        })
      }

      if (parallax) {
        p.parallax_url = parallax.download_url
        getImageSize(p.parallax_url, (err, dimensions) => {
          p.parallax_size = `${dimensions.width}px ${dimensions.height}px`
          saveAndContinue()
        })
      } else {
        saveAndContinue()
      }
    },
  )
}
