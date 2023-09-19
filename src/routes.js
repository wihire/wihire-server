const router = require('express').Router();

const authRoute = require('./api/routes/auth.route');
const applicantsRoute = require('./api/routes/applicants.route');

/**
 * api routes
 */
router.use('/api/auth', authRoute);
router.use('/api/jobs', applicantsRoute);

module.exports = router;
