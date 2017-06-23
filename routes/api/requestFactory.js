const fs = require('fs')
const { join } = require('path')
const request = require('superagent')
const randomWord = require('random-word')
const mkdirp = require('mkdirp')
const binaryParser = require('superagent-binary-parser')
const tar = require('tar')

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
  const { owner, name } = req.params
  const token = req.cookies.token
  const url = `https://api.github.com/repos/${owner}/${name}`

  return standardizeRequest(request.get(url), token, etag)
}

exports.getRepoArchive = function(req) {
  const { owner, name } = req.params
  const token = req.cookies.token
  const url = `https://api.github.com/repos/${owner}/${name}/tarball`

  const destDir = join(__dirname, '..', '..', 'tmp', owner, name)
  const archivePath = join(destDir, 'repo.tar.gz')

  if (!fs.existsSync(destDir)) mkdirp.sync(destDir)

  return standardizeRequest(request.get(url), token).parse(binaryParser).buffer().then(
    res => {
      fs.writeFileSync(archivePath, res.body)
      return tar.x({ file: archivePath, cwd: destDir, strip: 1 }).then(() => {
        return {
          source: fs.readFileSync(join(destDir, 'index.idl'), 'utf8'),
          js: fs.readFileSync(join(destDir, 'index.js'), 'utf8'),
          html: fs.readFileSync(join(destDir, 'index.html'), 'utf8'),
          css: fs.readFileSync(join(destDir, 'styles.css'), 'utf8'),
        }
      })
    },
    err => {
      return err
    },
  )
}

exports.createRepo = function(req, repoName) {
  const repo = repoName || req.params.repo || [randomWord(), randomWord()].join('-')
  const token = req.cookies.token
  const url = `https://api.github.com/user/repos`

  return standardizeRequest(request.post(url), token).send({
    name: repo,
    description: `https://${req.cookies.username}.github.io/${repo}/`,
    has_issues: false,
    has_projects: false,
    has_wiki: false,
    auto_init: false,
  })
}

exports.createFile = function(req, owner, name, path, content) {
  const token = req.cookies.token
  const url = `https://api.github.com/repos/${owner}/${name}/contents/${path}`

  return standardizeRequest(request.put(url), token).send({
    path,
    message: `Create ${path}`,
    content: new Buffer(content).toString('base64'),
  })
}

exports.getCommits = function(req, commits_url) {
  const url = commits_url.substr(0, commits_url.indexOf('{/sha}'))
  return standardizeRequest(request.get(url), req.cookies.token)
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

exports.getRepoFile = function(req, filename) {
  const { owner, name } = req.params
  const token = req.cookies.token
  const url = `https://raw.githubusercontent.com/${owner}/${name}/gh-pages/${filename}`

  return standardizeRequest(request.get(url), token)
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

exports.createTree = (req, project) => {
  const { token } = req.cookies
  const { owner, name } = project
  const url = `https://api.github.com/repos/${owner}/${name}/git/trees`

  return standardizeRequest(request.post(url), token).send({
    base_tree: project.lastCommit.tree.sha,
    tree: [
      {
        path: 'index.idl',
        content: project.source,
        type: 'blob',
        mode: '100644',
      },
      {
        path: 'index.html',
        content: project.html,
        type: 'blob',
        mode: '100644',
      },
      {
        path: 'index.js',
        content: project.js,
        type: 'blob',
        mode: '100644',
      },
      {
        path: 'styles.css',
        content: project.css,
        type: 'blob',
        mode: '100644',
      },
    ],
  })
}

exports.createCommit = (req, project, tree) => {
  const { token } = req.cookies
  const { owner, name } = project
  const url = `https://api.github.com/repos/${owner}/${name}/git/commits`

  return standardizeRequest(request.post(url), token).send({
    message: 'Saving changes',
    tree: tree.sha,
    parents: [project.lastCommit.sha],
  })
}

exports.updateRef = (req, project, commit) => {
  const { token } = req.cookies
  const { owner, name } = project
  const url = `https://api.github.com/repos/${owner}/${name}/git/refs/heads/gh-pages`

  return standardizeRequest(request.patch(url), token).send({
    sha: commit.sha,
  })
}
