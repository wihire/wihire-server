const router = require('express').Router();

const authRoute = require('./api/routes/auth.route');

/**
 * api routes
 */
router.use('/api/auth', authRoute);
router.use('/api', authRoute);

module.exports = router;
