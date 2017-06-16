const request = require('superagent')
const randomWord = require('random-word')

const ENABLE_CHARLES_PROXY = false

if (ENABLE_CHARLES_PROXY) require('superagent-proxy')(request)

function standardizeRequest(req, token, etag) {
  if (ENABLE_CHARLES_PROXY) req.proxy('http://localhost:8888')
  if (token) req.set('Authorization', 'token ' + token)
  if (etag) req.set('If-None-Match', etag)
  req.set('Accept', 'application/vnd.github.v3')
  req.set('Accept', 'application/vnd.github.mercy-preview+json') // include topics
  req.query({
    client_id: process.env.GH_CLIENT_ID,
    client_secret: process.env.GH_CLIENT_SECRET,
  })
  return req
}

exports.getUserRepos = function(req, etag) {
  const owner = req.params.username
  const username = req.cookies.username
  const token = req.cookies.token
  var url = `https://api.github.com/users/${owner}/repos`

  // if getting the authorized user's projects we have to use a different url
  if (owner === username) url = 'https://api.github.com/user/repos'

  return standardizeRequest(request.get(url), token, etag).query({
    type: 'all',
    sort: 'pushed',
  })
}

exports.getRepoInfo = function(req, etag) {
  const owner = req.params.owner
  const project = req.params.project
  const token = req.cookies.token
  const url = `https://api.github.com/repos/${owner}/${project}`

  return standardizeRequest(request.get(url), token, etag)
}

exports.createRepo = function(req) {
  const repo = req.params.repo || [randomWord(), randomWord()].join('-')
  console.log(repo, req.cookies)
  const token = req.cookies.token
  const url = `https://api.github.com/user/repos`

  return standardizeRequest(request.post(url), token).send({
    name: repo,
    description: `https://${req.cookies.username}.github.io/${repo}/`,
    has_issues: false,
    has_projects: false,
    has_wiki: false,
  })
}

exports.createFile = function(req, url, path, content) {
  return standardizeRequest(request.put(url + path), req.cookies.token).send({
    path,
    message: 'Initial commit',
    content: new Buffer(content).toString('base64'),
  })
}

exports.getCommits = function(req, url) {
  return standardizeRequest(request.get(url.substr(0, url.length - 6)), req.cookies.token)
}

exports.createBranch = function(req, url, sha) {
  return standardizeRequest(request.post(url.substr(0, url.length - 6)), req.cookies.token).send({
    ref: 'refs/heads/gh-pages',
    sha,
  })
}

exports.setDefaultBranch = function(req, url, name) {
  return standardizeRequest(request.patch(url), req.cookies.token).send({
    name,
    default_branch: 'gh-pages',
  })
}

exports.deleteBranch = function(req, url) {
  return standardizeRequest(
    request.delete(url.substr(0, url.length - 6) + '/heads/master'),
    req.cookies.token,
  )
}

exports.createRepoFile = function(req) {
  const owner = req.params.owner
  const project = req.params.project
  const token = req.cookies.token
  const url = `https://api.github.com/repos/${owner}/${project}/contents/${req.body.path}`

  return standardizeRequest(request.put(url), token).send({
    path: req.body.path,
    message: 'Updating ' + req.body.path,
    content: new Buffer(req.body.content).toString('base64'),
  })
}

exports.getRepoFile = function(req, filename, etag) {
  const owner = req.params.owner
  const project = req.params.project
  const token = req.cookies.token
  const url = `https://api.github.com/repos/${owner}/${project}/contents/${filename || ''}`

  return standardizeRequest(request.get(url), token, etag)
}

exports.saveRepoFile = function(req, filename) {
  const owner = req.params.owner
  const project = req.params.project
  const token = req.cookies.token
  const url = `https://api.github.com/repos/${owner}/${project}/contents/${filename}`

  var content = req.body.project.source

  return standardizeRequest(request.put(url), token).send({
    path: filename,
    message: 'Updating ' + filename,
    content: new Buffer(content).toString('base64'),
    sha: req.body.project.source_sha,
  })
}

exports.updateRepoDescription = function(req, description) {
  const owner = req.params.owner
  const project = req.params.project
  const token = req.cookies.token
  const url = `https://api.github.com/repos/${owner}/${project}`

  return standardizeRequest(request.patch(url), token).send({
    name: project,
    description,
  })
}
