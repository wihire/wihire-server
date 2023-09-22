const router = require('express').Router();

const authRoute = require('./api/routes/auth.route');
const jobRoute = require('./api/routes/job.route');
const profileRoute = require('./api/routes/profile.route');

/**
 * api routes
 */
router.use('/api/auth', authRoute);
router.use('/api/jobs', jobRoute);
router.use('/api/profile', profileRoute);

module.exports = router;
