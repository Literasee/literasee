const { existsSync, readFileSync: rfs } = require('fs')
const { join } = require('path')
const express = require('express')
const router = express.Router()

const tmpDir = join(__dirname, '..', '..', 'tmp')
const templatesDir = join(__dirname, '..', 'api', 'templates')

router.use(require('cookie-parser')())
router.use(require('body-parser').json({ limit: '10mb' }))

router.get('/:layout/:theme/:owner/:name/:dir/:asset', (req, res) => {
  const { owner, name, dir, asset } = req.params
  res.setHeader('Cache-Control', 'no-cache')
  res.sendFile(join(tmpDir, owner, name, dir, asset))
})

router.get('/:layout/:theme/:owner/:name/:asset?', (req, res) => {
  const { layout, theme, owner, name, asset } = req.params
  const dir = join(tmpDir, owner, name)

  if (!existsSync(dir)) {
    return res.status(404).send('Project does not exist.')
  }

  // ensure trailing slash exists after project name
  // so asset requests are constructed properly
  if (!asset && !req.path.endsWith('/')) {
    return res.redirect(301, req.originalUrl + '/')
  }

  res.setHeader('Cache-Control', 'no-cache')
  // dynamically construct and send CSS based on URL
  if (asset === 'styles.css') {
    res
      .type('css')
      .send(
        [
          rfs(join(templatesDir, 'layouts', `${layout}.css`)),
          rfs(join(templatesDir, 'themes', `${theme}.css`)),
        ].join('\n'),
      )
  } else if (asset === 'scrolly.css') {
    res.type('css').send(rfs(join(templatesDir, 'themes', `scrolly.css`)))
  } else {
    res.sendFile(join(dir, asset || 'index.html'))
  }
})

module.exports = router
