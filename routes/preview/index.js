const fs = require('fs')
const { join } = require('path')
const express = require('express')
const router = express.Router()

router.use(require('cookie-parser')())

router.get('/:owner/:name/:asset?', (req, res) => {
  const { owner, name, asset } = req.params
  const dir = join(__dirname, '..', '..', 'tmp', owner, name)

  if (!fs.existsSync(dir)) {
    return res.status(404).send('Project does not exist.')
  }

  // ensure trailing slash exists after project name
  // so asset requests are constructed properly
  if (!asset && !req.originalUrl.endsWith('/')) {
    return res.redirect(301, req.originalUrl + '/')
  }

  res.setHeader('Cache-Control', 'no-cache')
  res.sendFile(join(dir, asset || 'index.html'))
})

module.exports = router
