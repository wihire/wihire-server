const router = require('express').Router();

const authRoute = require('./api/routes/auth.route');
const profileRoute = require('./api/routes/profile.route');
const jobRoute = require('./api/routes/job.route');

/**
 * api routes
 */
router.use('/api/auth', authRoute);

router.use('/api', authRoute);

router.use('/api/profile', profileRoute);

router.use('/api/jobs', jobRoute);

module.exports = router;
