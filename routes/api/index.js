const express = require('express')
const cors = require('cors')

const router = express.Router()

const corsOptions = {
  origin: [/\.?literasee\.(io|org|local)(:3000)?$/],
  methods: ['GET', 'PUT', 'PATCH'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true,
}
router.use(cors(corsOptions))
router.options('*', cors(corsOptions))

router.use(require('cookie-parser')())
router.use(require('body-parser').json({ limit: '10mb' }))

//
// actual routes
//

router.get('/create/:repo?', require('./create-and-init-repo'))
router.get('/featured', require('./get-featured-projects'))

// updated routes
router.get('/:username', require('./get-user-projects'))
router.get('/:owner/:name', [require('./get-project'), (req, res) => res.json(res.locals.project)])

router.put('/:owner/:project/add', require('./add-repo-file'))
router.put('/:owner/ignore', require('./ignore-projects'))
router.put('/:owner/:project', require('./save-project-file'))
router.patch('/:owner/:project', require('./update-project-description'))

module.exports = router
