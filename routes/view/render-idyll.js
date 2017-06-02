const fs = require('fs');
const { join } = require('path');
const idyll = require('idyll');

module.exports = function (req, res, next) {
  const project = res.locals.project;
  const projectDir = join(__dirname, '../../tmp', project.owner, project.project);
  project.dir = projectDir;

  if (
    fs.existsSync(projectDir) &&
    (req.params.asset || res.locals.etag === project.etag)
  ) return next();

  idyll({
    output: projectDir,
    temp: join(projectDir, 'temp'),
    minify: false,
    debug: true,
    compilerOptions: {spellcheck: false}
  })
  .once('update', (output) => {
    res.sendFile(join(projectDir, 'index.html'));
  })
  .build(project.source);
}
