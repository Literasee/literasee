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

router.get('/featured', require('./get-featured-projects'))
router.get('/:owner', require('./get-projects-by-owner'))
router.get('/:owner/:project', [
  require('./get-project-from-db'),
  require('./get-repo-from-github'),
  function(req, res) {
    res.json(res.locals.project)
  },
])
router.put('/:owner/:project/add', require('./add-repo-file'))
router.put('/:owner/ignore', require('./ignore-projects'))
router.put('/:owner/:project', require('./save-project-file'))
router.patch('/:owner/:project', require('./update-project-description'))

module.exports = router
