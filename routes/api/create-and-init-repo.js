const fs = require('fs')
const { join } = require('path')
const requests = require('./requestFactory')
const doIdyll = require('./do-idyll')

const template = name => {
  return fs.readFileSync(join(__dirname, 'templates', name), 'utf8')
}

// TODO: copy template files to tmp dir to avoid initial build?
module.exports = function(req, res, next) {
  requests.createRepo(req).end((err, result) => {
    const refsUrl = result.body.git_refs_url
    const { name, owner, url } = result.body
    const idyllDir = join(__dirname, '..', '..', 'tmp', owner.login, name)

    const input = template('index.idl')
      .replace('{PROJECT_TITLE}', name)
      .replace('{PROJECT_TITLE}', name)
      .replace('{AUTHOR}', owner.login)
      .replace('{AUTHOR_LINK}', owner.html_url)

    const contentsUrl = result.body.contents_url.replace('{+path}', '')

    requests.createFile(req, contentsUrl, 'index.idl', input).end((err, result) => {
      requests.createBranch(req, refsUrl, result.body.commit.sha).end((err, result) => {
        requests.deleteBranch(req, refsUrl).end((err, result) => {
          requests.setDefaultBranch(req, url, name).end((err, result) => {
            requests.createFile(req, contentsUrl, 'index.html', template('index.html')).then(() => {
              requests
                .createFile(req, contentsUrl, 'styles.css', template('styles.css'))
                .then(() => {
                  requests
                    .createFile(req, contentsUrl, 'index.js', template('index.js'))
                    .then(() => {
                      res.json({ name })
                    })
                })
            })
          })
        })
      })
    })
  })
}
