const fs = require('fs')
const { join } = require('path')
const requests = require('./requestFactory')
const Promise = require('bluebird')

const template = name => {
  return fs.readFileSync(join(__dirname, 'templates', name), 'utf8')
}

const createFile = (req, owner, name, filename, content) => {
  return requests.createFile(req, owner, name, filename, content || template(filename))
}

// TODO: copy template files to tmp dir to avoid initial build?
module.exports = function(req, res, next) {
  let login, name, refsUrl, url
  requests
    .createRepo(req)
    .then(result => {
      refsUrl = result.body.git_refs_url
      const { owner } = result.body
      login = owner.login
      name = result.body.name
      url = result.body.url

      const input = template('index.idl')
        .replace('{PROJECT_TITLE}', name)
        .replace('{PROJECT_TITLE}', name)
        .replace('{AUTHOR}', login)
        .replace('{AUTHOR_LINK}', owner.html_url)

      return createFile(req, login, name, 'index.idl', input)
    })
    .then(() => {
      return createFile(req, login, name, 'index.html')
    })
    .then(() => {
      return createFile(req, login, name, 'styles.css')
    })
    .then(() => {
      return createFile(req, login, name, 'index.js')
    })
    .then(result => {
      return requests.createBranch(req, refsUrl, result.body.commit.sha)
    })
    .then(() => {
      return requests.setDefaultBranch(req, url, name)
    })
    .then(result => {
      return requests.deleteBranch(req, refsUrl)
    })
    .then(() => {
      res.json({ name })
    })
    .catch(e => {
      res.json(e)
      throw e
    })
}
