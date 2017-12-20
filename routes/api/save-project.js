const fs = require('fs')
const { join } = require('path')
const idyll = require('idyll')
const requests = require('./requestFactory')
const data = require('../../persistence')

const build = (req, cb) => {
  const { owner, name } = req.params
  const { username } = req.cookies
  const { source, layout = 'blog', theme = 'github' } = req.body

  // TODO: verify user has permissions to owner org
  // if (owner !== username) {
  //   return res.status(404).send('You do not have permission to update this project preview.')
  // }

  const dir = join(__dirname, '..', '..', 'tmp', owner, name)
  const customStyles = join(dir, 'custom-styles.css')

  idyll({
    output: dir,
    temp: dir,
    components: join(__dirname, '..', '..', 'components-cjs'),
    datasets: join(dir, 'data'),
    css: fs.existsSync(customStyles) ? customStyles : undefined,
    layout,
    theme,
    minify: false,
    ssr: true,
    debug: true,
    template: join(__dirname, '..', 'edit', 'tpl.html'),
    compilerOptions: { spellcheck: false },
  })
    .once('error', e => {
      console.log(e)
      cb(e)
    })
    .once('update', ({ html, css, js }) => {
      cb(null, {
        html,
        css,
        js,
      })
    })
    .build(source)
}

module.exports = function(req, res) {
  build(req, (err, artifacts) => {
    if (err) return res.status(500).json(err)

    const project = Object.assign({}, req.body, artifacts)

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
  })
}
