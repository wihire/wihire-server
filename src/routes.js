const router = require('express').Router();

const authRoute = require('./api/routes/auth.route');

const applicantsRoute = require('./api/routes/applicants.route');

const jobRoute = require('./api/routes/job.route');


/**
 * api routes
 */
router.use('/api/auth', authRoute);

router.use('/api/jobs', applicantsRoute);

router.use('/api/jobs', jobRoute);


module.exports = router;
