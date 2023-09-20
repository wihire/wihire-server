const JobController = require('../controllers/job.controller');
const authentication = require('../middlewares/authentication');

const router = require('express').Router();

router.get('/', authentication, JobController.listJobs);

module.exports = router;
