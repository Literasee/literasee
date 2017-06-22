const fs = require('fs')
const { join } = require('path')
const express = require('express')
const router = express.Router()

router.use(require('cookie-parser')())
router.use(require('body-parser').json({ limit: '10mb' }))

router.get('/:owner/:name/:asset?', (req, res) => {
  const { owner, name, asset } = req.params
  const dir = join(__dirname, '..', '..', 'tmp', owner, name)

  if (!fs.existsSync(dir)) {
    return res.status(404).send('Project does not exist.')
  }

  // ensure trailing slash exists after project name
  // so asset requests are constructed properly
  if (!asset && !req.path.endsWith('/')) {
    return res.redirect(301, req.originalUrl + '/')
  }

  res.setHeader('Cache-Control', 'no-cache')
  res.sendFile(join(dir, asset || 'index.html'))
})

const idyll = require('idyll')

router.post('/:owner/:name', (req, res) => {
  const { owner, name } = req.params
  const { username } = req.cookies

  // TODO: add support for orgs
  if (owner !== username) {
    return res.status(404).send('You do not have permission to update this project preview.')
  }

  const dir = join(__dirname, '..', '..', 'tmp', owner, name)

  idyll({
    output: dir,
    temp: dir,
    minify: false,
    ssr: true,
    debug: true,
    compilerOptions: { spellcheck: false },
  })
    .once('update', output => {
      res.json(output)
    })
    .build(req.body.source)
})

module.exports = router
