const router = require('express').Router()

const helloRoute = require('./api/routes/hello.route')

/**
 * api routes
 */
router.use('/api/hello', helloRoute)

module.exports = router
