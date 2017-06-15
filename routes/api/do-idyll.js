const { join } = require('path')
const idyll = require('idyll')

module.exports = function(dir, source, cb) {
  idyll({
    output: dir,
    temp: join(dir, 'temp'),
    minify: false,
    ssr: false,
    debug: true,
    compilerOptions: { spellcheck: false },
  })
    .once('update', output => {
      cb(null, output)
    })
    .build(source)
}
