const fs = require('fs')
const { join } = require('path')
const idyll = require('idyll')

module.exports = function(req, res, next) {
  const project = res.locals.project
  const projectDir = join(__dirname, '../../tmp', project.owner, project.name)
  project.dir = projectDir

  if (
    !req.query.source &&
    fs.existsSync(projectDir) &&
    (req.params.asset || res.locals.etag === project.etag)
  )
    return next()

  idyll({
    output: projectDir,
    temp: join(projectDir, 'temp'),
    minify: false,
    ssr: false,
    debug: true,
    compilerOptions: { spellcheck: false },
  })
    .once('update', output => {
      res.sendFile(join(projectDir, 'index.html'))
    })
    .build(req.query.source || project.source)
}
