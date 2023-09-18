const router = require('express').Router();

const apiRoute = require('./api/routes/auth.route');

/**
 * api routes
 */
router.use('/api/auth', apiRoute);

module.exports = router;
