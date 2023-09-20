const router = require('express').Router();

const authRoute = require('./api/routes/auth.route');
const jobRoute = require('./api/routes/job.route');
const applicantsRoute = require('./api/routes/applicants.route');

/**
 * api routes
 */
router.use('/api/auth', authRoute);
router.use('/api/jobs', jobRoute);

module.exports = router;
