const fs = require('fs')
const { join } = require('path')
const requests = require('./requestFactory')
const doIdyll = require('./do-idyll')

module.exports = function(req, res, next) {
  if (!req.cookies.token) return res.status(201).send('wtf')
  requests.createRepo(req).end((err, result) => {
    const refsUrl = result.body.git_refs_url
    const { name, owner, url } = result.body

    const input = fs
      .readFileSync(join(__dirname, '_index.idl'), 'utf8')
      .replace('{PROJECT_TITLE}', name)
      .replace('{PROJECT_TITLE}', name)
      .replace('{AUTHOR}', owner.login)
      .replace('{AUTHOR_LINK}', owner.html_url)

    const contentsUrl = result.body.contents_url.replace('{+path}', '')

    requests.createFile(req, contentsUrl, 'index.idl', input).end((err, result) => {
      requests.createBranch(req, refsUrl, result.body.commit.sha).end((err, result) => {
        requests.deleteBranch(req, refsUrl).end((err, result) => {
          requests.setDefaultBranch(req, url, name).end((err, result) => {
            doIdyll('./build-dir', input, (e, o) => {
              requests.createFile(req, contentsUrl, 'index.html', o.html).then(() => {
                requests.createFile(req, contentsUrl, 'styles.css', o.css).then(() => {
                  requests.createFile(req, contentsUrl, 'index.js', o.js).then(() => {
                    res.json(Object.assign(o, { name }))
                  })
                })
              })
            })
          })
        })
      })
    })
  })
}
