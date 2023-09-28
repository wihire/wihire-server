const router = require('express').Router();

const authRoute = require('./api/routes/auth.route');
const profileRoute = require('./api/routes/profile.route');
const jobRoute = require('./api/routes/job.route');
const applicationRoute = require('./api/routes/application.route');
const companyScopeRoute = require('./api/routes/companyScope.route');
const skillRoute = require('./api/routes/skill.route');
const categoryRoute = require('./api/routes/category.route');
const totalEmployeeRoute = require('./api/routes/totalEmployee.route');

/**
 * api routes
 */
router.use('/api/auth', authRoute);
router.use('/api/jobs', jobRoute);
router.use('/api/profile', profileRoute);
router.use('/api/applications', applicationRoute);
router.use('/api/company-scopes', companyScopeRoute);
router.use('/api/skills', skillRoute);
router.use('/api/categories', categoryRoute);
router.use('/api/total-employees', totalEmployeeRoute);

module.exports = router;
