const router = require('express').Router();

const authRoute = require('./api/routes/auth.route');
const jobRoute = require('./api/routes/job.route');

const applicationRoute = require('./api/routes/application.route');

/**
 * api routes
 */
router.use('/api/auth', authRoute);
router.use('/api/jobs', jobRoute);
router.use('/api/applications', applicationRoute);

module.exports = router;
